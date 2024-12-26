import React from 'react';
import SearchBar from './SearchBar';

const Header: React.FC<{
  onSearch: (term: string, criteria: string) => void;
}> = ({ onSearch }) => {
  return (
    <header className='header'>
      <h1 className='header-title'>Upwards Music Group</h1>
      <div>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
