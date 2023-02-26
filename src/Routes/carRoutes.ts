import { Router } from 'express';
import CarController from '../Controllers/CarController';
import FieldsValidator from '../Middlewares/FieldsValidator';
import CarService from '../Services/CarService';

require('express-async-errors');

const carService = new CarService();
const carController = new CarController(carService);

const carsRouter = Router();

carsRouter.post('/', FieldsValidator.createCar, carController.create);
carsRouter.get('/', carController.read);
carsRouter.get('/:id', carController.readOne);
carsRouter.put('/:id', FieldsValidator.updateCar, carController.updateOne);

export default carsRouter;
