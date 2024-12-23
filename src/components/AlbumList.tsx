import React, { useEffect, useState } from 'react';
import AlbumCard from './AlbumCard';
import Pagination from './Pagination';

interface Album {
  title: string;
  artist: string;
  cover: string;
  releaseDate: string;
  genre: string;
}

interface ApiResponse {
  feed: {
    entry: Array<{
      'im:name': {
        label: string;
      };
      'im:artist': {
        label: string;
      };
      'im:image': {
        label: string;
      }[];
      'im:releaseDate': {
        attributes: {
          label: string;
        };
      };
      category: {
        attributes: {
          label: string;
        };
      };
    }>;
  };
}

const AlbumList = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAlbums = async (): Promise<void> => {
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
      console.log(data.feed.entry);
      setAlbums(albumData);
    };

    fetchAlbums();
  }, []);

  const totalPages = Math.ceil(albums.length / 8);
  const startIndex = (currentPage - 1) * 8;
  const paginatedAlbums = albums.slice(startIndex, startIndex + 8); // current 8 of total albums displayed on each page

  const handlePageClick = (pageNumber: number) => {
    const page = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(page);
  };

  return (
    <div className='container my-4'>
      <h1 className='text-center mb-4'>Top 100 Albums</h1>
      <div className='row'>
        {paginatedAlbums.map((album, index) => (
          <div className='col-md-3' key={index}>
            <AlbumCard
              title={album.title}
              artist={album.artist}
              cover={album.cover}
              releaseDate={album.releaseDate}
              genre={album.genre}
            />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={handlePageClick}
      />
    </div>
  );
};

export default AlbumList;
