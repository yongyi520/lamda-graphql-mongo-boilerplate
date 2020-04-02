// import { gql } from 'apollo-server-lambda'

const { gql } = require('apollo-server-lambda')


const rootTypeDefs =  gql`

  type Query {
    _: String
  }

  type Mutation {
    _: String 
  }

  type Subscription {
    _: String
  }
`
module.exports = rootTypeDefs