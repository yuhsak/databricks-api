import {DataBricksBase, ConstructorProps} from './index'

export interface PublicTokenInfo {
	token_id: string,
	creation_time: number,
	expiry_time: number,
	comment?: string
}

export default class Token extends DataBricksBase {
	
	constructor(args:ConstructorProps) {
		super(args)
		this.path = '/token'
	}
	
	create(param:{
		lifetime_seconds?: number,
		comment?: string
	}={}):Promise<{
		token_value: string,
		token_info: PublicTokenInfo
	}> {
		return this.req('post', '/create', param)
	}
	
	list():Promise<{
		token_infos: PublicTokenInfo[]
	}> {
		return this.req('get', '/list')
	}
	
	revoke(param:{
		token_id: string
	}) {
		return this.req('post', '/delete', param)
	}
	
}
