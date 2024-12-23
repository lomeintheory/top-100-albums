import React, { useEffect, useState } from 'react';
import AlbumCard from './AlbumCard';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch(
        'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
      );
      const data = await response.json();
      const albumData = data.feed.entry;
      setAlbums(albumData);
    };

    fetchAlbums();
  }, []);

  const totalPages = Math.ceil(albums.length / 8);
  const startIndex = (currentPage - 1) * 8;
  const paginatedAlbums = albums.slice(startIndex, startIndex + 8); // current 8 of total albums displayed on each page

  // const handleNext = () => {
  //   currentPage < totalPages ? setCurrentPage(prev => prev + 1) : totalPages;
  // };

  // const handlePrevious = () => {
  //   currentPage > 1 ? setCurrentPage(prev => prev - 1) : 1;
  // };

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
              title={album['im:name']['label']}
              artist={album['im:artist']['label']}
              cover={album['im:image'][2]['label']}
              releaseDate={album['im:releaseDate']['attributes']['label']}
            />
          </div>
        ))}
      </div>
      <nav className='d-flex justify-content-center'>
        <ul className='pagination'>
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className='page-link'
              onClick={() => handlePageClick(currentPage - 1)}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              className={`page-item ${
                currentPage === index + 1 ? 'active' : ''
              }`}
              key={index}>
              <button
                className='page-link'
                onClick={() => handlePageClick(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? 'disabled' : ''
            }`}>
            <button
              className='page-link'
              onClick={() => handlePageClick(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AlbumList;
