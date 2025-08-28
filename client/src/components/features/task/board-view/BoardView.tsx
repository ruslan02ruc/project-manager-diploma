import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core'

import { usePusherTask } from '@/hooks/task/usePusherTask'
import { useUpdateTask } from '@/hooks/task/useUpdateTask'

import { ITask } from '@/types/task.types'

import DroppableColumn from './DroppableColumnProps'
import { Status, StatusOptions } from '@/libs/enums'

interface IProject {
	data: ITask[]
	projectId: string
}

export default function BoardView({ data, projectId }: IProject) {
	const { updateTask } = useUpdateTask()
	usePusherTask()

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event
		if (!over) return

		const taskId = active.id as string
		const newStatus = over.id as ITask['status']

		updateTask({ id: taskId, data: { status: newStatus as Status } })
	}

	return (
		<div className='grid grid-cols-5 gap-x-4'>
			<DndContext
				collisionDetection={closestCorners}
				onDragEnd={handleDragEnd}
			>
				{StatusOptions.map(status => (
					<DroppableColumn
						key={status.value}
						status={status}
						data={data}
					/>
				))}
			</DndContext>
		</div>
	)
}

//TODO: кнопку создать переделать
