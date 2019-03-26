const Mlflow = require('./index')

module.exports = class Metrics extends Mlflow {
	
	constructor(args) {
		super(args)
		this.path = 'metrics'
	}
	
	get({run_uuid, metric_key}) {
		return this.req('get', '/get', {run_uuid, metric_key})
	}
	
	getHistory({run_uuid, metric_key}) {
		return this.req('get', '/get-history', {run_uuid, metric_key})
	}
	
}
