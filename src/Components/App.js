import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import { Spotify } from '../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "example track name 1",
      artist: "example track artist 1",
      album: "example track album 1",
      id: 1,
    },
    {
      name: "example track name 2",
      artist: "example track artist 2",
      album: "example track album 2",
      id: 2,
    },
  ]);
  const [playlistName, setPlaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Example Playlist Name 1",
      artist: "Example Playlist Artist 1",
      album: "Example Playlist Artist 1",
      id: 3,
    },
    {
      name: "Example Playlist Name 2",
      artist: "Example Playlist Artist 2",
      album: "Example Playlist Artist 2",
      id: 4,
    },
  ]);

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track already added to playlist");
    } else {
      setPlaylistTracks(newTrack);
    }
  };

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  };

  function updatePlaylistName(name) {
    setPlaylistName(name);
  };

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
  };

  function search(term) {
    Spotify.search(term).then(result => setSearchResults(result));
    console.log(term);
  };

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        <SearchBar onSearch={search}/>
        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults 
          userSearchResults={searchResults} 
          onAdd={addTrack} 
          />
          {/* <!-- Add a Playlist component --> */}
          <Playlist 
          playlistName={playlistName} 
          playlistTracks={playlistTracks} 
          onRemove={removeTrack} 
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
