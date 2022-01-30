// Server and Endpoint load
import express from 'express';
import fileName from './filename';
import routes from './routes/index';

const app: express.Application = express();
//port
const port: number = 3000;

app.use(routes);

//Listen to the server
app.listen(port, async (): Promise<void> => {
  routes.get('/', async (req: express.Request, res: express.Response) => {
    await fileName.resizePath();
  });

  console.log(`The app is working at http//localhost:${port} `);
});

export default app;
