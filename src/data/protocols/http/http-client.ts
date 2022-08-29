import axios from 'axios'
import { HttpError } from '@/data/errors/http-error'
import { Http } from './typings'

export class HttpClient implements Http.Client {
	constructor (private readonly baseURL: string) {}

	public async request<T> (params: Http.Params): Promise<Http.Response<T>> {
		const { method, url, headers, body } = params

		const allHeaders = Object.assign({
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}, headers ?? {})

		try {
			const { status, data, headers } = await axios.request<T>({
				method,
				url: this.baseURL + url,
				headers: allHeaders,
				data: JSON.stringify(body),
				withCredentials: true
			})

			return { data, status, headers }
		} catch (e) {
			throw new HttpError<T>(e as any)
		}
	}
}
