import Car from '../Domains/Car';
import ICar from './ICar';

export default interface ICarService {
  create(car: ICar): Promise<Car>;
  read(): Promise<Car[] | []>;
  readOne(id: string): Promise<Car>;
  updateOne(id: string, car: ICar): Promise<Car>;
}
