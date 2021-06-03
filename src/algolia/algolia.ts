// import * as functions from '../../functions/index';

const algoliasearch = require('algoliasearch');

// const ALGOLIA_ID = functions.config().algolia.id;
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);

export const searchReview = async (query: any) => {
  const index = client.initIndex('storage');
  return await index.search(query);
};
