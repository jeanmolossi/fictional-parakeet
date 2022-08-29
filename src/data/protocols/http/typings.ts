export namespace Http {
	export type Params<T = any> = {
		method: 'GET' | 'POST' | 'PUT' | 'DELETE'
		url: string
		headers?: { [key: string]: string },
		body?: T
	}

	export type Response<T> = {
		status: number
		data: T
		headers?: { [key: string]: string }
	}

	export type Meta = {
		page: number
		items_per_page: number
		next_page?: string
		prev_page?: string
	}

	export type Pagination = {
		page?: number
		items_per_page?: number
	}

	export type ErrorModels = {
		error?: string
		message?: string
		errors?: Array<{
			field: string
			message: string
		}>
	}

	export interface Client {
		request<T>(params: Params): Promise<Response<T>>
	}
}
