import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Matches } from "class-validator";
import { passwordRegexp } from "src/shared/regexps.shared";

export class SignInDto {
	@ApiProperty({ description: "Email to login" })
	@IsEmail()
	email: string;

	@ApiProperty({ description: "Password to login" })
	@Matches(passwordRegexp)
	password: string;
}
