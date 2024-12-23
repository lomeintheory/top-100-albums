import React, { useEffect, useState } from 'react';
import { Album } from './AlbumList';

interface Track {
  trackNumber: number;
  trackName: string;
  previewUrl: string;
}

interface SearchApiResponse {
  results: Track[];
}

interface AlbumDetailsModalProps {
  album: Album;
  onClosePopup: () => void;
}

const fetchTracklist = async (
  albumName: string,
  artistName: string,
): Promise<Track[]> => {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      albumName + ' ' + artistName,
    )}&entity=song&limit=50`,
  );
  const data: SearchApiResponse = await response.json();
  console.log('trackJSON: ', data);
  return data.results.map((track: Track) => ({
    trackNumber: track.trackNumber,
    trackName: track.trackName,
    previewUrl: track.previewUrl,
  }));
};

const AlbumDetailsModal: React.FC<AlbumDetailsModalProps> = ({
  album,
  onClosePopup,
}) => {
  const [trackList, setTrackList] = useState<Track[]>([]);

  useEffect(() => {
    const loadTrackList = async (): Promise<void> => {
      try {
        const tracks = await fetchTracklist(album.title, album.artist);
        const sortedTracks = [...tracks].sort(
          (a, b) => a.trackNumber - b.trackNumber,
        );
        setTrackList(sortedTracks);
        console.log('tracksDetails: ', tracks);
      } catch (error) {
        console.error('Error fetching tracklist: ', error);
      }
    };

    loadTrackList();
  }, [album]);

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='btn-close' onClick={onClosePopup}></button>
        <img src={album.cover} alt={album.title} className='popup-cover' />
        <h2>{album.title}</h2>
        <p>Artist: {album.artist}</p>
        <p>Release Date: {album.releaseDate}</p>
        <p>Genre: {album.genre}</p>
        <ol className='list-group list-group-numbered'>
          {trackList.map(track => (
            <li className='track-item list-group-item' key={track.trackNumber}>
              <span>{track.trackName}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AlbumDetailsModal;
