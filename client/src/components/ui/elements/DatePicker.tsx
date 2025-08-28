'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { ControllerRenderProps } from 'react-hook-form'

import { Button } from '@/components/ui/common/Button'
import { Calendar } from '@/components/ui/common/Calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/common/Popover'

import { cn } from '@/libs/utils'

interface IDatePicker {
	initialFrom?: Date
	initialTo?: Date
	className?: string
	field?: ControllerRenderProps<any>
}

export function DatePicker({
	initialFrom,
	initialTo,
	className,
	field
}: IDatePicker) {
	const [date, setDate] = useState<DateRange | undefined>(() => {
		if (field?.value) {
			return {
				from: field.value.from ? new Date(field.value.from) : undefined,
				to: field.value.to ? new Date(field.value.to) : undefined
			}
		}
		return {
			from: initialFrom ? new Date(initialFrom) : undefined,
			to: initialTo ? new Date(initialTo) : undefined
		}
	})

	const handleDateChange = (newDate: DateRange | undefined) => {
		setDate(newDate)
		if (field) {
			field.onChange(newDate)
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					id='date'
					variant={'outline'}
					className={cn(
						'justify-start text-left font-normal',
						!date && 'text-muted-foreground'
					)}
				>
					<CalendarIcon />
					{date?.from ? (
						date.to ? (
							<>
								{format(date.from, 'M') === format(date.to, 'M') ? (
									<>
										{format(date.from, 'dd')} -{' '}
										{format(date.to, 'dd LLL y')}
									</>
								) : (
									<>
										{format(date.from, 'dd LLL')} -{' '}
										{format(date.to, 'dd LLL y')}
									</>
								)}
							</>
						) : (
							format(date.from, 'dd LLL y')
						)
					) : (
						<span>Не назначена</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					initialFocus
					mode='range'
					defaultMonth={date?.from}
					selected={date}
					onSelect={handleDateChange}
					numberOfMonths={2}
				/>
			</PopoverContent>
		</Popover>
	)
}
