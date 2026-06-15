// Single source of truth for the fixed location (Rompen Street Food Market).
// Used by the "Här hittar du oss" map button and the footer address link
// so they always point to the exact same place.

export const LOCATION_NAME = 'Rompen Street Food Market';
export const LOCATION_ADDRESS = 'Lavö Hamn 950, 474 92 Tuvesvik, Ellös';

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Rompen Street Food Market, Lavö Hamn 950, 474 92 Tuvesvik');