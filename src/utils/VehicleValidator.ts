import InvalidInputError from '../Errors/InvalidInputError';
import IVehicle from '../Interfaces/IVehicle';
import IVehicleValidator from '../Interfaces/IVehicleValidator';

export default class VehicleValidator implements IVehicleValidator {
  protected vehicle: IVehicle;

  constructor(vehicle: IVehicle) {
    this.vehicle = vehicle;
  }

  protected checkNotAllowedFieldsTypes = (fields: Array<number | string | undefined>): void => {
    // Verifica campos com null e outros objetos
    const isAllowed = fields.every((field) => (typeof field !== 'object'));
    if (!isAllowed) {
      throw new InvalidInputError('Required fields must be number, string or boolean');
    }
  };

  protected validateModel = (model: string) => {
    if (!model) {
      throw new InvalidInputError('"model" is required');
    }

    if (typeof model !== 'string') {
      throw new InvalidInputError('"model" must be a string');
    }
  };

  protected validateYear = (year: number): void => {
    if (!year && year !== 0) {
      throw new InvalidInputError('"year" is required');
    }

    if (typeof year !== 'number') {
      throw new InvalidInputError('"year" must be a number');
    }
  };

  protected validateColor = (color: string): void => {
    if (!color) {
      throw new InvalidInputError('"color" is required');
    }

    if (typeof color !== 'string') {
      throw new InvalidInputError('"color" must be a string');
    }
  };

  protected validateStatus = (status: boolean): void => {
    if (typeof status !== 'boolean') {
      throw new InvalidInputError('"status" must be a boolean');
    }
  };

  protected validateBuyValue = (buyValue: number): void => {
    if (!buyValue && buyValue !== 0) {
      throw new InvalidInputError('"buyValue" is required');
    }

    if (typeof buyValue !== 'number') {
      throw new InvalidInputError('"buyValue" must be a number');
    }
  };

  public validateAll = (): void => {
    this.checkNotAllowedFieldsTypes(Object.values(this.vehicle));
    this.validateModel(this.vehicle.model);
    this.validateYear(this.vehicle.year);
    this.validateColor(this.vehicle.color);
    this.validateBuyValue(this.vehicle.buyValue);
    if (typeof this.vehicle.status !== 'undefined') {
      // Também verifica casos com 0
      this.validateStatus(this.vehicle.status);
    }
  };
}
