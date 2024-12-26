import React from 'react';
import SearchBar from './SearchBar';

interface HeaderProps {
  onSearch: (term: string, criteria: string) => void;
  onTitleClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onTitleClick }) => {
  return (
    <header className='header'>
      <h1 className='header-title' onClick={onTitleClick}>
        Upwards Music Group
      </h1>
      <div>
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
