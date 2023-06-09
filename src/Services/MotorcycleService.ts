import Motorcycle from '../Domains/Motorcycle';
import MotorcycleCategories from '../Enums/motorcycleCategories';
import InvalidInputError from '../Errors/InvalidInputError';
import NotFoundError from '../Errors/NotFoundError';
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

  private validateCategory = (category: MotorcycleCategories): void => {
    if (!MotorcycleCategories[category]) {
      throw new InvalidInputError('Invalid category');
    }
  };

  public create = async (motorcycle: IMotorcycle): Promise<Motorcycle> => {
    this.validateCategory(motorcycle.category as MotorcycleCategories);
    const newMotorcycle = await this._motorcycleODM.create(motorcycle);

    return this._createMotorcycleDomain(newMotorcycle as Required<IMotorcycle>);
  };

  public read = async (): Promise<Motorcycle[] | []> => {
    const motorcycles = await this._motorcycleODM.read();

    if (motorcycles.length === 0) { return motorcycles as []; }
    return motorcycles.map((motorcycle) => (
      this._createMotorcycleDomain(motorcycle as Required<IMotorcycle>)
    ));
  };

  public readOne = async (id: string): Promise<Motorcycle> => {
    const motorcycle = await this._motorcycleODM.readOne(id);
    if (!motorcycle) { throw new NotFoundError('Motorcycle not found'); }

    return this._createMotorcycleDomain(motorcycle as Required<IMotorcycle>);
  };

  public updateOne = async (id: string, motorcycle: IMotorcycle): Promise<Motorcycle> => {
    this.validateCategory(motorcycle.category as MotorcycleCategories);
    const updatedMotorcycle = await this._motorcycleODM.updateOne(id, motorcycle);
    if (!updatedMotorcycle) { throw new NotFoundError('Motorcycle not found'); }

    return this._createMotorcycleDomain(updatedMotorcycle as Required<IMotorcycle>);
  };
}
