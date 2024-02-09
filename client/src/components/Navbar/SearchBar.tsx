import React from 'react';
import './SearchBar.css';

interface Props {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search..."
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
