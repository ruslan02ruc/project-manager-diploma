'use client'

import { Card, CardContent } from '@/components/ui/common/Card'
import { Skeleton } from '@/components/ui/common/Skeleton'

import { useStatistics } from '@/hooks/useStatistics'

import RolesBarChart from './RolesBarChart'
import TaskProgressChart from './TaskProgressChart'

export default function Statistics() {
	const { data, isLoading } = useStatistics()
	console.log(data)

	if (isLoading) {
		return <Skeleton className='h-48 w-full' />
	}
	return (
		<div className='space-y-4'>
			<Card>
				<CardContent>
					<p>Проектов: {data?.totalProjects}</p>
				</CardContent>
			</Card>
			<div className='grid grid-cols-2 gap-4'>
				<TaskProgressChart
					done={data?.doneTasks || 0}
					total={data?.totalTasks || 0}
				/>{' '}
				<RolesBarChart data={data?.rolesCount || []} />
			</div>
		</div>
	)
}
