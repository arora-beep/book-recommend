'use client';

import React, { useState, useEffect } from 'react';
import './Recommendations.css';

function Recommendations() {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Fiction', 'Mystery', 'Science Fiction', 'Romance', 'Biography',
    'Fantasy', 'History', 'Business', 'Self-Help', 'Poetry',
    'Technology', 'Art', 'Cooking', 'Travel', 'Children'
  ];

  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true);
      try {
        const booksByCategory = {};
        await Promise.all(
          categories.map(async (category) => {
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=subject:${category.toLowerCase()}&maxResults=8`
            );
            const data = await response.json();
            if (data.items) {
              booksByCategory[category] = data.items;
            }
          })
        );
        setBooks(booksByCategory);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setLoading(false);
    };

    fetchAllBooks();
  }, []);

  const addToLibrary = (book) => {
    const existingBooks = JSON.parse(localStorage.getItem('books')) || [];
    const newBook = {
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.[0] || 'Unknown Author',
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      progress: 0,
      dateAdded: new Date().toISOString()
    };
    
    // Check if book already exists
    if (!existingBooks.some(b => b.id === book.id)) {
      localStorage.setItem('books', JSON.stringify([...existingBooks, newBook]));
      alert('Book added to your library!');
    } else {
      alert('This book is already in your library!');
    }
  };

  const filterBooks = (books, query) => {
    if (!query) return books;
    
    const filtered = {};
    Object.entries(books).forEach(([category, categoryBooks]) => {
      const filteredBooks = categoryBooks.filter(book => {
        const title = book.volumeInfo.title?.toLowerCase() || '';
        const authors = book.volumeInfo.authors?.join(' ').toLowerCase() || '';
        const searchLower = query.toLowerCase();
        return title.includes(searchLower) || authors.includes(searchLower);
      });
      
      if (filteredBooks.length > 0) {
        filtered[category] = filteredBooks;
      }
    });
    return filtered;
  };

  const filteredBooks = filterBooks(books, searchQuery);

  return (
    <div className="recommendations">
      <div className="recommendations-header">
        <h1>Book Recommendations</h1>
        <input
          type="text"
          placeholder="Search books or authors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading">Loading books...</div>
      ) : (
        <div className="categories-container">
          {Object.entries(filteredBooks).map(([category, categoryBooks]) => (
            <div key={category} className="category-section">
              <h2>{category}</h2>
              <div className="books-grid">
                {categoryBooks.map((book) => (
                  <div key={book.id} className="book-card">
                    <img
                      src={book.volumeInfo.imageLinks?.thumbnail || '/images/book-placeholder.png'}
                      alt={book.volumeInfo.title}
                      className="book-cover"
                    />
                    <div className="book-info">
                      <h3>{book.volumeInfo.title}</h3>
                      <p>{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                      <button 
                        onClick={() => addToLibrary(book)}
                        className="add-button"
                      >
                        Add to Library
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendations;
