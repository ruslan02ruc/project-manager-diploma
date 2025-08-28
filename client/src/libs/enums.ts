import {
	CircleCheck,
	ClipboardCheck,
	LoaderCircle,
	ScanSearch,
	ShieldBan,
	SignalHigh,
	SignalLow,
	SignalMedium
} from 'lucide-react'

export enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN',
	GUEST = 'GUEST'
}

export const Priorities = [
	{
		icon: SignalLow,
		label: 'Низкий',
		value: 'LOW'
	},
	{
		icon: SignalMedium,
		label: 'Средний',
		value: 'MEDIUM'
	},
	{
		icon: SignalHigh,
		label: 'Высокий',
		value: 'HIGH'
	}
]

export const StatusOptions = [
	{
		icon: ClipboardCheck,
		label: 'В работе',
		value: 'TODO'
	},
	{
		icon: LoaderCircle,
		label: 'В процессе',
		value: 'IN_PROGRESS'
	},
	{
		icon: ScanSearch,
		label: 'В процессе рассмотрения',
		value: 'REVIEW'
	},
	{
		icon: CircleCheck,
		label: 'Сделано',
		value: 'DONE'
	},
	{
		icon: ShieldBan,
		label: 'Блокированно',
		value: 'BLOCKED'
	}
]

export enum Status {
	TODO = 'TODO',
	IN_PROGRESS = 'IN_PROGRESS',
	REVIEW = 'REVIEW',
	DONE = 'DONE',
	BLOCKED = 'BLOCKED'
}

export enum Priority {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH'
}
