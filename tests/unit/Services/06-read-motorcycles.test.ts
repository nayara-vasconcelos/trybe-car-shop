import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Deve ser possível listar motos', function () {
  it('Lista todos as motos com sucesso', async function () {
    const motorcyclesMock: IMotorcycle[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];

    const expectedOutput: Motorcycle[] = motorcyclesMock
      .map((motorcycleMock) => new Motorcycle(motorcycleMock));

    sinon.stub(Model, 'find').resolves(motorcyclesMock);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.read();

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(2);
    expect(result[0]).to.be.an('object');
    expect(result[0]).to.have
      .all.keys('id', 'model', 'year', 'color', 'status', 'buyValue', 'category', 'engineCapacity');
    expect(result[0]).to.be.deep.equal(expectedOutput[0]);
    expect(result[0]).to.an.instanceof(Motorcycle);

    sinon.restore();
  });
});
