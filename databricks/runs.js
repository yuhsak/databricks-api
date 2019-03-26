const DataBricks = require('./index')

module.exports = class Runs extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'jobs/runs'
	}
	
	submit(param) {
		return this.req('post', '/submit', param)
	}
	
	list(param) {
		return this.req('get', '/list', param)
	}
	
	get({run_id}) {
		return this.req('get', '/get', {run_id})
	}
	
	export({run_id, views_to_export='CODE'}) {
		return this.req('get', '/export', {run_id, views_to_export})
	}
	
	cancel({run_id}) {
		return this.req('post', '/cancel', {run_id})
	}
	
	getOutput({run_id}) {
		return this.req('get', '/get-output', {run_id})
	}
	
	delete({run_id}) {
		return this.req('post', '/delete', {run_id})
	}
	
}
