'use client'

import { Plus } from 'lucide-react'

import AddProjectForm from '@/components/features/projects/form/AddProjectForm'
import { Button } from '@/components/ui/common/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/Dialog'

import { IProject } from '@/types/project.types'

import { DataTable } from '../../ui/elements/DataTable'

import { columns } from './table/Columns'

interface IProjectsProps {
	data: IProject[]
}

export default function Projects({ data }: IProjectsProps) {
	return (
		<div className='container relative mx-auto py-10'>
			<Dialog>
				<DialogTrigger asChild>
					<Button className='absolute right-0 top-0 cursor-pointer'>
						<Plus /> Создать проект
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Создать проект</DialogTitle>
						<DialogDescription>Создать новый проект</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<AddProjectForm />
					</div>
				</DialogContent>
			</Dialog>
			{/* <QueryHeader /> */}
			<DataTable columns={columns} data={data || []} />
		</div>
	)
}
