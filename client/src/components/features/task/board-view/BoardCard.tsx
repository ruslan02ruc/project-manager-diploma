import { useDraggable } from '@dnd-kit/core'
import { GripVertical } from 'lucide-react'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'

import { ITask } from '@/types/task.types'

interface IBoardCard {
	task: ITask
}

export default function BoardCard({ task }: IBoardCard) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.id
	})

	const style = transform
		? { transform: `translate(${transform.x}px, ${transform.y}px)` }
		: undefined

	return (
		<Card ref={setNodeRef} {...listeners} {...attributes} style={style}>
			<CardHeader>
				<CardTitle className='flex justify-between'>
					{task.title}
					<GripVertical className='cursor-grab active:cursor-grabbing' />
				</CardTitle>
				<CardDescription>{task.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{task.description}</p>
			</CardContent>
		</Card>
	)
}
