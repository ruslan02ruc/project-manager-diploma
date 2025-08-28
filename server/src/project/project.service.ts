import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, Status } from '@prisma/client'
import { TelegramService } from 'src/telegram/telegram.service'

import { PrismaService } from '../prisma.service'

import { ProjectDto } from './dto/project.dto'
import { GetProjectQueryDto } from './dto/project.query'
import { returnProjectObject } from './return-project.object'

@Injectable()
export class ProjectService {
	constructor(
		private prisma: PrismaService,
		private readonly telegramService: TelegramService
	) {}

	async getAllQuery(userId: string, query: GetProjectQueryDto) {
		const {
			title,
			status,
			isArchive,
			sortBy = 'createdAt',
			sortOrder = 'desc'
		} = query

		const where: Prisma.ProjectWhereInput = {
			ownerId: userId,
			...(title && {
				title: {
					contains: title,
					mode: 'insensitive'
				}
			}),
			...(status && { status: status as Status }),
			...(typeof isArchive === 'boolean' && { isArchive })
		}

		const orderBy: Prisma.ProjectOrderByWithRelationInput = {
			[sortBy]: sortOrder
		}

		return this.prisma.project.findMany({
			where,
			orderBy,
			select: returnProjectObject
		})
	}

	async getAllStranger(userId: string, query: GetProjectQueryDto) {
		const {
			title,
			status,
			isArchive,
			sortBy = 'createdAt',
			sortOrder = 'desc'
		} = query

		const where: Prisma.ProjectWhereInput = {
			OR: [
				{ ownerId: userId },
				{
					projectMembers: {
						some: {
							userId: userId
						}
					}
				}
			],
			...(title && {
				title: {
					contains: title,
					mode: 'insensitive'
				}
			}),
			...(status && { status: status as Status }),
			...(typeof isArchive === 'boolean' && { isArchive })
		}

		const orderBy: Prisma.ProjectOrderByWithRelationInput = {
			[sortBy]: sortOrder
		}

		return this.prisma.project.findMany({
			where,
			orderBy,
			select: returnProjectObject
		})
	}

	async getAll(userId: string) {
		return this.prisma.project.findMany({
			where: {
				OR: [
					{
						ownerId: userId
					}
				]
			},
			select: returnProjectObject,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async getById(id: string) {
		const project = await this.prisma.project.findUnique({
			where: {
				id
			},
			select: returnProjectObject
		})
		if (!project) throw new NotFoundException('Проект не найден')

		return project
	}

	async getByStrangerId(id: string, userId: string) {
		const project = await this.prisma.project.findUnique({
			where: {
				id,
				OR: [
					{ ownerId: userId },
					{
						projectMembers: {
							some: {
								userId
							}
						}
					}
				]
			},
			select: returnProjectObject
		})
		if (!project)
			throw new NotFoundException('Проект не найден или у вас нет доступа')

		return project
	}

	async create(userId: string, dto: ProjectDto) {
		return this.prisma.project.create({
			data: {
				title: dto.title,
				description: dto.description,
				owner: {
					connect: {
						id: userId
					}
				},
				tasks: {
					connect: []
				}
			}
		})
	}

	async update(id: string, dto: ProjectDto) {
		const project = await this.prisma.project.findUnique({
			where: {
				id
			}
		})

		await this.telegramService.notifyProjectMembers(
			id,
			`🆕 проект id: *${project.title}* ${dto.isArchive === true ? 'в архиве' : 'активен'}`
		)
		return this.prisma.project.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		return this.prisma.project.delete({
			where: {
				id
			}
		})
	}
}
