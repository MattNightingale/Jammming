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

      function handleKeyPress({target}) {
        if (target.key === 'Enter') {
            this.passTerm(); 
        };
    }

      return (
      <div className={styles.SearchBar}>
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={handleTermChange}
          onKeyUp={handleKeyPress}
        />
        <button className={styles.SearchButton} onClick={passTerm}>
          SEARCH
        </button>
      </div>
        );
}
      
  



export default SearchBar