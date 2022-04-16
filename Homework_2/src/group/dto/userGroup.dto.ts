import { IsNotEmpty, IsString } from "class-validator";

export class UserGroupDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  groupId: string;
}
