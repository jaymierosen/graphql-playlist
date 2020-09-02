const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema, GraphQLID,
  GraphQLInt } = graphql;
const _ = require('lodash');

let books = [
  {
    name: 'Book 1',
    genre: 'Fantasy',
    id: '1'
  },
  {
    name: 'Book 2',
    genre: 'Horror',
    id: '2'
  },
  {
    name: 'Book 3',
    genre: 'Comedy',
    id: '3'
  }
]

let authors = [
  {
    name: 'Jaymie Rosen',
    age: 31,
    id: '1'
  },
  {
    name: 'Karen Holmes',
    age: 58,
    id: '1'
  },
  {
    name: 'John Smith',
    age: 29,
    id: '1'
  }
]

const BookType = new GraphQLObjectType({
  // define the book type here
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    }
  })
});

const AuthorType = new GraphQLObjectType({
  // define the author type here
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // queries that an user will be making:
  // 1 all books
  // 2 all authors
  // 3 one book
  // 4 one author
  fields: {
    book: {
      type: BookType,
      args: {
        // passing arguments when querying for a book
        // need id
        id: {
          type: GraphQLID
        },
        name: {
          type: GraphQLString
        },
        genre: {
          type: GraphQLString
        }
      },
      // parent : relationships b/w data
      resolve(parent, args) {
        // resolve functions find data
        // console.log(typeof (args.id));
        return _.find(books, {id: args.id}) // value comes back from query
      }
    },
    author: {
      type: AuthorType,
      args: {
        // passing arguments when querying for an author
        // need id
        id: {
          type: GraphQLID
        },
        name: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        }
      },
      // parent : relationships b/w data
      resolve(parent, args) {
        // resolve functions find data
        // console.log(typeof (args.id));
        return _.find(authors, {id: args.id}) // value comes back from query
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});