import { ApiProperty } from "@nestjs/swagger";
import {
	IsEmail,
	IsPhoneNumber,
	IsString,
	Length,
	Matches,
} from "class-validator";
import { passwordRegexp } from "src/shared/regexps.shared";

export class CreateUserDto {
	@IsString()
	@Length(2, 255)
	@ApiProperty()
	fullName: string;

	@IsEmail()
	@ApiProperty()
	email: string;

	@IsPhoneNumber()
	@ApiProperty()
	phone: string;

	@Matches(passwordRegexp)
	@ApiProperty()
	password: string;
}
