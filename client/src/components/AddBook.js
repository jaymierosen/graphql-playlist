import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  displayAuthors() {
    var data = this.props.data;
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option name="authorId" key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  handleChange = (e) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
  }
  render(){
    console.log(this.props);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input
            name="name"
            value={this.state.name}
            type="text"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            name="genre"
            value={this.state.genre}
            type="text"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option>--Select author--</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
};

export default graphql(getAuthorsQuery)(AddBook);
