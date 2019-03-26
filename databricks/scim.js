const DataBricks = require('./index')

module.exports = class SCIM extends DataBricks {
	
	constructor(args) {
		super(args)
		this.parh = 'preview/scim/v2'
		this.contentType = 'application/scim+json'
		this.accept = 'application/scim+json'
	}
	
	scimParam({schema, ...param}) {
		return {schemas: [schema], ...param}
	}
	
	users() {
		return this.req('get', '/Users')
	}
	
	user({id}) {
		return this.req('get', `/Users/${id}`)
	}
	
	createUser({userName, ...param}) {
		const schema = 'urn:ietf:params:scim:schemas:core:2.0:User'
		return this.req('post', '/Users', scimParam({schema, userName, ...param}))
	}
	
	updateUser({id, Operations}) {
		const schema = 'urn:ietf:params:scim:api:messages:2.0:PatchOp'
		return this.req('patch', `/Users/${id}`, scimParam({schema, Operations}))
	}
	
	overwriteUser({id, ...param}) {
		const schema = 'urn:ietf:params:scim:schemas:core:2.0:User'
		return this.req('put', `/Users/${id}`, scimParam({schema, ...param}))
	}
	
	deleteUser({id}) {
		return this.req('delete', `/Users/${id}`)
	}
	
	groups() {
		return this.req('get', '/Groups')
	}
	
	group({id}) {
		return this.req('get', `/Groups/${id}`)
	}
	
	createGroup({displayName, ...param}) {
		const schema = 'urn:ietf:params:scim:schemas:core:2.0:Group'
		return this.req('post', '/Groups', scimParam({schema, displayName, ...param}))
	}
	
	updateGroup({id, Operations}) {
		const schema = 'urn:ietf:params:scim:api:messages:2.0:PatchOp'
		return this.req('patch', `/Groups/${id}`, Operations)
	}
	
	deleteGroup({id}) {
		return this.req('delete', `/Groups/${id}`)
	}
	
}
