import {
  IsNotEmpty,
  IsString,
  Matches,
  IsNumber,
  Min,
  Max,
} from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]{3,30}$/, {
    message: "Password must contain letters and numbers",
  })
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(4)
  @Max(130)
  age: number;
}
