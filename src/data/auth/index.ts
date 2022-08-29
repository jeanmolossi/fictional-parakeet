import { Http } from '@/data/protocols/http/typings'
import { Producer } from '@/domain/producer'
import { Authentication } from './typings'

export class Authenticator {
	constructor (private readonly httpClient: Http.Client) {}

	public async signIn (username: string, password: string): Promise<Authentication.MeProducerResult> {
		const { data } = await this.httpClient.request<Authentication.SessionResult>({
			method: 'POST',
			url: '/auth/login',
			body: {
				username,
				password
			}
		})

		const { data: producer } = await this.httpClient.request<Authentication.MeProducerResult>({
			method: 'GET',
			url: '/students/me',
			headers: {
				Authorization: `${data.access_token}`
			}
		})

		return producer
	}

	public async signOut (): Promise<string> {
		await this.httpClient.request<void>({
			method: 'POST',
			url: '/auth/logout'
		})

		return 'logged out'
	}

	public async checkSession (): Promise<boolean> {
		try {
			await this.httpClient.request({
				method: 'GET',
				url: '/me?fields=usr_id'
			})

			return true
		} catch (e) {
			return false
		}
	}

	public getStudentSync (session: Authentication.MeProducerResult): Producer {
		return new Producer(
			session.id,
			session.email
		)
	}
}
