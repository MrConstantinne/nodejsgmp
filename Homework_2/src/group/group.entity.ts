import { v4 } from "uuid";

// eslint-disable-next-line import/namespace
import { Permission } from "./dto/group.dto";

export class GroupEntity {
  private _name: string;
  private _id: string;
  private _permission: Permission[];

  constructor(name?: string, permission?: Permission[], id?: string) {
    if (id) {
      this._id = id;
    }
    if (name) {
      this._name = name;
    }
    if (permission) {
      this._permission = permission;
    }
  }

  get name(): string {
    return this._name;
  }

  get permission(): Permission[] {
    return this._permission;
  }

  get id(): string {
    return this._id;
  }

  public setId(): void {
    this._id = v4();
  }

  public setName(name: string): void {
    this._name = name;
  }

  public setPermission(permission: []): void {
    this._permission = permission;
  }
}
