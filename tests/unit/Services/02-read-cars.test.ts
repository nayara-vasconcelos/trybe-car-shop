import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

describe('Deve ser possível listar carros', function () {
  it('Lista todos os carros com sucesso', async function () {
    const carsMock: ICar[] = [
      {
        _id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        _id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: false,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    const expectedOutput: Car[] = carsMock.map((carMock) => new Car(carMock));

    sinon.stub(Model, 'find').resolves(carsMock);

    const carService = new CarService();
    const result = await carService.read();

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(2);
    expect(result[0]).to.be.an('object');
    expect(result[0]).to.have
      .all.keys('id', 'model', 'year', 'color', 'status', 'buyValue', 'doorsQty', 'seatsQty');
    expect(result[0]).to.be.deep.equal(expectedOutput[0]);
    expect(result[0]).to.an.instanceof(Car);

    sinon.restore();
  });
});
