import { compare, hash } from "bcrypt";
import { v4 } from "uuid";

export class UsersEntity {
  private _password: string;
  private _id: string;
  private _isDeleted = false;

  constructor(
    private _login: string,
    private _age: number,
    passwordHash?: string,
    id?: string,
  ) {
    if (passwordHash) {
      this._password = passwordHash;
    }
    if (id) {
      this._id = id;
    }
  }

  get id(): string {
    return this._id;
  }

  public setId(): void {
    this._id = v4();
  }

  get login(): string {
    return this._login;
  }

  public setLogin(value: string): void {
    this._login = value;
  }

  get password(): string {
    return this._password;
  }

  public async setPassword(password: string, salt: number): Promise<void> {
    this._password = await hash(password, salt);
  }

  get age(): number {
    return this._age;
  }

  public setAge(value: number): void {
    this._age = value;
  }

  get isDeleted(): boolean {
    return this._isDeleted;
  }

  public setIsDeleted(): void {
    this._isDeleted = true;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this._password);
  }
}
