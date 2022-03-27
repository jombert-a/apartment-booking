import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../roles/entities/role.entity";
import { roleName } from "../roles/enums/roles.enums";
import { RolesService } from "../roles/roles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

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
	}

	async create(createUserDto: CreateUserDto): Promise<User> {
		await this.checkUserExisting(createUserDto);
		const role: Role = await this.rolesService.getRoleByName(roleName.user);
		const user = await this.usersRepository
			.create({ ...createUserDto, role })
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
