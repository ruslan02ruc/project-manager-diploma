'use client'

import { useMemo } from 'react'
import { Label, Pie, PieChart } from 'recharts'

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

interface ITaskProgressChart {
	done: number
	total: number
}

export default function TaskProgressChart({ done, total }: ITaskProgressChart) {
	const chartData = [
		{ browser: 'Выполнено', visitors: done, fill: 'var(--chart-1)' },
		{ browser: 'Осталось', visitors: total - done, fill: 'var(--chart-2)' }
	]

	const chartConfig = {
		visitors: {
			label: 'Сводка'
		},
		done: {
			label: 'Выполнено',
			color: 'var(--chart-1)'
		},
		total: {
			label: 'Осталось',
			color: 'var(--chart-2)'
		}
	} satisfies ChartConfig

	const totalVisitors = useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
	}, [])

	return (
		<Card>
			<CardHeader className='items-center'>
				<CardTitle>Сводка статусов</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[250px]'
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey='visitors'
							nameKey='browser'
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor='middle'
												dominantBaseline='middle'
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className='fill-foreground text-3xl font-bold'
												>
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className='fill-muted-foreground'
												>
													Сводка
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
