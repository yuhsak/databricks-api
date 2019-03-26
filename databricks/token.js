const DataBricks = require('./index')

module.exports = class Token extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'token'
	}
	
	create(param) {
		return this.req('post', '/create', param)
	}
	
	list() {
		return this.req('get', '/list')
	}
	
	revoke({token_id}) {
		return this.req('post', '/delete', {token_id})
	}
	
}
