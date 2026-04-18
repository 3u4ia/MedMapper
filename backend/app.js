import express from 'express';
import { routing } from './routes/medRoute.js';
import { registerMiddleware } from './middleware/index.js';


const port = 8080
const app = express();

// Gets the json parsing and cors thing out of the way eventually the gemii stuff will be there too
registerMiddleware(app);

routing(app);


export default app