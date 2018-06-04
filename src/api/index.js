// @flow

import axios from 'axios';

export default axios.create({
  baseURL: `https://thawing-meadow-89074.herokuapp.com`,
  headers: { Accept: 'application/vnd.tool-belt+json; version=1.0' },
});
