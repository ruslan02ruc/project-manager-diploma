import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'

import { AuthDto } from '../auth/dto/auth.dto'

import { UpdateUserDto } from './dto/update-user.dto'
import { returnUserObject } from './return-user.object'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				projectsOwned: true,
				tasks: true
			}
		})
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			},
			include: {
				projectsOwned: true,
				tasks: true
			}
		})
	}

	async create(dto: AuthDto) {
		const user = {
			name: dto.name,
			email: dto.email,
			password: await hash(dto.password)
		}

		return this.prisma.user.create({
			data: user
		})
	}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.search(searchTerm)
		return this.prisma.user.findMany({
			select: returnUserObject,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	private async search(searchTerm: string) {
		return this.prisma.user.findMany({
			where: {
				OR: [
					{
						email: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			}
		})
	}

	async update(id: string, dto: UpdateUserDto) {
		return this.prisma.user.update({
			where: {
				id
			},
			data: dto
		})
	}

	async delete(id: string) {
		return this.prisma.user.delete({
			where: {
				id
			}
		})
	}
}
