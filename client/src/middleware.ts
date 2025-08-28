import { NextRequest, NextResponse } from 'next/server'

import { EnumTokens } from '@/services/auth/auth-token.service'

import { userService } from './services/user.service'
import { ADMIN_URL, PUBLIC_URL } from '@/libs/constants/url.constants'

export async function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

	const pathname = request.nextUrl.pathname
	const isAuthPage = pathname.startsWith(PUBLIC_URL.auth())
	const isAdminPage = pathname.startsWith(ADMIN_URL.root())
	const isRootPage = pathname === '/'

	// ✅ 0. Если пользователь НЕ авторизован и на главной странице
	if (isRootPage && !refreshToken) {
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
	}

	// ✅ 1. Если пользователь авторизован и заходит на `/auth` или `/`
	if ((isAuthPage || isRootPage) && refreshToken && accessToken) {
		return NextResponse.redirect(new URL(ADMIN_URL.root(), request.url))
	}

	// ✅ 2. Если пользователь НЕ авторизован и заходит на админку
	if (!refreshToken && isAdminPage) {
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
	}

	// ✅ 3. Если пользователь НЕ авторизован, но пытается открыть любую защищённую страницу
	if (!refreshToken && !isAuthPage && !isRootPage) {
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
	}

	// ✅ 4. Авторизован — можно получить профиль и продолжить
	try {
		if (refreshToken) {
			await userService.getProfileMiddleware(refreshToken)
		}
		return NextResponse.next()
	} catch (error) {
		// Не смогли получить профиль — считаем неавторизованным
		const response = NextResponse.redirect(
			new URL(PUBLIC_URL.auth(), request.url)
		)
		response.cookies.delete(EnumTokens.REFRESH_TOKEN)
		response.cookies.delete(EnumTokens.ACCESS_TOKEN)
		return response
	}
}

export const config = {
	matcher: ['/profile/:path*', '/admin/:path*', '/auth', '/']
}
