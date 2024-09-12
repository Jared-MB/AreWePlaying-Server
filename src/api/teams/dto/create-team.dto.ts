import { IsString, IsInt } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  logo: string;

  @IsInt()
  universityId: number;
}
