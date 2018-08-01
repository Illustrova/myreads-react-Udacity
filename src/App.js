import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';

import MyBookshelves from './components/myBookshelves';
import Search from './components/search';

import * as BooksAPI from './BooksAPI';

class App extends React.Component {
	constructor() {
		super();
		this.state = BooksAPI.getAll().then(books => {
			this.setState({books: books});
		});
	}

	//Update shelf info in state.books
	updateShelf = (book, updatedShelf) => {
		const {books} = this.state;
		const index = books.findIndex(key => {
			return key.id === book.id;
		});

		let myBooks = books;

		if (index === -1) {
			const newBook = Object.assign({}, book);
			newBook.shelf = updatedShelf;
			myBooks.push(newBook);
		} else {
			myBooks[index] = Object.assign({}, myBooks[index]);
			myBooks[index].shelf = updatedShelf;
		}
		//Update at server
		BooksAPI.update(book, updatedShelf).then(
			this.setState({books: myBooks}),
		);
	};

	render() {
		const {books} = this.state;

		if (!books) {
			return null;
		}

		return (
			<div className="app">
				<Route path="/search" render={() => (
						//Search page
						<Search myBooks={books} updateShelf={this.updateShelf}/>
					)}
				/>
				<Route exact path="/" render={() => (
						//Main page
						<MyBookshelves books={books} updateShelf={this.updateShelf}/>
					)}
				/>
			</div>
		);
	}
}

export default App;