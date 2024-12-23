import React from 'react';
import { Album } from './AlbumList';

interface AlbumCardProps {
  album: Album;
  title: string;
  artist: string;
  cover: string;
  releaseDate: string;
  onAlbumClick: (album: Album) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  album,
  title,
  artist,
  cover,
  releaseDate,
  onAlbumClick,
}) => {
  return (
    <div
      className='album-card'
      onClick={() => onAlbumClick(album)}
      style={{ cursor: 'pointer' }}>
      <img src={cover} alt={title} />
      <h2>{title}</h2>
      <p>{artist}</p>
      <p>{releaseDate}</p>
    </div>
  );
};

export default AlbumCard;
