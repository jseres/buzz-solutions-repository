const axios = require('axios');
jest.mock('axios');

const { fetchPhotos } = require('../services/flickrService');

describe('flickrService.fetchPhotos', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('requests feed without tags when no tags provided', async () => {
    const fakeData = { items: [] };
    axios.get.mockResolvedValue({ data: fakeData });

    const result = await fetchPhotos();

    expect(axios.get).toHaveBeenCalledTimes(1);
    const calledUrl = axios.get.mock.calls[0][0];
    expect(calledUrl).toContain('https://www.flickr.com/services/feeds/photos_public.gne');
    expect(calledUrl).toContain('format=json');
    expect(result).toBe(fakeData);
  });

  test('encodes and includes tags when provided', async () => {
    const fakeData = { items: [{ title: 'x' }] };
    axios.get.mockResolvedValue({ data: fakeData });

    const result = await fetchPhotos('cats & dogs');

    expect(axios.get).toHaveBeenCalledTimes(1);
    const calledUrl = axios.get.mock.calls[0][0];
    expect(calledUrl).toContain('tags=cats%20%26%20dogs');
    expect(result).toBe(fakeData);
  });
});
