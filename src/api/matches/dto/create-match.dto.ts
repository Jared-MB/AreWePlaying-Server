import { IsString, IsInt, IsDateString } from 'class-validator';

export class CreateMatchtDto {
  @IsInt()
  localTeamId: number;

  @IsInt()
  visitorTeamId: number;

  @IsDateString()
  date: Date;

  @IsString()
  hour: string; // Formato HH:MM

  @IsString()
  location: string;

  @IsString()
  gender: string;

  @IsInt()
  sportId: number;
}
