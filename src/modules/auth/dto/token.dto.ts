import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
	@ApiProperty({ description: "Bearer access token" })
	access_token: string;
}
