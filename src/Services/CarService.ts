import Car from '../Domains/Car';
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
}
