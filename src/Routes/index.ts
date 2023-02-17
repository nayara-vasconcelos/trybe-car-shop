import { Router } from 'express';
import carsRouter from './carRoutes';

const routes = Router();

routes.use('/cars', carsRouter);

export default routes;
