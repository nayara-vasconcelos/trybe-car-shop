import { NextFunction, Request, Response } from 'express';
import HttpStatus from '../Enums/httpStatus';
import ICar from '../Interfaces/ICar';

import ICarService from '../Interfaces/ICarService';

export default class CarController {
  private readonly _carService: ICarService;

  constructor(CarService: ICarService) {
    this._carService = CarService;
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;

    try {
      const car = await this._carService.create(
        { model, year, color, status, buyValue, doorsQty, seatsQty } as ICar,
      );

      return res.status(HttpStatus.CREATED).json(car);
    } catch (error) {
      next(error);
    }
  };

  public read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cars = await this._carService.read();

      return res.status(HttpStatus.OK).json(cars);
    } catch (error) {
      next(error);
    }
  };

  public readOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const car = await this._carService.readOne(id);

      return res.status(HttpStatus.OK).json(car);
    } catch (error) {
      next(error);
    }
  };

  public updateOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;

    try {
      const updatedCar = await this._carService
        .updateOne(id, { model, year, color, status, buyValue, doorsQty, seatsQty });

      return res.status(HttpStatus.OK).json(updatedCar);
    } catch (error) {
      next(error);
    }
  };
}
