import { AxiosError } from 'axios'
import { Http } from '@/data/protocols/http/http-client'

export class HttpError<T extends Http.ErrorModels, M = any> extends Error {
	private _status: number
	private _metadata: M

	constructor (error: Error | AxiosError<T>) {
		super(HttpError.getErrMessage(error))
		this.getStatusCode(error)
		this.getMetadata(error)
	}

	get status (): number {
		return this._status
	}

	get metadata (): M {
		return this._metadata
	}

	static getErrMessage<T extends Http.ErrorModels> (error: Error | AxiosError<T>) {
		if (error instanceof AxiosError) {
			return this.getAxiosErrMessage<T>(error)
		}

		return error.message
	}

	private static getAxiosErrMessage<T extends Http.ErrorModels> (error: AxiosError<T>) {
		return error.response?.data?.error ??
			error.response?.data?.message ??
			error.message
	}

	private getStatusCode (error: Error | AxiosError<T>) {
		if (error instanceof AxiosError) {
			this._status = error.response?.status ?? 500
		} else {
			this._status = 500
		}
	}

	private getMetadata (error: Error | AxiosError<T>) {
		if (error instanceof AxiosError) {
			this._metadata = (error.response?.data.errors as M | undefined) ?? {} as M
		}
	}
}
