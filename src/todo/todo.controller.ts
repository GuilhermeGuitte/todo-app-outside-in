import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('v1/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }
}
