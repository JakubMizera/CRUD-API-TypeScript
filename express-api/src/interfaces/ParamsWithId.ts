import * as z from 'zod';

export const ParamsWithId = z.object({
    // Validate objectID...
    id: z.string().min(1),
})

export type ParamsWithId = z.infer<typeof ParamsWithId>;