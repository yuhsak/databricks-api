import {DataBricksBase, ConstructorProps} from './index'

export enum AclPerission {
	READ = 'READ',
	WRITE = 'WRITE',
	MANAGE = 'MANAGE'
}

export enum ScopeBackendType {
	DATABRICKS = 'DATABRICKS'
}

export type AclItem = {
	principal: string,
	permission: AclPerission
}

export type SecretMetaData = {
	key: string,
	last_updated_timestamp: number
}

export type SecretScope = {
	name: string,
	backend_type: ScopeBackendType
}

export default class Secrets extends DataBricksBase {
	
	AclPermission: typeof AclPerission
	ScopeBackendType: typeof ScopeBackendType

	constructor(args: ConstructorProps) {
		super(args)
		this.path = '/secrets'
		this.AclPermission = AclPerission
		this.ScopeBackendType = ScopeBackendType
	}
	
	createScope(param :{scope: string, initial_manage_principal?: string}) {
		return this.req('post', '/scopes/create', param)
	}
	
	deleteScope(param :{scope: string}) {
		return this.req('post', '/scopes/delete', param)
	}
	
	listScopes(): Promise<{scopes: SecretScope[]}> {
		return this.req('get', '/scopes/list')
	}
	
	put(param: ({string_value: string}|{bytes_value: string})&{scope: string, key: string}) {
		return this.req('post', '/put', param)
	}
	
	delete(param: {scope: string, key: string}) {
		return this.req('post', '/delete', param)
	}
	
	list(param: {scope: string}): Promise<{secrets: SecretMetaData[]}> {
		return this.req('get', '/list', param)
	}
	
	putAcl(param: {scope: string, principal: string, permission: AclPerission}) {
		return this.req('post', '/acls/put', param)
	}
	
	deleteAcl(param: {scope: string, principal: string}) {
		return this.req('post', '/acls/delete', param)
	}
	
	getAcl(param: {scope: string, principal: string}): Promise<{principal: string, permission: AclPerission}> {
		return this.req('get', '/acls/get', param)
	}
	
	listAcls(param: {scope: string}): Promise<{items: AclItem[]}> {
		return this.req('get', '/acls/list', param)
	}
	
}
