import { NextFunction, Request, Response } from 'express';
import HttpStatus from '../Enums/httpStatus';
import IMotorcycle from '../Interfaces/IMotorcycle';

import IMotorcycleService from '../Interfaces/IMotorcycleService';

export default class MotorcycleController {
  private readonly _motorcycleService: IMotorcycleService;

  constructor(MotorcycleService: IMotorcycleService) {
    this._motorcycleService = MotorcycleService;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const { model, year, color, status, buyValue, category, engineCapacity } = req.body;

    try {
      const motorcycle = await this._motorcycleService.create(
        { model, year, color, status, buyValue, category, engineCapacity } as IMotorcycle,
      );

      return res.status(HttpStatus.CREATED).json(motorcycle);
    } catch (error) {
      next(error);
    }
  };
}