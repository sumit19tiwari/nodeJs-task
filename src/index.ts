import express, { Express }from 'express';
import http from 'http';
const router: Express = express();
import routes from './routes/stock';


router.use('/', routes);


const httpServer = http.createServer(router);
const PORT: any = 3000;
httpServer.listen(PORT, () => console.log(`The server is running on port 3000`));

export default router;