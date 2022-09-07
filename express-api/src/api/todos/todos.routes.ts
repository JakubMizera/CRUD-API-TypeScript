import { Router } from 'express';
import * as TodoHandlers from './todos.handlers'
import { Todo } from './todos.model';
import { validateRequest } from '../../middlewares';

const router = Router();


router.get('/', TodoHandlers.findAll);
//router.post ('/', middlewarefunction, middlewarefuncion)
//code will look at incoming request body, if it's good it will call next function, if not it will throw error
router.post(
    '/',
    validateRequest({
        body: Todo,
    }),
    TodoHandlers.createOne
);

export default router;