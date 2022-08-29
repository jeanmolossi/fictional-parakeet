import React, { Suspense, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountCircle from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import { Button, Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { RouteConf } from '@/@shared/routes.config'
import { MenuProps } from '..'
import { Search, SearchIconWrapper, StyledInputBase } from './styles'

const RenderMenu = React.lazy(() => import('./my-account'))

export default function Alternative ({ app, courses, mySection }: MenuProps) {
	const [anchorEl, setAnchorEl] = useState<HTMLElement>(null!)

	const handleProfileMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null!)
	}

	const menuId = 'account-menu'

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="nada"
						sx={{ mr: 2 }}
					>
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ display: { xs: 'none', sm: 'block' } }}
					>
						LOGO
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Pesquisar..."
							inputProps={{ 'aria-label': 'pesquisa' }}
						/>
					</Search>

					<Grid
						container
						flex={1}
						display={'flex'}
						flexWrap={'wrap'}
						gap={1}
						p={1}
						justifyContent={'strech'}
						alignItems={'center'}
						textAlign={'center'}
						maxHeight={'52px'}
						sx={{ overflowY: 'hidden' }}
					>
						{LinksHandler([...app, ...courses], { maxButtons: 6 })}
					</Grid>

					<Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<Suspense>
				<RenderMenu
					anchorEl={anchorEl}
					onClose={handleMenuClose}
					mySection={mySection}
				/>
			</Suspense>
		</Box>
	)
}

interface LinksHandlerConfig {
	maxButtons?: number;
}

function LinksHandler (links: RouteConf.App[], config: LinksHandlerConfig = {}) {
	const { maxButtons = 99 } = config

	const filterExcess = (_: RouteConf.App, i: number) => i < maxButtons

	const filtered = useMemo(() => links.filter(filterExcess), [links])

	return (
		<>
			{filtered.map((link) => (
				<Button
					sx={{ minWidth: 100, color: 'white' }}
					component={Link}
					to={link.to}
					key={link.id}
				>{link.label}</Button>
			))}
		</>
	)
}
