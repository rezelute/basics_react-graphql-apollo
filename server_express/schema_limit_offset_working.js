const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const axios = require("axios");

// rocket
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  }),
});

// launches
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType },
  }),
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {

    launches: {
      type: GraphQLList(LaunchType),
      args: {
        first: {
          name: "first",
          type: GraphQLInt,
        },
        limit: {
          name: "limit",
          type: GraphQLInt,
        }
      },
      resolve(pVal, {first=null, limit=null}) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${first}`)
          .then(res => {
            // console.log(res.data);
            return res.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
    },

    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      resolve(pVal, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      },
    },

    rockets: {
      type: GraphQLList(RocketType),
      resolve(pVal, args) {
        return axios.get("https://api.spacexdata.com/v3/rockets").then(res => {
          return res.data;
        });
      },
    },
    
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(pVal, args) {
        return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`).then(res => res.data);
      },
    },
  },
});

// export
module.exports = new GraphQLSchema({
  query: RootQuery,
});
