import InvalidInputError from '../Errors/InvalidInputError';
import ICar from '../Interfaces/ICar';
import VehicleValidator from './VehicleValidator';

export default class CarValidator extends VehicleValidator {
  protected car: ICar;

  constructor(car: ICar) {
    super(car);
    this.car = car;
  }

  protected validateDoorsQty = (doorsQty: number): void => {
    if (!doorsQty && doorsQty !== 0) {
      throw new InvalidInputError('"doorsQty" is required');
    }

    if (typeof doorsQty !== 'number') {
      throw new InvalidInputError('"doorsQty" must be a number');
    }
  };

  protected validateSeatsQty = (seatsQty: number): void => {
    if (!seatsQty && seatsQty !== 0) {
      throw new InvalidInputError('"seatsQty" is required');
    }

    if (typeof seatsQty !== 'number') {
      throw new InvalidInputError('"seatsQty" must be a number');
    }
  };

  public validateAll = (): void => {
    this.checkNotAllowedFieldsTypes(Object.values(this.car));
    this.validateModel(this.car.model);
    this.validateYear(this.car.year);
    this.validateColor(this.car.color);
    this.validateBuyValue(this.car.buyValue);
    this.validateDoorsQty(this.car.doorsQty);
    this.validateSeatsQty(this.car.seatsQty);
    if (typeof this.car.status !== 'undefined') {
      this.validateStatus(this.car.status);
    }
  };
}
