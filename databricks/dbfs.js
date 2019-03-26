const DataBricks = require('./index')

module.exports = class DBFS extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'dbfs'
	}
	
	addBlock({handle, data}) {
		return this.req('post', '/add-block', {handle, data})
	}
	
	close({handle}) {
		return this.req('post', '/close', {handle})
	}
	
	create({path, ...param}) {
		return this.req('post', '/create', {path, ...param})
	}
	
	delete({path, ...param}) {
		return this.req('post', '/delete', {path, ...param})
	}
	
	getStatus({path}) {
		return this.req('get', '/get-status', {path})
	}
	
	list({path}) {
		return this.req('get', '/list', {path})
	}
	
	mkdirs({path}) {
		return this.req('post', '/mkdirs', {path})
	}
	
	move({source_path, destination_path}) {
		return this.req('post', '/move', {source_path, destination_path})
	}
	
	put({path, contents, overwrite=false}) {
		return this.req('post', '/put', {path, contents, overwrite})
	}
	
	read({path, ...param}) {
		return this.req('get', '/read', {path, ...param})
	}
	
}
