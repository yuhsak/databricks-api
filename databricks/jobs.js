const DataBricks = require('./index')

module.exports = class Jobs extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'jobs'
	}
	
	create(param) {
		return this.req('post', '/create', param)
	}
	
	list() {
		return this.req('get', '/list')
	}
	
	delete({job_id}) {
		return this.req('post', '/delete', {job_id})
	}
	
	get({job_id}) {
		return this.req('get', '/get', {job_id})
	}
	
	reset({job_id, new_settings}) {
		return this.req('post', '/reset', {job_id, new_settings})
	}
	
	runNow({job_id, ...param}) {
		return this.req('post', '/run-now', {job_id, ...param})
	}
	
}
