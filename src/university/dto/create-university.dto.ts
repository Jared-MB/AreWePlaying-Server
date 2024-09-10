// create-university.dto.ts
import { IsString } from 'class-validator';

export class CreateUniversityDto {
  @IsString()
  name: string;
}
