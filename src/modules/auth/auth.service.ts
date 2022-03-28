import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { SignInDto } from "./dto/sign-in.dto";
import { TokenDto } from "./dto/token.dto";
import * as bcrypt from "bcrypt";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	createToken(userId: number): TokenDto {
		return {
			access_token: this.jwtService.sign(String(userId)),
		};
	}

	async comparePasswords(
		originalPassword: string,
		hashedPassword: string,
	): Promise<boolean> {
		const isMatched: boolean = await bcrypt.compare(
			originalPassword,
			hashedPassword,
		);
		return isMatched;
	}

	async login(signInDto: SignInDto): Promise<TokenDto | never> {
		const candiate: User = await this.usersService.findOneByEmail(
			signInDto.email,
		);
		if (!candiate) throw new UnauthorizedException();
		const isMatched: boolean = await this.comparePasswords(
			signInDto.password,
			candiate.password,
		);
		if (!isMatched) throw new UnauthorizedException();
		const generatedToken: TokenDto = this.createToken(candiate.id);
		return generatedToken;
	}
}
