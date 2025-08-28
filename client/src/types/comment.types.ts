import { ITask } from '@/types/task.types'
import { IUser } from '@/types/user.types'

export interface IComment {
	id: string
	message: string
	user: IUser
	task: ITask
	parent?: IComment
	replies: IComment[]
}

export interface ICommentEditInput extends Pick<IComment, 'message'> {}
