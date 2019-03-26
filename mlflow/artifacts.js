const Mlflow = require('./index')

module.exports = class Artifacts extends Mlflow {
	
	constructor(args) {
		super(args)
		this.path = 'artifacts'
	}
	
	list({run_uuid, ...param}) {
		return this.req('get', '/list', {run_uuid, ...param})
	}
	
}
