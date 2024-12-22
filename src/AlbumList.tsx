import React, { useEffect, useState } from 'react';
import AlbumCard from './AlbumCard';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch(
        'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
      );
      const data = await response.json();
      const albumData = data.feed.entry;
      setAlbums(albumData);
      console.log('albums: ', albumData);
    };

    fetchAlbums();
  }, []);

  return (
    <div>
      <h1>Top 100 Albums</h1>
      <div className='album-list'>
        {albums.map((album, index) => (
          <AlbumCard
            key={index}
            title={album['im:name']['label']}
            artist={album['im:artist']['label']}
            cover={album['im:image'][2]['label']}
            releaseDate={album['im:releaseDate']['attributes']['label']}
          />
          // <div key={index}>
          //   <h2>{album['im:name']['label']}</h2>
          //   <p>{album['im:artist']['label']}</p>
          //   <img src={album['im:image'][2]['label']} />
          //   <p>{album['im:releaseDate']['attributes']['label']}</p>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
