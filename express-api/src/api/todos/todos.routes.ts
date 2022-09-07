import { NextFunction, Router, Request, Response } from 'express';
import * as TodoHandlers from './todos.handlers'
import { Todo } from './todos.model';
import { AnyZodObject, ZodError } from 'zod';

const router = Router();

interface RequestValidators {
    params?: AnyZodObject,
    body?: AnyZodObject,
    query?: AnyZodObject,
}

//every middleware fun require req, res, next function, so we will return this function
function validateRequest(validators: RequestValidators) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (validators.params) {
                req.params = await validators.params.parseAsync(req.params);
            }
            if (validators.body) {
                req.body = await validators.body.parseAsync(req.body);
            }
            if (validators.query) {
                req.query = await validators.query.parseAsync(req.query);
            }
            next();
        } catch (error) {
            //if there is validation error => send 422 status
            if (error instanceof ZodError) {
                res.status(422);
            }
            next(error);
        }
    }
}

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