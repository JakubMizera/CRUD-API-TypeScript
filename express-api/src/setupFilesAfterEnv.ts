import { client } from './db'

//closing database connection after all test
global.afterAll(async () => {
    await client.close();
})