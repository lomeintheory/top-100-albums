import React, { useEffect, useState } from 'react';
import AlbumCard from './AlbumCard';
import Pagination from './Pagination';
import AlbumDetailsModal from './AlbumDetailsModal';
import SearchBar from './SearchBar';

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

const AlbumList = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const termParam = searchParams.get('q') || '';
    const criteriaParam = searchParams.get('by') || 'title';
    const pageParam = Number(searchParams.get('page')) || 1;

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

      if (termParam) {
        const filtered = albumData.filter(album => {
          const searchValue =
            album[criteriaParam as keyof Album]?.toLowerCase();
          return searchValue?.includes(termParam.toLowerCase());
        });
        setFilteredAlbums(filtered);
      } else {
        setFilteredAlbums(albumData);
      }

      setCurrentPage(pageParam);
    };

    fetchAndFilterAlbums();
  }, []);

  // properly updates state when user navigates back and forward in browser
  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const term = searchParams.get('q') || '';
      const criteria = searchParams.get('by') || 'title';
      const page = Number(searchParams.get('page')) || 1;

      handleSearch(term, criteria);
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
    const searchParams = new URLSearchParams();
    if (searchTerm) {
      searchParams.set('q', searchTerm);
      searchParams.set('by', searchCriteria);
      searchParams.set('page', '1');
      window.history.pushState(
        {},
        '',
        searchParams.toString()
          ? `${window.location.pathname}?${searchParams.toString()}`
          : window.location.pathname,
      );
    }

    const filtered = albums.filter(album => {
      const searchValue = album[searchCriteria as keyof Album]?.toLowerCase();
      return searchValue?.includes(searchTerm.toLowerCase());
    });

    setFilteredAlbums(filtered);
    setCurrentPage(1);
  };

  const handlePageClick = (pageNumber: number) => {
    const page = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(page);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${searchParams.toString()}`,
    );
  };

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
  };

  const handleClosePopup = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className='container my-4'>
      <h1 className='text-center mb-4'>Top 100 Albums</h1>
      <SearchBar onSearch={handleSearch} />
      <div className='row'>
        {paginatedAlbums.map((album, index) => (
          <div className='col-md-3' key={index}>
            <AlbumCard
              album={album}
              title={album.title}
              artist={album.artist}
              cover={album.cover}
              releaseDate={album.releaseDate}
              onAlbumClick={handleAlbumClick}
            />
          </div>
        ))}
      </div>
      {selectedAlbum && (
        <AlbumDetailsModal
          album={selectedAlbum}
          onClosePopup={handleClosePopup}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={handlePageClick}
      />
    </div>
  );
};

export default AlbumList;
