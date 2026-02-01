const photosController = require('../controllers/photosController');
const flickrService = require('../services/flickrService');

jest.mock('../services/flickrService');

describe('photosController.getPhotos', () => {
  let errorSpy;

  beforeEach(() => {
    // silence console.error output during tests that intentionally trigger errors
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test('returns json data from flickrService on success', async () => {
    const fakeData = { items: [{ title: 'a' }] };
    flickrService.fetchPhotos.mockResolvedValue(fakeData);

    const req = { query: { tags: 'cats' } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    await photosController.getPhotos(req, res);

    expect(flickrService.fetchPhotos).toHaveBeenCalledWith('cats');
    expect(res.json).toHaveBeenCalledWith(fakeData);
  });

  test('responds with 500 and error message on service failure', async () => {
    const err = new Error('network down');
    flickrService.fetchPhotos.mockRejectedValue(err);

    const req = { query: {} };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    await photosController.getPhotos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'network down' });
  });
});
