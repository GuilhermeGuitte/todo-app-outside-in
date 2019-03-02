import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TodoModule } from './../src/todo/todo.module';

describe('TodoApp (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodoModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET todos', () => {
    return request(app.getHttpServer())
      .get('/v1/todos')
      .expect(200)
      .expect({
        data: [
          { id: 1, title: 'Do the todo' , status: 'waiting'},
          { id: 2, title: 'Do the todo 2' , status: 'working'},
        ],
      });
  });

  it('/POST todos', () => {
    return request(app.getHttpServer())
      .post('/v1/todos')
      .expect(200)
      .send({
        data: [
          { title: 'Do the todo' , status: 'waiting'},
        ],
      })
      .then(response => {
        expect(response.body.id).toBe(1);
        expect(response.body.title).toBe('Do the todo');
        expect(response.body.status).toBe('waiting');
      });
  });

  it('/PUT todos', () => {
    request(app.getHttpServer())
      .get('/v1/todos/1')
      .expect(200)
      .then(response => {
        expect(response.body.title).toBe('Do the todo');
        expect(response.body.status).toBe('working');
      });

    return request(app.getHttpServer())
      .put('/v1/todos/1')
      .send(
        {
          status: 'waiting',
        },
      )
      .expect(200)
      .then(response => {
        expect(response.body.title).toBe('Do the todo');
        expect(response.body.status).toBe('waiting');
      });
  });

  it('/DELETE todos', () => {
    request(app.getHttpServer())
      .delete('/v1/todos/1')
      .expect(200);

    return request(app.getHttpServer())
      .get('/v1/todos/1')
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
