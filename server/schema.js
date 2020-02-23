const { gql } = require("apollo-server");

const typeDefs = gql`
  type Rocket {
    rocket_id: String
    rocket_name: String
    rocket_type: String
  }

  type Edge {
    cursor: String!
    node: Launch!
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
  }

  type LaunchesResultCursor {
    edges: [Edge]!
    pageInfo: PageInfo
    totalCount: Int
  }

  type Launch {
    """
    Flight number description
    Each flight has a unique flight number
    """
    flight_id: String
    flight_number: Int
    mission_name: String
    launch_year: String
    launch_date_local: String
    launch_success: Boolean
    rocket: Rocket
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    launches: [Launch]
    launchesCursor(after: String!, first: Int!): LaunchesResultCursor
    launch: Launch
    rockets: [Rocket]
    rocket: Rocket
  }

  # Mutation to modify the books array
  # type Mutation {
  #   # addBook(title: String!, authorName: String!): Book
  # }
`;

module.exports = typeDefs;
