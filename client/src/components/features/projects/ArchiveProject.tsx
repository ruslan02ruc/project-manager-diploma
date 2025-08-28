'use client'

import { DataTable } from '@/components/ui/elements/DataTable'

import { useProjects } from '@/hooks/project/useProjects'

import { columns } from './table/Columns'

export default function ArchiveProject() {
	const params = {
		isArchive: true
	}
	const { data } = useProjects(params)

	return <DataTable columns={columns} data={data || []} />
}
