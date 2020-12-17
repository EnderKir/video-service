import { app } from '../app';
import request from 'supertest';
import * as assert from 'assert';
import { ApiStatus } from './ApiStatus';

describe('VideoRouter', () => {
  describe('GET /video', () => {
    it('should return empty list on application start', async () => {
      const res = await request(app).get('/video');

      expect(res.status).toBe(ApiStatus.OK);
      expect(res.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('POST /upload', () => {
    it('return 400 if no data file provided', async () => {
        return request(app)
            .post('/upload')
            .field('videoTitle', 'movie title')
            .field('videoDesc', 'movie description')
            .expect(ApiStatus.VALIDATION_ERROR);
    });

    it('return video object in case of success', () => {
      const filePath = './test/test.mp4';
      return request(app)
        .post('/upload')
        .field('videoTitle', 'movie title')
        .field('videoDesc', 'movie description')
        .attach('file', filePath)
        .then((res: any) => {
          const { title, description } = res.body;
          expect(title).toBe('movie title');
          expect(description).toBe('movie description');
        })
        .catch((err: any) => {
          assert.fail(err.message);
        });
    });
  });

  describe('DELETE /video/:id', () => {
    it('return 404 if no such video', async () => {
      return request(app)
          .delete('/delete/123')
          .expect(ApiStatus.NOT_FOUND_ERROR);
    });
  });
});

