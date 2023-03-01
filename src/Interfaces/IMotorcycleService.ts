import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from './IMotorcycle';

export default interface IMotorcycleService {
  create(motorcycle: IMotorcycle): Promise<Motorcycle>;
}
