import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Bookshelf from './bookshelf';

class MyBookshelves extends Component {

    selectBooks = (shelf) => {
        const { books } = this.props;
        return books.filter((book) => book.shelf === shelf);
    }

    render () {
        const { updateShelf } = this.props;

        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  heading="Currently Reading"
                  shelf="currentlyReading"
                  books={ this.selectBooks('currentlyReading') }
                  updateShelf={ updateShelf }
                />
                <Bookshelf
                  heading="Want to Read"
                  shelf="wantToRead"
                  books={ this.selectBooks('wantToRead') }
                  updateShelf={ updateShelf }
                />
                <Bookshelf
                  heading="Read"
                  shelf="read"
                  books={ this.selectBooks('read') }
                  updateShelf={ updateShelf }
                />
              </div>
            </div>
            <div className="open-search">
              <Link
                    to="/search"
                >
                    Add a book
              </Link>
            </div>
          </div>
        );
    }
}

export default MyBookshelves;