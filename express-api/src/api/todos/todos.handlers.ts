import { Response, Request, NextFunction } from 'express';
import { TodoWithId, Todos, Todo } from './todos.model';

export async function findAll(req: Request, res: Response<TodoWithId[]>, next: NextFunction) {
    try {
        const result = await Todos.find();
        const todos = await result.toArray();
        res.json(todos);
    } catch (error) {
        next(error);
    }

};

// Request <> 1st = e.g url with id, 2nd = Res body = TodoWithId, Reqbody = Todo
export async function createOne(req: Request<{}, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) {
    try {
        const insertResult = await Todos.insertOne(req.body);
        if (!insertResult.acknowledged) throw new Error('Error inserting todo');
        res.status(201);
        res.json({
            _id: insertResult.insertedId,
            ...req.body,
        });
    } catch (error) {
        next(error);
    }

};