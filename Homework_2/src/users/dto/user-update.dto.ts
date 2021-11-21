import { IsString, Matches, IsNumber, Min, Max } from "class-validator";

export class UserUpdateDto {
  @IsString()
  login: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9]{3,30}$/, {
    message: "Password must contain letters and numbers",
  })
  password: string;

  @IsNumber()
  @Min(4)
  @Max(130)
  age: number;
}
