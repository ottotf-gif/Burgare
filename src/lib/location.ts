// Single source of truth for the fixed location (Golv till Tak, Stenungsund).
// Used by the "Här hittar du oss" map button and the footer address link
// so they always point to the exact same place.

export const LOCATION_NAME = 'Golv till Tak';
export const LOCATION_ADDRESS = 'Stenungsund';

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Golv till Tak Stenungsund');

export const MAPS_EMBED_URL =
  'https://www.google.com/maps?q=' +
  encodeURIComponent('Golv till Tak Stenungsund') +
  '&output=embed';
