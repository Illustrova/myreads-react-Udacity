import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './book';
import defaultCover from '../icons/defaultCover.svg';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            books: [],
        };
    }

    updateQuery = query => {
        const {myBooks} = this.props;

        this.setState({query: query});
        if (query.trim() === '') {
            this.setState({books: []})
            return;
        }
        BooksAPI.search(query.trim()).then(response => {
            if (response && response.length) {
                const books = response
                    .filter(book => {
                        return !myBooks.find(myBook => myBook.id === book.id);
                    })
                    .map(book => {
                        console.log('book.authors => ',book.authors);
                        return {
                            id: book.id,
                            shelf: 'none',
                            authors: book.authors ? book.authors :[],
                            title: book.title,
                            thumbnail:
                                book.imageLinks && book.imageLinks.thumbnail
                                    ? book.imageLinks.thumbnail
                                    : defaultCover,
                        };
                    });
                this.setState({books});
            }
            else {
                this.setState({books: []})
            }
        });
    };

    render() {
        const {books} = this.state;
        const {updateShelf} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={event =>
                                this.updateQuery(event.target.value)
                            }
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map(book => (
                            <Book
                                key={book.id}
                                id={book.id}
                                authors={book.authors.join(', ')}
                                title={book.title}
                                thumbnail={book.thumbnail}
                                updateShelf={updateShelf}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;