import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
    let todoController: TodoController;
    let todoService: TodoService;

    beforeEach(() => {
        todoService = new TodoService();
        todoController = new TodoController(todoService);
    });

    it('[200]: should return the list of todos', async () => {
        const result = {
            data: [
                { id: 1, title: 'Do the todo' , status: 'waiting'},
                { id: 2, title: 'Do the todo 2' , status: 'working'},
            ],
        };

        jest.spyOn(todoService, 'findAll').mockImplementationOnce(() => result);

        expect(await todoController.findAll()).toEqual(result);
    });
});
