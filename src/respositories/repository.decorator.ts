import { EntityRepository as TypeORMEntityRepository } from 'typeorm'
import { INJECT_ID, REPOSITORY } from '../definitions';

export const EntityRepository = (entity: any): ClassDecorator => {
    return (target: any) => {
        Reflect.defineMetadata(REPOSITORY, entity, target);
        Reflect.defineMetadata(INJECT_ID, 'default', target);

        TypeORMEntityRepository(entity)(target);
    }
}
