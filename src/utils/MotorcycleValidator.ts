import InvalidInputError from '../Errors/InvalidInputError';
import IMotorcycle from '../Interfaces/IMotorcycle';
import VehicleValidator from './VehicleValidator';

export default class MotorcycleValidator extends VehicleValidator {
  protected motorcycle: IMotorcycle;

  constructor(motorcycle: IMotorcycle) {
    super(motorcycle);
    this.motorcycle = motorcycle;
  }

  protected validateCategory = (category: string): void => {
    if (!category) {
      throw new InvalidInputError('"category" is required');
    }

    if (typeof category !== 'string') {
      throw new InvalidInputError('"category" must be a string');
    }
  };

  protected validateEngineCapacity = (engineCapacity: number): void => {
    if (!engineCapacity && engineCapacity !== 0) {
      throw new InvalidInputError('"engineCapacity" is required');
    }

    if (typeof engineCapacity !== 'number') {
      throw new InvalidInputError('"engineCapacity" must be a number');
    }
  };

  public validateAll = (): void => {
    this.checkNotAllowedFieldsTypes(Object.values(this.motorcycle));
    this.validateModel(this.motorcycle.model);
    this.validateYear(this.motorcycle.year);
    this.validateColor(this.motorcycle.color);
    this.validateBuyValue(this.motorcycle.buyValue);
    this.validateCategory(this.motorcycle.category);
    this.validateEngineCapacity(this.motorcycle.engineCapacity);
    if (typeof this.motorcycle.status !== 'undefined') {
      this.validateStatus(this.motorcycle.status);
    }
  };
}
