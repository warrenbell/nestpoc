import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Foo } from '../src/foo/foo.entity';

describe('Foo Integration Tests', () => {
  let app: INestApplication;
  let createdFooId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /foos', () => {
    it('should create a new foo', () => {
      const createFooDto = {
        name: 'Integration Test Foo',
        description: 'This is a test foo created during integration testing',
      };

      return request(app.getHttpServer())
        .post('/foos')
        .send(createFooDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(createFooDto.name);
          expect(res.body.description).toBe(createFooDto.description);
          expect(res.body).toHaveProperty('createdAt');
          expect(res.body).toHaveProperty('updatedAt');
          
          createdFooId = res.body.id;
        });
    });

    it('should fail with invalid data', () => {
      const invalidFooDto = {
        name: '', // Empty name should fail validation
        description: 'This is a test foo',
      };

      return request(app.getHttpServer())
        .post('/foos')
        .send(invalidFooDto)
        .expect(400);
    });
  });

  describe('GET /foos', () => {
    it('should return all foos', () => {
      return request(app.getHttpServer())
        .get('/foos')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('GET /foos/:id', () => {
    it('should return a specific foo', () => {
      return request(app.getHttpServer())
        .get(`/foos/${createdFooId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(createdFooId);
          expect(res.body.name).toBe('Integration Test Foo');
        });
    });

    it('should return 404 for non-existent foo', () => {
      return request(app.getHttpServer())
        .get('/foos/99999')
        .expect(404);
    });
  });

  describe('PATCH /foos/:id', () => {
    it('should update a foo', () => {
      const updateFooDto = {
        name: 'Updated Integration Test Foo',
      };

      return request(app.getHttpServer())
        .patch(`/foos/${createdFooId}`)
        .send(updateFooDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(createdFooId);
          expect(res.body.name).toBe(updateFooDto.name);
          expect(res.body.description).toBe('This is a test foo created during integration testing');
        });
    });

    it('should return 404 for updating non-existent foo', () => {
      const updateFooDto = {
        name: 'This should not update',
      };

      return request(app.getHttpServer())
        .patch('/foos/99999')
        .send(updateFooDto)
        .expect(404);
    });
  });

  describe('DELETE /foos/:id', () => {
    it('should delete a foo', () => {
      return request(app.getHttpServer())
        .delete(`/foos/${createdFooId}`)
        .expect(204);
    });

    it('should return 404 for deleting non-existent foo', () => {
      return request(app.getHttpServer())
        .delete('/foos/99999')
        .expect(404);
    });
  });
}); 