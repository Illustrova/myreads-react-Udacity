import React, {Component} from 'react';
import Book from './book';
import defaultCover from '../icons/defaultCover.svg';

class Bookshelf extends Component {
	render() {
		const {heading, updateShelf} = this.props;
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{heading}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.books.map(book => (
							<Book
								key={book.id}
								id={book.id}
								authors={book.authors}
								title={book.title}
								shelf={book.shelf}
								thumbnail={
									book.imageLinks && book.imageLinks.thumbnail
										? book.imageLinks.thumbnail
										: defaultCover
								}
								updateShelf={updateShelf}
							/>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default Bookshelf;