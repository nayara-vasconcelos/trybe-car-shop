import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import IMotorcycle from '../Interfaces/IMotorcycle';
import CarValidator from '../utils/CarValidator';
import MotorcycleValidator from '../utils/MotorcycleValidator';

export default class FieldsValidator {
  public static createCar = (req: Request, _res: Response, next: NextFunction) => {
    new CarValidator(req.body as ICar).validateAll();
    next();
  };

  public static updateCar = (req: Request, _res: Response, next: NextFunction) => {
    new CarValidator(req.body as ICar).validateAll();
    next();
  };

  public static createMotorcycle = (req: Request, _res: Response, next: NextFunction) => {
    new MotorcycleValidator(req.body as IMotorcycle).validateAll();
    next();
  };

  public static updateMotorcycle = (req: Request, _res: Response, next: NextFunction) => {
    new MotorcycleValidator(req.body as IMotorcycle).validateAll();
    next();
  };
}
