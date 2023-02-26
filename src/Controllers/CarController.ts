import { Request, Response } from 'express';
import HttpStatus from '../Enums/httpStatus';
import ICar from '../Interfaces/ICar';

import ICarService from '../Interfaces/ICarService';

export default class CarController {
  private readonly _carService: ICarService;

  constructor(CarService: ICarService) {
    this._carService = CarService;
  }

  public create = async (req: Request, res: Response) => {
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;
    const car = await this._carService.create(
      { model, year, color, status, buyValue, doorsQty, seatsQty } as ICar,
    );

    return res.status(HttpStatus.CREATED).json(car);
  };

  public read = async (req: Request, res: Response) => {
    const cars = await this._carService.read();

    return res.status(HttpStatus.OK).json(cars);
  };

  public readOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = await this._carService.readOne(id);

    return res.status(HttpStatus.OK).json(car);
  };

  public updateOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;
    const updatedCar = await this._carService
      .updateOne(id, { model, year, color, status, buyValue, doorsQty, seatsQty });

    return res.status(HttpStatus.OK).json(updatedCar);
  };
}
