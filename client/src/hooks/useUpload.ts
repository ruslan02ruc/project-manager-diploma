import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { fileService } from '@/services/file.service'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadImage: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
	preview: string | null
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)
	const [preview, setPreview] = useState<string | null>(null)

	const { mutateAsync } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => fileService.upload(data, folder),
		onSuccess({ data }) {
			onChange(data[0].url)
		},
		onError() {
			toast.error('Ошибка при загрузке файла')
		}
	})

	const uploadImage = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)

			const files = event.target.files
			if (files?.length) {
				const file = files[0]
				const formData = new FormData()
				formData.append('image', file)

				const previewUrl = URL.createObjectURL(file)
				setPreview(previewUrl)

				await mutateAsync(formData)
				setIsLoading(false)
			}
		},
		[mutateAsync]
	)

	return useMemo(
		() => ({
			uploadImage,
			isLoading,
			preview
		}),
		[uploadImage, isLoading, preview]
	)
}
