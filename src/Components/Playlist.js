import React, { useState } from 'react';
import styles from './Playlist.module.css';
import Tracklist from './Tracklist';

function Playlist(props) {
    function handleNameChange({ target }) {
        props.onNameChange(target.value);
    };

    return (
        <div className={styles.Playlist}>
            <input placeholder={"New Playlist"} onChange={handleNameChange}/>
            <Tracklist 
            userSearchResults={props.playlistTracks} 
            onRemove={props.onRemove} 
            isRemoval={true}
            />
            <button className={styles["Playlist-save"]} onClick={props.onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;