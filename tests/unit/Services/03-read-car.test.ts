import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import InvalidError from '../../../src/Errors/InvalidError';
import NotFoundError from '../../../src/Errors/NotFoundError';

describe('Deve ser possível buscar carro por id', function () {
  it('Retorna carro com sucesso quando id for válida e existir no bd ', async function () {
    const validCarId = '634852326b35b59438fbea2f';

    const carMock: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    const expectedOutput: Car = new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    });

    sinon.stub(Model, 'findById').resolves(carMock);

    const carService = new CarService();
    const result = await carService.readOne(validCarId);

    expect(result).to.be.an('object');
    expect(Object.keys(result)).to.have.lengthOf(8);
    expect(result).to.have
      .all.keys('id', 'model', 'year', 'color', 'status', 'buyValue', 'doorsQty', 'seatsQty');
    expect(result).to.be.deep.equal(expectedOutput);
    expect(result).to.an.instanceof(Car);

    sinon.restore();
  });

  it('Lança uma exceção quando id é inválida', async function () {
    try {
      const carService = new CarService();
      await carService.readOne('invalidId');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
      expect(error).to.be.an.instanceof(InvalidError);
    }
  });

  it('Lança uma exceção quando carro não existir no bd', async function () {
    const notRegisteredId = '634852326b35b59438fbea2f';

    sinon.stub(Model, 'findById').resolves(null);

    try {
      const carService = new CarService();
      await carService.readOne(notRegisteredId);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
      expect(error).to.be.an.instanceof(NotFoundError);
    }

    sinon.restore();
  });
});
