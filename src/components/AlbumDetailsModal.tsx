import React, { useEffect, useState } from 'react';
import { Album } from './LandingPage';

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
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null,
  );

  useEffect(() => {
    const loadTrackList = async (): Promise<void> => {
      try {
        const tracks = await fetchTracklist(album.title, album.artist);
        const sortedTracks = [...tracks].sort(
          (a, b) => a.trackNumber - b.trackNumber,
        );
        setTrackList(sortedTracks);
      } catch (error) {
        console.error('Error fetching tracklist: ', error);
      }
    };

    loadTrackList();
  }, [album]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClosePopup();
    }
  };

  const handleAudioPlay = (audio: HTMLAudioElement) => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
    }
    setCurrentAudio(audio);
  };

  return (
    <div className='modal-overlay' onClick={handleClickOutside}>
      <div className='modal-content'>
        <button className='btn-close' onClick={onClosePopup}></button>
        <img src={album.cover} alt={album.title} className='popup-cover' />
        <h2>{album.title}</h2>
        <p>Artist: {album.artist}</p>
        <p>Release Date: {album.releaseDate}</p>
        <p>Genre: {album.genre}</p>
        {trackList.length === 0 && (
          <div className='text-center my-3'>
            Sorry...no tracks available for this album...
          </div>
        )}
        <ol className='list-group list-group-numbered'>
          {trackList.map((track, index) => (
            <li
              className='track-item list-group-item'
              key={`${track.trackName}-${index}`}>
              <span>{track.trackName}</span>
              <div className='ms-2 me-auto'>
                {track.previewUrl && (
                  <audio
                    controls
                    className='mt-2'
                    onPlay={e => handleAudioPlay(e.currentTarget)}>
                    <source src={track.previewUrl} type='audio/mpeg' />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AlbumDetailsModal;
