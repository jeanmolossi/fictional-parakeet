import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dehaze, Logout } from '@mui/icons-material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { RouteConf } from '@/@shared/routes.config'
import { useAuth } from '@/presentation/providers'
import { MenuProps } from '..'

const DrawerMenu = ({ app, courses, mySection }: MenuProps) => {
	const { signout } = useAuth()
	const [open, setOpen] = useState(false)

	const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
			(event as React.KeyboardEvent).key === 'Shift')
		) {
			return
		}

		setOpen(!open)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						noWrap
						component="div"
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<IconButton onClick={toggleDrawer}>
						<Dehaze sx={{ color: 'whitesmoke' }} />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Drawer
				anchor={'right'}
				open={open}
				onClose={toggleDrawer}
			>
				<Box
					sx={{ width: 250 }}
					role="presentation"
					onClick={toggleDrawer}
					onKeyDown={toggleDrawer}
				>
					{ListItemHandler(app, { listAsWrapper: true })}

					<Divider />

					<List>
						{ListItemHandler(courses)}
					</List>

					<Divider />

					<List>
						{ListItemHandler(mySection)}

						<ListItem disablePadding>
							<ListItemButton onClick={signout}>
								<ListItemIcon><Logout /></ListItemIcon>
								<ListItemText primary={'Sair'} />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</Box>
	)
}

interface ListItemHandlerConfig {
	listAsWrapper?: boolean
}

const ListItemHandler = (routes: RouteConf.App[] | RouteConf.User[], config: ListItemHandlerConfig = {}) => {
	const { listAsWrapper = false } = config
	const Wrapper = listAsWrapper ? List : React.Fragment

	return (
		<Wrapper>
			{routes.map(({ to, label, icon: Icon }, index) => (
				<ListItem key={index} disablePadding>
					<ListItemButton component={Link} to={to}>
						<ListItemIcon><Icon /></ListItemIcon>
						<ListItemText primary={label} />
					</ListItemButton>
				</ListItem>
			))}
		</Wrapper>
	)
}

export default DrawerMenu
