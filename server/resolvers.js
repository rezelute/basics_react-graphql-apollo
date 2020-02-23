const axios = require("axios");

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    launches: async () => {
      try {
        const res = await axios.get(`https://api.spacexdata.com/v3/launches`); // ?limit=${limit}&offset=${first}
        const { data } = res;
        return data;
      } catch (e) {
        throw new Error("Error getting launches: ", e);
      }
      // axios.get(`https://api.spacexdata.com/v3/launches`)
      // .then(res => res.data)
      // .catch(e => {
      //   console.log(e);
      // }),
    },

    launchesCursor: async (_, { after, first }) => {
      try {
        const res = await axios.get(`https://api.spacexdata.com/v3/launches`); // ?limit=${limit}&offset=${first}
        const { data } = res;
        let finalData = []; // includes edges with cursor
        const startFromFlightNum = Number(after) + 1;

        const pageInfo = {
          endCursor: data[data.length - 1].flight_number,
          hasNextPage: false
        };
        const totalCount = data.length;

        if (first < 0) {
          throw new Error("First must be positive");
        }

        const indexStart = data.findIndex(launch => {
          return (
            startFromFlightNum.toString() === launch.flight_number.toString()
          );
        });
        // found the launch to slice from
        if (indexStart === -1) {
          throw new Error("Launch to start searching from does not exist");
        }

        // after means> increment indexStart
        // indexStart += 1;

        // is there more data after "after+first"
        pageInfo.hasNextPage =
          data.slice(indexStart + first, data.length).length > 0;

        const slicedData = data.slice(indexStart, indexStart + first);

        // end cursor (flight_number) of data
        // const dataEndCursor = slicedData[slicedData.length - 1].flight_number;

        finalData = slicedData.map(launch => {
          return {
            cursor: launch.flight_number, // flight_number
            node: { ...launch }
          };
        });

        // console.log("finalData: ", finalData);

        return {
          totalCount,
          pageInfo,
          edges: finalData
        };
      } catch (e) {
        throw new Error(`Error getting launches:  ${e.message}`);
      }
    },

    launch: (_, { flightNumber }) => {
      return axios
        .get(`https://api.spacexdata.com/v3/launches/${flightNumber}`)
        .then(res => res.data);
    },

    rockets: () => {
      return axios.get("https://api.spacexdata.com/v3/rockets").then(res => {
        return res.data;
      });
    },

    rocket: (_, { rocketId }) => {
      return axios
        .get(`https://api.spacexdata.com/v3/rockets/${rocketId}`)
        .then(res => res.data);
    }
  }
  // Mutation: {
  //   addBook: (_, { title, authorName }) => addBook(title, authorName)
  // }
};

module.exports = resolvers;
