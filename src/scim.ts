import {DataBricksBase, ConstructorProps} from './index'

enum Schema {
	User = 'urn:ietf:params:scim:schemas:core:2.0:User',
	Group = 'urn:ietf:params:scim:schemas:core:2.0:Group',
	PatchOp = 'urn:ietf:params:scim:api:messages:2.0:PatchOp'
}

export default class SCIM extends DataBricksBase {
	
	constructor(args: ConstructorProps) {
		super(args)
		this.path = '/preview/scim/v2'
		this.contentType = 'application/scim+json'
		this.accept = 'application/scim+json'
	}
	
	scimParam({schema, ...param}: {schema: Schema, [key: string]: any}): {schemas: Schema[], [key: string]: any} {
		return {schemas: [schema], ...param}
	}
	
	users() {
		return this.req('get', '/Users')
	}
	
	user({id}: {id: string}) {
		return this.req('get', `/Users/${id}`)
	}
	
	createUser({userName, ...param}: {userName: string, [key: string]: any}) {
		const schema = Schema.User
		return this.req('post', '/Users', this.scimParam({schema, userName, ...param}))
	}
	
	updateUser({id, operations}: {id: string, operations: any}) {
		const schema = Schema.PatchOp
		return this.req('patch', `/Users/${id}`, this.scimParam({schema, Operations: operations}))
	}
	
	overwriteUser({id, ...param}: {id: string, [key: string]: any}) {
		const schema = Schema.User
		return this.req('put', `/Users/${id}`, this.scimParam({schema, ...param}))
	}
	
	deleteUser({id}: {id: string}) {
		return this.req('delete', `/Users/${id}`)
	}
	
	groups() {
		return this.req('get', '/Groups')
	}
	
	group({id}: {id: string}) {
		return this.req('get', `/Groups/${id}`)
	}
	
	createGroup({displayName, ...param}: {displayName: string, [key: string]: any}) {
		const schema = Schema.Group
		return this.req('post', '/Groups', this.scimParam({schema, displayName, ...param}))
	}
	
	updateGroup({id, operations}: {id: string, operations: any}) {
		const schema = Schema.PatchOp
		return this.req('patch', `/Groups/${id}`, this.scimParam({schema, Operations: operations}))
	}
	
	deleteGroup({id}: {id: string}) {
		return this.req('delete', `/Groups/${id}`)
	}
	
}
