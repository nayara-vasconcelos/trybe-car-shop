import Motorcycle from '../Domains/Motorcycle';
import MotorcycleCategories from '../Enums/motorcycleCategories';
import InvalidInputError from '../Errors/InvalidInputError';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IMotorcycleService from '../Interfaces/IMotorcycleService';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService implements IMotorcycleService {
  private readonly _motorcycleODM: MotorcycleODM;

  constructor() {
    this._motorcycleODM = new MotorcycleODM();
  }

  private _createMotorcycleDomain = (motorcycle: Required<IMotorcycle>): Motorcycle => {
    if (!motorcycle) {
      throw new Error('It was not possible create a new motorcycle');
    }

    return new Motorcycle({
      id: motorcycle.id,
      model: motorcycle.model,
      year: motorcycle.year,
      color: motorcycle.color,
      status: motorcycle.status,
      buyValue: motorcycle.buyValue,
      category: motorcycle.category,
      engineCapacity: motorcycle.engineCapacity,
    });
  };

  private validateCategory = (category: string): void => {
    if (category !== MotorcycleCategories.Street
      && category !== MotorcycleCategories.Custom
      && category !== MotorcycleCategories.Trail) {
      throw new InvalidInputError('Invalid category');
    }
  };

  public create = async (motorcycle: IMotorcycle): Promise<Motorcycle> => {
    this.validateCategory(motorcycle.category);
    const newMotorcycle = await this._motorcycleODM.create(motorcycle);

    return this._createMotorcycleDomain(newMotorcycle as Required<IMotorcycle>);
  };
}
