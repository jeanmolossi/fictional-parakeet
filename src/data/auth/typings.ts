export namespace Authentication {
	export interface AccessTokenPayload {
		auth_time: number;
		client_id: string;
		event_id: string;
		exp: number;
		iat: number;
		iss: string;
		jti: string;
		origin_jti: string
		scope: string
		sub: string
		token_use: string
		username: string
	}

	export interface MeProducerResult {
		email: string;
		id: string
	}

	interface AccessToken {
		access_token: string
	}

	export type SessionResult = AccessToken
}
