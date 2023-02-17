import express from 'express';
import 'express-async-errors';
import ErrorHandler from './Middlewares/ErrorHandler';
import routes from './Routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(ErrorHandler.handle);

export default app;
