const DataBricks = require('./index')

module.exports = class Secrets extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'secrets'
	}
	
	createScope({scope, ...param}) {
		return this.req('post', '/scopes/create', {scope, ...param})
	}
	
	deleteScope({scope}) {
		return this.req('post', '/scopes/delete')
	}
	
	listScopes() {
		return this.req('get', '/scopes/list')
	}
	
	put({scope, key, ...param}) {
		return this.req('post', '/put', {scope, key, ...param})
	}
	
	delete({scope, key}) {
		return this.req('post', '/delete', {scope, key})
	}
	
	list({scope}) {
		return this.req('get', '/list', {scope})
	}
	
	putAcl({scope, principal, permission}) {
		return this.req('post', '/acls/put', {scope, principal, permission})
	}
	
	deleteAcl({scope, principal}) {
		return this.req('post', '/acls/delete', {scope, principal})
	}
	
	getAcl({scope, principal}) {
		return this.req('get', '/acls/get', {scope, principal})
	}
	
	listAcls({scope}) {
		return this.req('get', '/acls/list', {scope})
	}
	
}
