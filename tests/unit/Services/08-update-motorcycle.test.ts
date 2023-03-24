import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import InvalidError from '../../../src/Errors/InvalidError';
import NotFoundError from '../../../src/Errors/NotFoundError';

describe('Deve ser possível atualizar moto por id', function () {
  const motorcycleModel = 'Honda Cb 600f Hornet';

  it('Retorna moto com sucesso quando id for válida e existir no bd ', async function () {
    const validMotorcyleId = '6348513f34c397abcad040b2';

    const validMotorcyle = {
      model: motorcycleModel,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motorcycleMock: IMotorcycle = {
      id: '6348513f34c397abcad040b2',
      model: motorcycleModel,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const expectedOutput: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b2',
      model: motorcycleModel,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    });

    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMock);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.updateOne(validMotorcyleId, validMotorcyle);

    expect(result).to.be.an('object');
    expect(Object.keys(result)).to.have.lengthOf(8);
    expect(result).to.have
      .all.keys('id', 'model', 'year', 'color', 'status', 'buyValue', 'category', 'engineCapacity');
    expect(result).to.be.deep.equal(expectedOutput);
    expect(result).to.an.instanceof(Motorcycle);

    sinon.restore();
  });

  it('Lança uma exceção quando id é inválida', async function () {
    const validMotorcycle = {
      model: motorcycleModel,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    try {
      const motorcycleService = new MotorcycleService();
      await motorcycleService.updateOne('invalidId', validMotorcycle);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
      expect(error).to.be.an.instanceof(InvalidError);
    }
  });

  it('Lança uma exceção quando moto não existir no bd', async function () {
    const notRegisteredId = '634852326b35b59438fbea2f';
    const validMotorcycle: IMotorcycle = {
      model: motorcycleModel,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    try {
      const motorcycleService = new MotorcycleService();
      await motorcycleService.updateOne(notRegisteredId, validMotorcycle);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
      expect(error).to.be.an.instanceof(NotFoundError);
    }

    sinon.restore();
  });
});
