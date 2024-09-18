import { PartialType } from '@nestjs/mapped-types';
import { CreateMatchtDto } from './create-match.dto';

export class UpdateMatchDto extends PartialType(CreateMatchtDto) {}
