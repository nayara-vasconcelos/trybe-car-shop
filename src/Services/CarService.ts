import Car from '../Domains/Car';
import NotFoundError from '../Errors/NotFoundError';
import ICar from '../Interfaces/ICar';
import ICarService from '../Interfaces/ICarService';
import CarODM from '../Models/CarODM';

export default class CarService implements ICarService {
  private readonly _carODM: CarODM;

  constructor() {
    this._carODM = new CarODM();
  }

  private _createCarDomain = (car: Required<ICar>): Car => {
    if (!car) {
      throw new Error('It was not possible create a new car');
    }

    return new Car({
      _id: car._id,
      model: car.model,
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty,
    });
  };

  public create = async (car: ICar): Promise<Car> => {
    const newCar = await this._carODM.create(car);

    return this._createCarDomain(newCar as Required<ICar>);
  };

  public read = async (): Promise<Car[] | []> => {
    const cars = await this._carODM.read();

    if (cars.length === 0) { return cars as []; }
    return cars.map((car) => (
      this._createCarDomain(car as Required<ICar>)
    ));
  };

  public readOne = async (id: string): Promise<Car> => {
    const car = await this._carODM.readOne(id);
    if (!car) { throw new NotFoundError('Car not found'); }

    return this._createCarDomain(car as Required<ICar>);
  };

  public updateOne = async (id: string, car: ICar): Promise<Car> => {
    const updatedCar = await this._carODM.updateOne(id, car);
    if (!updatedCar) { throw new NotFoundError('Car not found'); }

    return this._createCarDomain(updatedCar as Required<ICar>);
  };
}
