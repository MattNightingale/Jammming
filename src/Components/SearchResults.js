import React, {useState} from 'react';
import styles from './SearchResults.module.css'
import Tracklist from './Tracklist';

function SearchResults(props) {
    return (
        <div className={styles.SearchResults}>
          <h2>Search results</h2>
          <Tracklist userSearchResults={props.userSearchResults} isRemoval={false} onAdd={props.onAdd}/>
        </div>
        );
};

export default SearchResults;