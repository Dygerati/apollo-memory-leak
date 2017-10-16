"use strict";

const fetch = require("isomorphic-fetch");
const AP = require("apollo-client");
const gql = require("graphql-tag");
const heapdump = require("heapdump");

const networkInterface = AP.createNetworkInterface({
  uri: "https://1xj5jr959.lp.gql.zone/graphql"
});

const client = new AP.ApolloClient({
  networkInterface
});

let iterator = 0;

// Every second perform another mutation
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
}, 1 * 1000);

// Create heap 10 seconds in
setTimeout(createHeap, 10 * 1000);

// Every 10 minutes record a heap snapshot
setInterval(createHeap, 10 * 60 * 1000);

function createHeap() {
  gql.resetCaches();
  heapdump.writeSnapshot((err, filename) => {
    if (err) {
      throw err;
    }

    console.info(`Wrote heap to ${filename}`);
  });
}
