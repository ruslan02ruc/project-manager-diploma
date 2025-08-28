import { useDroppable } from '@dnd-kit/core'
import { LucideIcon, Plus } from 'lucide-react'

import { Button } from '@/components/ui/common/Button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'

import { ITask } from '@/types/task.types'

import BoardItem from './BoardItem'

interface DroppableColumnProps {
	status: {
		icon: LucideIcon
		value: string
		label: string
	}
	data: ITask[]
}

export default function DroppableColumn({
	status,
	data
}: DroppableColumnProps) {
	const { setNodeRef } = useDroppable({
		id: status.value
	})

	return (
		<Card className='justify-between gap-4'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<status.icon />
					{status.label}
				</CardTitle>
			</CardHeader>
			<CardContent ref={setNodeRef} className='px-2'>
				<BoardItem data={data} columStatus={status.value} />
			</CardContent>
			<CardFooter>
				<Button className='w-full'>
					<Plus /> Создать
				</Button>
			</CardFooter>
		</Card>
	)
}
