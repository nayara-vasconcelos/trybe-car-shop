import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import InvalidError from '../../../src/Errors/InvalidError';
import NotFoundError from '../../../src/Errors/NotFoundError';

describe('Deve ser possível buscar moto por id', function () {
  it('Retorna moto com sucesso quando id for válida e existir no bd ', async function () {
    const validId = '634852326b35b59438fbea2f';

    const motorcycleMock: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const expectedOutput: Motorcycle = new Motorcycle(motorcycleMock);

    sinon.stub(Model, 'findById').resolves(motorcycleMock);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.readOne(validId);

    expect(result).to.be.an('object');
    expect(Object.keys(result)).to.have.lengthOf(8);
    expect(result).to.have
      .all.keys('id', 'model', 'year', 'color', 'status', 'buyValue', 'category', 'engineCapacity');
    expect(result).to.be.deep.equal(expectedOutput);
    expect(result).to.an.instanceof(Motorcycle);

    sinon.restore();
  });

  it('Lança uma exceção quando id é inválida', async function () {
    try {
      const motorcycleService = new MotorcycleService();
      await motorcycleService.readOne('invalidId');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
      expect(error).to.be.an.instanceof(InvalidError);
    }
  });

  it('Lança uma exceção quando moto não existir no bd', async function () {
    const notRegisteredId = '634852326b35b59438fbea2f';

    sinon.stub(Model, 'findById').resolves(null);

    try {
      const motorcycleService = new MotorcycleService();
      await motorcycleService.readOne(notRegisteredId);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
      expect(error).to.be.an.instanceof(NotFoundError);
    }

    sinon.restore();
  });
});
