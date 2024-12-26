import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string, searchCriteria: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('title');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, searchCriteria);
  };

  return (
    <form className='search-bar' onSubmit={handleSubmit}>
      <div className='input-group'>
        <select
          className='form-select'
          value={searchCriteria}
          onChange={e => setSearchCriteria(e.target.value)}>
          <option value='title'>Title</option>
          <option value='artist'>Artist</option>
          <option value='genre'>Genre</option>
        </select>
        <input
          type='text'
          className='form-control'
          placeholder='Search albums...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          className='btn btn-primary'
          type='submit'
          disabled={!searchTerm.trim()}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
