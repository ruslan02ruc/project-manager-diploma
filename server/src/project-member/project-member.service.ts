import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { UserRole } from '@prisma/client'

import { PrismaService } from '../prisma.service'

import { ProjectMemberDto } from './dto/project-member.dto'
import { returnProjectMemberObject } from './return-project-member.object'

@Injectable()
export class ProjectMemberService {
	constructor(private prisma: PrismaService) {}

	async getAll(projectId: string, searchTerm?: string) {
		const project = await this.prisma.project.findFirst({
			where: {
				id: projectId
			},
			select: { id: true }
		})
		if (!project) throw new NotFoundException('Проект не найден')

		if (searchTerm) return this.search(projectId, searchTerm)

		return this.prisma.projectMember.findMany({
			where: {
				projectId
			},
			select: returnProjectMemberObject,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	private async search(projectId: string, searchTerm: string) {
		return this.prisma.projectMember.findMany({
			where: {
				projectId,
				user: {
					email: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				}
			},
			select: returnProjectMemberObject,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async getById(id: string) {
		const projectMember = await this.prisma.projectMember.findUnique({
			where: {
				id
			},
			select: returnProjectMemberObject
		})
		if (!projectMember) throw new NotFoundException('Роль не найдена')

		return projectMember
	}

	async create(projectId: string, dto: ProjectMemberDto) {
		const project = await this.prisma.project.findUnique({
			where: {
				id: projectId
			}
		})
		if (!project) throw new NotFoundException('Проект не найден')

		const user = await this.prisma.user.findUnique({
			where: {
				id: dto.userId
			}
		})
		if (!user) throw new NotFoundException('Пользователь не найден')

		const existingMember = await this.prisma.projectMember.findUnique({
			where: {
				projectId_userId: {
					projectId: projectId,
					userId: dto.userId
				}
			}
		})
		if (existingMember)
			throw new BadRequestException(
				'Этот пользователь уже состоит в проекте'
			)

		const projectMember = await this.prisma.projectMember.create({
			data: {
				project: {
					connect: {
						id: projectId
					}
				},
				user: {
					connect: {
						id: dto.userId
					}
				},
				role: dto.role ? UserRole.USER : (dto.role as UserRole)
			}
		})

		return projectMember.id
	}

	async update(id: string, dto: ProjectMemberDto) {
		const oldProjectMember = await this.prisma.projectMember.findUnique({
			where: { id },
			select: { id: true }
		})
		if (!oldProjectMember) throw new NotFoundException('Задача не найден')

		const updatedProjectMember = await this.prisma.projectMember.update({
			where: { id },
			data: {
				role: dto.role as UserRole,
				user: {
					connect: {
						id: dto.userId
					}
				}
			}
		})

		return updatedProjectMember
	}

	async delete(id: string, userId: string) {
		return this.prisma.projectMember.delete({
			where: {
				id
			}
		})
	}
}
