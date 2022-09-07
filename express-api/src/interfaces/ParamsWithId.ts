import { ObjectId, ObjectID } from 'bson';
import * as z from 'zod';

export const ParamsWithId = z.object({
    // Validate objectID...
    id: z.string().min(1).refine((val) => {
        try {
            return new ObjectId(val);
        } catch (error) {
            return false;
        }
    },
        {
            message: 'Invalid ObjectId',
        }),
})

export type ParamsWithId = z.infer<typeof ParamsWithId>;