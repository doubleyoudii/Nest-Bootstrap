import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserCreadentialsDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak!',
  })
  password: string;
}
