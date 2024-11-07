import React, {useState} from 'react';
import styles from './SearchBar.module.css';


function SearchBar(props) {
    
      const [term, setTerm] = useState("");

      function passTerm() {
        props.onSearch(term);
      };

      function handleTermChange({target}) {
        setTerm(target.value);
      };

      function keyUp(event) {
        if (event.key === "Enter") {
          this.passTerm()
        }
      };

      return (
      <div className={styles.SearchBar}>
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={handleTermChange}
          onKeyUp={keyUp}
        />
        <button className={styles.SearchButton} onClick={passTerm}>
          SEARCH
        </button>
      </div>
        );
}
      
  



export default SearchBar