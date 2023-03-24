import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import FieldsValidator from '../Middlewares/FieldsValidator';
import MotorcycleService from '../Services/MotorcycleService';

const motorcycleService = new MotorcycleService();
const motorcycleController = new MotorcycleController(motorcycleService);

const motorcyclesRouter = Router();

motorcyclesRouter.post('/', FieldsValidator.createMotorcycle, motorcycleController.create);
motorcyclesRouter.get('/', motorcycleController.read);
motorcyclesRouter.get('/:id', motorcycleController.readOne);
motorcyclesRouter.put('/:id', FieldsValidator.updateMotorcycle, motorcycleController.updateOne);

export default motorcyclesRouter;
