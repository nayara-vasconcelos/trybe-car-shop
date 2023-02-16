import {
  Model,
  Schema,
  model,
  models,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';

import InvalidError from '../Errors/InvalidError';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(modelName: string, schema: Schema) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }

  public create = async (entity: T): Promise<T> => {
    const newEntity = await this.model.create({ ...entity });
    return newEntity;
  };

  public read = async (): Promise<T[] | []> => {
    const entities = await this.model.find();
    return entities;
  };

  public readOne = async (id: string): Promise<T | null> => {
    if (!isValidObjectId(id)) { throw new InvalidError('Invalid mongo id'); }

    const entity = await this.model.findById(id);
    return entity;
  };

  public updateOne = async (id: string, entity: Partial<T>): Promise<T | null> => {
    if (!isValidObjectId(id)) { throw new InvalidError('Invalid mongo id'); }

    const updatedEntity = this.model.findByIdAndUpdate(
      { _id: id },
      { ...entity } as UpdateQuery<T>,
      { new: true },
    );

    return updatedEntity;
  };
}
