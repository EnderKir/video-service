import { app } from '../src/app';
import request from 'supertest';
import * as assert from 'assert';
import {ApiStatus} from '../src/api/ApiStatus';

describe('VideoRouter', () => {
  it('GET /video', async () => {
    const res = await request(app).get('/video');

    expect(res.status).toBe(ApiStatus.OK);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });

  describe('POST /upload', () => {
    it('return 400 if no data file provided', async () => {
        return request(app)
            .post('/upload')
            .field('videoTitle', 'movie title')
            .field('videoDesc', 'movie description')
            .expect(400);
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
          console.log(err);
          assert.fail(err.message);
        });
    });
  });

  describe('DELETE /video/:id', () => {
    it('return 404 if no such video', async () => {
      return request(app)
          .delete('/delete/123')
          .expect(404);
    });
  });
});

