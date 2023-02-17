import { Router } from 'express';
import CarController from '../Controllers/CarController';
import FiledsValidator from '../Middlewares/FieldsValidator';
import CarService from '../Services/CarService';

const carService = new CarService();
const carController = new CarController(carService);

const carsRouter = Router();

carsRouter.post('/', FiledsValidator.createCar, carController.create);
carsRouter.get('/', carController.read);
carsRouter.get('/:id', carController.readOne);

export default carsRouter;
