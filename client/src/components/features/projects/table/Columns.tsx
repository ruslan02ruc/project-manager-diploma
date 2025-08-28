'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/components/ui/common/Avatar'
import { Button } from '@/components/ui/common/Button'
import { Checkbox } from '@/components/ui/common/Checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/common/DropdownMenu'

import { useArchiveProject } from '@/hooks/project/useArchiveProject'
import { useUser } from '@/hooks/user/useUser'

import { IProject } from '@/types/project.types'

import { DataTableColumnHeader } from '../../../ui/elements/DataTableColumnHeader'

import { ADMIN_URL } from '@/libs/constants/url.constants'
import { StatusOptions } from '@/libs/enums'

export const columns: ColumnDef<IProject>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Название' />
		),
		meta: {
			filterVariant: 'toggle'
		},
		cell: ({ row }) => (
			<Link href={ADMIN_URL.project(row.original.id)}>
				{row.original.title}
			</Link>
		)
	},
	{
		accessorKey: 'description',
		header: 'Описание'
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Статус'
				selectEnum={StatusOptions}
			/>
		),
		meta: {
			filterVariant: 'select'
		},
		cell: ({ row }) => {
			const { status } = row.original
			return (
				<div className='flex items-center space-x-2'>
					{(() => {
						const Icon = StatusOptions.find(
							option => option.value === status
						)?.icon
						return Icon ? <Icon className='size-5' /> : null
					})()}
					<p>
						{StatusOptions.find(option => option.value === status)?.label}
					</p>
				</div>
			)
		}
	},
	{
		accessorKey: 'ownerId',
		header: 'Руководитель',
		cell: ({ row }) => {
			const { data } = useUser(row.original.ownerId)
			return (
				<div className='flex items-center space-x-2'>
					<Avatar className='outline-ring cursor-pointer hover:outline-2 hover:outline-offset-2'>
						<AvatarImage src={data?.data.avatar} alt={data?.data.email} />
						<AvatarFallback className='text-xs'>
							{data?.data.email}
						</AvatarFallback>
					</Avatar>
					<p>{data?.data.name}</p>
				</div>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const project = row.original
			const { push } = useRouter()
			const [isOpen, setIsOpen] = useState(false)
			const { archiveProject } = useArchiveProject()
			const ProjectFormUpdate = dynamic(
				() => import('./ProjectFormUpdate'),
				{ ssr: false }
			)
			const setArchive = async (id: string) => {
				await archiveProject({
					id,
					isArchive: { isArchive: !project.isArchive }
				})
			}

			return (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='h-8 w-8 p-0'>
								<span className='sr-only'>Open menu</span>
								<MoreHorizontal className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Действия</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() =>
									navigator.clipboard.writeText(project.id)
								}
							>
								Скопировать ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => push(ADMIN_URL.project(project.id))}
							>
								Просмотр проекта
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setIsOpen(true)}>
								Настройка проекта
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setArchive(project.id)}>
								В архив
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<ProjectFormUpdate
						id={project.id}
						open={isOpen}
						setOpen={setIsOpen}
					/>
				</>
			)
		}
	}
]
