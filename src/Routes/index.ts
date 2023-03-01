import { Router } from 'express';
import carsRouter from './carRoutes';
import motorcyclesRouter from './motorcycleRoutes';

const routes = Router();

routes.use('/cars', carsRouter);
routes.use('/motorcycles', motorcyclesRouter);

export default routes;
