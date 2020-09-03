import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from "../queries/queries";

class BookList extends Component {
  displayBooks(){
    var data = this.props.data; // data object from graphql
    if(data.loading){
      return( <div>Loading books...</div> );
    } else {
      return data.books.map(book => {
        return(
            <li key={ book.id }>{ book.name }</li>
        );
      })
    }
  }
  render(){
    console.log(this.props);
    return(
      <section>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
      </section>
    );
  }
};

export default graphql(getBooksQuery)(BookList);
