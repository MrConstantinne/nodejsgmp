import {EntityRepository, Repository} from "typeorm";
import {UsersEntity} from "./users.entity";

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity>{}
