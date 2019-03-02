import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TodoModule } from './../src/todo/todo.module';

describe('TodoController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodoModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
});
