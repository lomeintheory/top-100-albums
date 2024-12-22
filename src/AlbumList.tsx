import React, { useEffect, useState } from 'react';

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
      {albums.length}
    </div>
  );
};

export default AlbumList;
