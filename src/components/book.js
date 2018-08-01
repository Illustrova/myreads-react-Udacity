import React, {Component} from 'react';

class Book extends Component {
    constructor() {
        super();
        this.state = {shelf: 'none'};
    }

    selectShelf(value) {
        const {updateShelf} = this.props;
        updateShelf(this.props, value);
        this.setState({shelf: value});
    }

    componentDidMount() {
        const {shelf} = this.props;
        this.setState({shelf});
    }

    render() {
        const {title, authors, thumbnail} = this.props;
        const {shelf} = this.state;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url("${thumbnail}")`,
                            }}
                        />
                        <div className="book-shelf-changer">
                            <select
                                value={shelf}
                                onChange={event =>
                                    this.selectShelf(event.target.value)
                                }>
                                <option value="moveto" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">
                                    Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors}</div>
                </div>
            </li>
        );
    }
}

export default Book;