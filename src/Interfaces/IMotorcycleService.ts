import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from './IMotorcycle';

export default interface IMotorcycleService {
  create(motorcycle: IMotorcycle): Promise<Motorcycle>;
  read(): Promise<Motorcycle[] | []>;
  readOne(id: string): Promise<Motorcycle>;
  updateOne(id: string, motorcycle: IMotorcycle): Promise<Motorcycle>;
}
