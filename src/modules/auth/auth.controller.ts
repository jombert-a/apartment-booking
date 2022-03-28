import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { TokenDto } from "./dto/token.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService,
	) {}

	@Post("sign-up")
	async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
		const createdUser: User = await this.usersService.create(createUserDto);
		return createdUser;
	}

	@Post("sign-in")
	async signIn(@Body() signInDto: SignInDto): Promise<TokenDto> {
		const token: TokenDto = await this.authService.login(signInDto);
		return token;
	}
}
