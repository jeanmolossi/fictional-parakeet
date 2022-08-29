import React, { Suspense, useEffect, useState } from 'react'
import { School } from '@mui/icons-material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { appRoutes, RouteConf, userRoutes } from '@/@shared/routes.config'
import { Course } from '@/domain/courses'
import RenderIf from '@/presentation/components/helpers/render-if'
import { useCourses } from '@/presentation/providers'
import { darkTheme } from '@/presentation/styles/theme'

const LazySmallUp = React.lazy(() => import('./small-up'))
const LazyDrawer = React.lazy(() => import('./drawer'))

export const Navbar = () => {
	const { getCourses } = useCourses()
	const mediaMatch = useMediaQuery<typeof darkTheme>(
		(theme) => theme.breakpoints.up('sm')
	)

	const [courses, setCourses] = useState<RouteConf.App[]>([])

	useEffect(() => {
		getCourses.execute(['course_id', 'course_title'], { items_per_page: 5 })
			.then(mapCoursesToRouteConf)
			.then(setCourses)
	}, [])

	return (
		<>
			<RenderIf condition={mediaMatch}>
				<Suspense>
					<LazySmallUp app={appRoutes} courses={courses} mySection={userRoutes} />
				</Suspense>
			</RenderIf>

			<RenderIf condition={!mediaMatch}>
				<Suspense>
					<LazyDrawer app={appRoutes} courses={courses} mySection={userRoutes} />
				</Suspense>
			</RenderIf>
		</>
	)
}

export interface MenuProps {
	app: RouteConf.App[];
	mySection: RouteConf.User[];
	courses: RouteConf.App[];
}

function mapCoursesToRouteConf (courses: Course[]): RouteConf.App[] {
	return courses.map(course => ({
		icon: School,
		id: course.id,
		label: course.title,
		to: `/courses/${course.id}`
	}))
}
