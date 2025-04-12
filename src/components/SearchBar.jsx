import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar">
      <span className="material-icons search-icon"> 
      <img src="/src/assets/buscar.png" alt="NebulaCorp Logo" className="logo1" />
      
      </span>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button 
          className="clear-search" 
          onClick={() => setSearchTerm('')}
        >
            
          <span className="material-icons">
          asdhasj
          </span>
        </button>
      )}
    </div>
  );
};

export default SearchBar;