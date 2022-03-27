import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../roles/entities/role.entity";
import { roleName } from "../roles/enums/roles.enums";
import { RolesService } from "../roles/roles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly rolesService: RolesService,
	) {}

	async checkUserExisting(
		createUserDto: CreateUserDto,
	): Promise<void | never> {
		const emailCandidate = await this.usersRepository.findOne({
			email: createUserDto.email,
		});
		if (emailCandidate) {
			throw new HttpException(
				{
					status: 0,
					error: `Email "${createUserDto.email}" is already taken`,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
		const phoneCandidate = await this.usersRepository.findOne({
			phone: createUserDto.phone,
		});
		if (phoneCandidate) {
			throw new HttpException(
				{
					status: 1,
					error: `Phone "${createUserDto.phone}" is already taken`,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async hashPassword(passwordToHash: string): Promise<string> {
		return await bcrypt.hash(passwordToHash, 7);
	}

	async create(createUserDto: CreateUserDto): Promise<User> {
		await this.checkUserExisting(createUserDto);
		const role: Role = await this.rolesService.getRoleByName(roleName.user);
		const password: string = await this.hashPassword(
			createUserDto.password,
		);
		const user = await this.usersRepository
			.create({ ...createUserDto, role, password })
			.save();
		return await this.usersRepository.findOne({ id: user.id });
	}

	async findAllAndCount(): Promise<[User[], number]> {
		const users = await this.usersRepository.findAndCount();
		return users;
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
