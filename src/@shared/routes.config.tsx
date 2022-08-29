import React from 'react'
import { IconType } from 'react-icons'
import { Home, QuestionMarkRounded, ShoppingCart, SvgIconComponent } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar'

export namespace RouteConf {
	export interface User {
		id: string;
		label: string;
		to: string;
		icon: IconType | SvgIconComponent | React.ElementType;
	}

	export interface App extends User{}
}

function randomUID () {
	if (typeof window.crypto?.randomUUID !== 'undefined') {
		return window.crypto?.randomUUID()
	}
	return Math.random().toString(16)
}

export const appRoutes: RouteConf.App[] = [
	{
		id: randomUID(),
		label: 'Início',
		to: '/browse',
		icon: Home
	}
]

export const sizedAvatar = (props: any) => <Avatar sx={{ width: 32, height: 32 }} {...props} />
export const userRoutes: RouteConf.User[] = [
	{
		id: randomUID(),
		label: 'Dados pessoais',
		to: '/minha-conta/dados-pessoais',
		icon: sizedAvatar
	},
	{
		id: randomUID(),
		label: 'Minhas compras',
		to: '/minha-conta/minhas-compras',
		icon: ShoppingCart
	},
	{
		id: randomUID(),
		label: 'Ajuda',
		to: '/minha-conta/ajuda',
		icon: QuestionMarkRounded
	}
]
