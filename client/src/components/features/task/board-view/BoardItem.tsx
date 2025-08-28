import { ITask } from '@/types/task.types'

import BoardCard from './BoardCard'

interface IBoardItem {
	data: ITask[]
	columStatus: string
}

export default function BoardItem({ data, columStatus }: IBoardItem) {
	const filteredTasks = data.filter(task => task.status === columStatus)

	return (
		<div className='space-y-3'>
			{filteredTasks.map(task => (
				<BoardCard key={task.id} task={task} />
			))}
		</div>
	)
}
