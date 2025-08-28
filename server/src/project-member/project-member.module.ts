import { Module } from '@nestjs/common'

import { PrismaService } from '../prisma.service'

import { ProjectMemberController } from './project-member.controller'
import { ProjectMemberService } from './project-member.service'

@Module({
	controllers: [ProjectMemberController],
	providers: [ProjectMemberService, PrismaService]
})
export class ProjectMemberModule {}
