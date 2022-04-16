import { IsEmail, IsString } from "class-validator";

export class UserLoginDto {
  @IsEmail({}, { message: "Invalid login" })
  login: string;

  @IsString()
  password: string;
}
