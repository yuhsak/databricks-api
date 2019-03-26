const DataBricks = require('./index')

module.exports = class Workspace extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'workspace'
	}
	
	delete({path, ...param}) {
		return this.req('post', '/delete', {path, ...param})
	}
	
	export({path, ...param}) {
		return this.req('get', '/export', {path, ...param})
	}
	
	getStatus({path}) {
		return this.req('get', '/get-status', {path})
	}
	
	import({path, ...param}) {
		return this.req('post', '/import', {path, ...param})
	}
	
	list({path}) {
		return this.req('get', '/list', {path})
	}
	
	mkdirs({path}) {
		return this.req('post', '/mkdirs', {path})
	}
	
}
