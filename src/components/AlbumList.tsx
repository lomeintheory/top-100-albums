import React, { useEffect, useState } from 'react';
import AlbumCard from './AlbumCard';
import Pagination from './Pagination';
import AlbumDetailsModal from './AlbumDetailsModal';
import Header from './Header';
import RotatingText from './RotatingText';

export interface Album {
  title: string;
  artist: string;
  cover: string;
  releaseDate: string;
  genre: string;
}

interface ApiResponse {
  feed: {
    entry: Array<{
      'im:name': { label: string };
      'im:artist': { label: string };
      'im:image': { label: string }[];
      'im:releaseDate': { attributes: { label: string } };
      category: { attributes: { label: string } };
    }>;
  };
}

const filterAlbums = (albumList: Album[], term: string, criteria: string) => {
  if (!term) return albumList;
  return albumList.filter(album => {
    const searchValue = album[criteria as keyof Album]?.toLowerCase();
    return searchValue?.includes(term.toLowerCase());
  });
};

const getUrlParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    term: searchParams.get('q') || '',
    criteria: searchParams.get('by') || 'title',
    page: Number(searchParams.get('page')) || 1,
  };
};

const updateUrlParams = (params: {
  q?: string;
  by?: string;
  page?: string;
}) => {
  const searchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });
  window.history.pushState(
    {},
    '',
    searchParams.toString()
      ? `${window.location.pathname}?${searchParams.toString()}`
      : window.location.pathname,
  );
};

const AlbumList = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const { term, criteria, page } = getUrlParams();

    // combining fetch and filter so app state is synchronized with URL params on initial load
    const fetchAndFilterAlbums = async (): Promise<void> => {
      const response = await fetch(
        'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
      );
      const data: ApiResponse = await response.json();
      const albumData = data.feed.entry.map(album => ({
        title: album['im:name'].label,
        artist: album['im:artist'].label,
        cover: album['im:image'][2].label,
        releaseDate: album['im:releaseDate'].attributes.label,
        genre: album['category'].attributes.label,
      }));

      setAlbums(albumData);
      setFilteredAlbums(filterAlbums(albumData, term, criteria));
      setCurrentPage(page);
    };

    fetchAndFilterAlbums();
  }, []);

  // properly updates state when user navigates back and forward in browser
  useEffect(() => {
    const handlePopState = () => {
      const { term, criteria, page } = getUrlParams();
      setFilteredAlbums(filterAlbums(albums, term, criteria));
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [albums]);

  const totalPages = Math.ceil(filteredAlbums.length / 8);
  const startIndex = (currentPage - 1) * 8;
  const paginatedAlbums = filteredAlbums.slice(startIndex, startIndex + 8); // current 8 of total albums displayed on each page

  // updates URL query params and album display based on search terms and criteria
  const handleSearch = (searchTerm: string, searchCriteria: string) => {
    if (searchTerm) {
      updateUrlParams({
        q: searchTerm,
        by: searchCriteria,
        page: '1',
      });
    }

    setFilteredAlbums(filterAlbums(albums, searchTerm, searchCriteria));
    setCurrentPage(1);
  };

  const handlePageClick = (pageNumber: number) => {
    const page = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(page);
    updateUrlParams({ page: page.toString() });
  };

  return (
    <div className='landing-page'>
      <Header onSearch={handleSearch} />
      <section className='rotating-text-section'>
        <RotatingText />
      </section>
      <div className='album-content-section my-4'>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4'>
          {paginatedAlbums.map((album, index) => (
            <div className='col-md-3' key={index}>
              <AlbumCard album={album} onAlbumClick={setSelectedAlbum} />
            </div>
          ))}
        </div>
        {selectedAlbum && (
          <AlbumDetailsModal
            album={selectedAlbum}
            onClosePopup={() => setSelectedAlbum(null)}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageClick={handlePageClick}
        />
      </div>
    </div>
  );
};

export default AlbumList;
