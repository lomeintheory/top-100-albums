import React from 'react';

interface AlbumCardProps {
  title: string;
  artist: string;
  cover: string;
  releaseDate: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  title,
  artist,
  cover,
  releaseDate,
}) => {
  return (
    <div className='album-card'>
      <img src={cover} alt={title} />
      <h2>{title}</h2>
      <p>{artist}</p>
      <p>{releaseDate}</p>
    </div>
  );
};

export default AlbumCard;
