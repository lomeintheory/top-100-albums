import React from 'react';
import { Album } from './AlbumList';

interface AlbumDetailsModalProps {
  album: Album;
  onClosePopup: () => void;
}

const AlbumDetailsModal: React.FC<AlbumDetailsModalProps> = ({
  album,
  onClosePopup,
}) => {
  const { title, artist, cover, releaseDate, genre } = album;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='btn-close' onClick={onClosePopup}></button>
        <img src={cover} alt={title} className='popup-cover' />
        <h2>{title}</h2>
        <p>Artist: {artist}</p>
        <p>Release Date: {releaseDate}</p>
        <p>Genre: {genre}</p>
      </div>
    </div>
  );
};

export default AlbumDetailsModal;
