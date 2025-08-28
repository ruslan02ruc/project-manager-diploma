'use client'

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/common/Chart'

interface IRolesBarChart {
	data: {
		role: string
		count: number
	}[]
}

export default function RolesBarChart({ data }: IRolesBarChart) {
	const chartData = data.map((role, index) => {
		return {
			browser: role.role,
			visitors: role.count,
			fill: `var(--chart-${index + 1})`
		}
	})

	const chartConfig = {
		visitors: {
			label: 'Сводка'
		},
		ADMIN: {
			label: 'ADMIN',
			color: 'var(--chart-1)'
		},
		USER: {
			label: 'USER',
			color: 'var(--chart-2)'
		},
		GUEST: {
			label: 'GUEST',
			color: 'var(--chart-3)'
		}
	} satisfies ChartConfig

	return (
		<Card>
			<CardHeader className='items-center'>
				<CardTitle>Сводка ролей</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='browser'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={value =>
								chartConfig[value as keyof typeof chartConfig]?.label
							}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>
						<Bar
							dataKey='visitors'
							strokeWidth={2}
							radius={8}
							activeIndex={2}
							activeBar={({ ...props }) => {
								return (
									<Rectangle
										{...props}
										fillOpacity={0.8}
										stroke={props.payload.fill}
										strokeDasharray={4}
										strokeDashoffset={4}
									/>
								)
							}}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
