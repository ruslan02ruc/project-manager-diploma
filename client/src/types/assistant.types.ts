import { IProject } from '@/types/project.types'
import { IUser } from '@/types/user.types'

import { UserRole } from '@/libs/enums'

export interface IAssistant {
	id: string
	project: IProject
	user: IUser
	role: UserRole
}
export interface IAssistantEditInput
	extends Pick<IAssistant, 'user' | 'role'> {}
