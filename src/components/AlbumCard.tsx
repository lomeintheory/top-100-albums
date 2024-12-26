import React from 'react';
import { Album } from './AlbumList';

interface AlbumCardProps {
  album: Album;
  onAlbumClick: (album: Album) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onAlbumClick }) => {
  return (
    <div className='album-card' onClick={() => onAlbumClick(album)}>
      <img src={album.cover} alt={album.title} />
      <h2>{album.title}</h2>
      <p>{album.artist}</p>
    </div>
  );
};

export default AlbumCard;
