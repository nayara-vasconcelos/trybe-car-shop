import Car from '../Domains/Car';
import ICar from './ICar';

export default interface ICarService {
  create(car: ICar): Promise<Car>;
  read(): Promise<Car[] | []>;
}
