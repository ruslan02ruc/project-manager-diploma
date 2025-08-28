// import { NextApiRequest, NextApiResponse } from 'next'

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
// 	if (req.method === 'POST') {
// 		const eventData = req.body
// 		console.log('Получены данные вебхука:', eventData)
// 		// Обработка полученных данных
// 		res.status(200).end('Вебхук получен').json({ success: true })
// 	} else {
// 		res.setHeader('Allow', 'POST')
// 		res.status(405).end('Метод не поддерживается')
// 	}
// }
