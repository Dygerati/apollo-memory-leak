"use strict";

const fetch = require("isomorphic-fetch");
const AP = require("apollo-client");
const gql = require("graphql-tag");

const networkInterface = AP.createNetworkInterface({
  uri: "https://1xj5jr959.lp.gql.zone/graphql"
});

const client = new AP.ApolloClient({
  networkInterface
});

let iterator = 0;

setInterval(async () => {
  iterator++;
  try {
    const result = await client.mutate({
      mutation: gql`
        mutation UpdateGameCount {
          updateGame(gameId: 1, count: ${iterator}) {
            id
            count
          }
        }
      `
    });

    console.log(`Updated count to ${result.data.updateGame.count}`);
  } catch (e) {
    throw e;
  }
}, 2 * 1000);
