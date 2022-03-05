import { IsNotEmpty } from 'class-validator';
export class CreateTaskDto {
  // constructor()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
