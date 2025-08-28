import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/common/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/Dialog'
import { DataTable } from '@/components/ui/elements/DataTable'

import { ITask } from '@/types/task.types'

import { columns } from './Columns'
import TaskFormAdd from './TaskFormAdd'

interface IProject {
	data: ITask[]
	projectId: string
}

export default function TableView({ data, projectId }: IProject) {
	return (
		<div className='container relative mx-auto py-10'>
			<Dialog>
				<DialogTrigger asChild>
					<Button className='absolute right-0 top-0 cursor-pointer'>
						<Plus /> Создать задачу
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Создать задачу</DialogTitle>
						<DialogDescription>Создать новую задачу</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<TaskFormAdd id={projectId} />
					</div>
				</DialogContent>
			</Dialog>
			<DataTable columns={columns} data={data || []} id={projectId} />
		</div>
	)
}

//TODO:при нажатии на название задачи открывать модальное окно с информацией о задаче.
//TODO: просмотр задачи, надо переделать кооментрарии.
