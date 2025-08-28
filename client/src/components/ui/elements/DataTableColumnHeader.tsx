import { Column, RowData } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown, LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/common/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/common/DropdownMenu'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/common/Select'

import { cn } from '@/libs/utils'

interface DataTableColumnHeaderProps<TData, TValue = string>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>
	title: string
	selectEnum?: {
		icon: LucideIcon
		label: string
		value: string
	}[]
}

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		filterVariant?: 'toggle' | 'select'
	}
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
	selectEnum
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>
	}
	const { filterVariant } = column.columnDef.meta ?? {}
	const columnFilterValue = column.getFilterValue()

	return (
		<div className={cn('flex items-center space-x-2', className)}>
			{filterVariant === 'toggle' ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							size='sm'
							className='data-[state=open]:bg-accent -ml-3 h-8'
						>
							<span>{title}</span>
							{column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : (
								<ChevronsUpDown />
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='start'>
						<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
							<ArrowUp className='text-muted-foreground/70 h-3.5 w-3.5' />
							Asc
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
							<ArrowDown className='text-muted-foreground/70 h-3.5 w-3.5' />
							Desc
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Select
					onValueChange={value => {
						if (value === 'all') {
							column.setFilterValue(undefined)
						} else {
							column.setFilterValue(value)
						}
					}}
					value={columnFilterValue?.toString() ?? 'all'}
				>
					<SelectTrigger className='hover:bg-muted cursor-pointer border-none'>
						<SelectValue
							placeholder={`Выберите ${title.toLowerCase()}`}
						/>
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='all'>
								Все {title.toLowerCase()}ы
							</SelectItem>
							{selectEnum &&
								selectEnum.map(status => (
									<SelectItem key={status.value} value={status.value}>
										<div className='flex items-center gap-2'>
											<status.icon />
											{status.label}
										</div>
									</SelectItem>
								))}
						</SelectGroup>
					</SelectContent>
				</Select>
			)}
		</div>
	)
}
