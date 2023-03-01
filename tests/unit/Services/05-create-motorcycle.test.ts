import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Deve ser possível criar motos', function () {
  it('Adiciona moto com sucesso', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motorcycleMock: IMotorcycle = {
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const expectedOutput: Motorcycle = new Motorcycle(motorcycleMock);

    sinon.stub(Model, 'create').resolves(motorcycleMock);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.create(motorcycleInput);

    expect(motorcycleService.create).not.to.throw();
    expect(result).to.be.an('object');
    expect(Object.keys(result)).to.have.lengthOf(8);
    expect(result).to.have
      .all.keys('id', 'model', 'year', 'color', 'status', 'buyValue', 'category', 'engineCapacity');
    expect(result).to.be.deep.equal(expectedOutput);
    expect(result).to.an.instanceof(Motorcycle);

    sinon.restore();
  });
});
