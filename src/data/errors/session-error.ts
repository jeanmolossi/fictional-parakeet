export class SessionError extends Error {
	constructor (public readonly message: string) {
		super(message)
	}
}
