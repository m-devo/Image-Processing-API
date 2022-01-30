//routes  api/images/filename
import express from 'express';
import images from './imageapi/images';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send('Image Processing Api routes, please enter the correct Url');

});

export default routes;
