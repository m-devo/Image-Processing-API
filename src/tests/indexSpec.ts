//https://www.npmjs.com/package/supertest

import supertest from 'supertest';
import app from '../index';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Testing the responses from  endpoint', (): void => {
  describe('endpoint: /', (): void => {
    it('get /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/images', (): void => {
    it('GET /api/images?filename=encenadaport', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport'
      );

      expect(response.status).toBe(200);
    });

    it('GET /api/images?filename=encenadaport&width=199&height=199 ', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport&width=199&height=199'
      );

      expect(response.status).toBe(200);
    });

    it('GET /api/images?filename=encenadaport&width=-200&height=200 ', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=encenadaport&width=-200&height=200'
      );

      expect(response.status).toBe(200);
    });

    it('GET /api/images', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /foo', (): void => {
    it('returns 404 for failure endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/foo');

      expect(response.status).toBe(404);
    });
  });
});
