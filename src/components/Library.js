'use client';

import React, { useState, useEffect } from 'react';
import './Library.css';

function Library() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadBooks = () => {
      const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
      setBooks(savedBooks);
    };

    loadBooks();
    // Add event listener for storage changes
    window.addEventListener('storage', loadBooks);
    
    return () => {
      window.removeEventListener('storage', loadBooks);
    };
  }, []);

  const updateProgress = (id, progress) => {
    const updatedBooks = books.map(book => 
      book.id === id ? { ...book, progress: parseInt(progress) } : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const removeBook = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const filteredBooks = books.filter(book => {
    const searchLower = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="library">
      <div className="library-header">
        <h1>My Library</h1>
        <input
          type="text"
          placeholder="Search your books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="books-grid">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={book.thumbnail || '/images/book-placeholder.png'}
              alt={book.title}
              className="book-cover"
            />
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <button 
                onClick={() => removeBook(book.id)}
                className="remove-button"
              >
                Remove from Library
              </button>
            </div>
          </div>
        ))}
        {filteredBooks.length === 0 && (
          <div className="empty-library">
            {searchQuery ? 'No books found matching your search.' : 'Your library is empty. Add some books from the Recommendations page!'}
          </div>
        )}
      </div>
    </div>
  );
}

export default Library;
