import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class StatisticsService {
	constructor(private prisma: PrismaService) {}

	async projectStatistics(projectId: string) {
		const project = await this.prisma.project.findUnique({
			where: { id: projectId },
			select: {
				_count: {
					select: {
						tasks: true,
						projectMembers: true
					}
				},
				tasks: {
					select: {
						status: true,
						user: {
							select: {
								id: true,
								name: true,
								email: true,
								avatar: true
							}
						}
					}
				}
			}
		})

		if (!project) {
			throw new NotFoundException('Проект не найден')
		}

		const totalTasks = project._count.tasks
		const totalMembers = project._count.projectMembers

		const statusCounts: Record<string, number> = {}
		const completedTasksUsers: Record<
			string,
			{
				id: string
				name: string
				email: string
				avatar: string
				count: number
			}
		> = {}

		let doneCount = 0

		for (const task of project.tasks) {
			const status = task.status
			statusCounts[status] = (statusCounts[status] || 0) + 1

			if (status === 'DONE') {
				doneCount++

				const user = task.user
				if (user) {
					if (!completedTasksUsers[user.id]) {
						completedTasksUsers[user.id] = { ...user, count: 1 }
					} else {
						completedTasksUsers[user.id].count++
					}
				}
			}
		}

		const progress =
			totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0

		return {
			totalTasks,
			totalMembers,
			statusCounts,
			progress, // % выполнения задач
			completedTasksUsers: Object.values(completedTasksUsers)
		}
	}

	async userStatistics(userId: string) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				_count: {
					select: {
						tasks: true,
						projectMembers: true
					}
				},
				tasks: {
					select: {
						status: true
					}
				},
				projectMembers: {
					select: {
						role: true
					}
				}
			}
		})

		if (!user) {
			throw new NotFoundException('Пользователь не найден')
		}

		const doneTasks = user.tasks.filter(task => task.status === 'DONE').length
		const totalTasks = user._count.tasks
		const progress =
			totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

		const totalProjects = user._count.projectMembers

		const rolesMap: Record<string, number> = {}
		for (const member of user.projectMembers) {
			rolesMap[member.role] = (rolesMap[member.role] || 0) + 1
		}

		const rolesCount = Object.entries(rolesMap).map(([role, count]) => ({
			role,
			count
		}))

		return {
			totalTasks,
			doneTasks,
			progress,
			totalProjects,
			rolesCount
		}
	}
}
