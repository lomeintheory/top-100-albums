import React from 'react';
import AlbumCard from './AlbumCard';
import AlbumDetailsModal from './AlbumDetailsModal';
import Pagination from './Pagination';
import { Album } from './LandingPage';

interface AlbumListProps {
  albums: Album[];
  selectedAlbum: Album | null;
  currentPage: number;
  totalPages: number;
  onAlbumClick: (album: Album) => void;
  onPageClick: (page: number) => void;
  onCloseModal: () => void;
}

const AlbumList = ({
  albums,
  selectedAlbum,
  currentPage,
  totalPages,
  onAlbumClick,
  onPageClick,
  onCloseModal,
}: AlbumListProps) => {
  return (
    <div className='album-content-section'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4'>
        {albums.map((album, index) => (
          <div className='col-md-3' key={index}>
            <AlbumCard album={album} onAlbumClick={onAlbumClick} />
          </div>
        ))}
      </div>
      {selectedAlbum && (
        <AlbumDetailsModal album={selectedAlbum} onClosePopup={onCloseModal} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageClick={onPageClick}
      />
    </div>
  );
};

export default AlbumList;
