'use client'

import { SquareKanban, TableProperties } from 'lucide-react'

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/common/Tabs'

import { useTasks } from '@/hooks/task/useTasks'

import BoardView from './board-view/BoardView'
import ListView from './list-view/ListView'
import TableView from './table-view/TableView'

interface IProject {
	projectId: string
}

export default function Project({ projectId }: IProject) {
	const { data } = useTasks(projectId)

	return (
		<Tabs defaultValue='tab-3'>
			<TabsList>
				{/* <TabsTrigger value='tab-1'>Список</TabsTrigger> */}
				<TabsTrigger value='tab-2' className='cursor-pointer'>
					<SquareKanban /> Доска
				</TabsTrigger>
				<TabsTrigger value='tab-3' className='cursor-pointer'>
					<TableProperties />
					Таблица
				</TabsTrigger>
			</TabsList>
			<TabsContent value='tab-1'>
				<ListView />
			</TabsContent>
			<TabsContent value='tab-2'>
				<BoardView data={data?.data || []} projectId={projectId} />
			</TabsContent>
			<TabsContent value='tab-3'>
				<TableView data={data?.data || []} projectId={projectId} />
			</TabsContent>
		</Tabs>
	)
}
