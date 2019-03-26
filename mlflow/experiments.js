const Mlflow = require('./index')

class Experiments extends Mlflow {
	
	constructor(args) {
		super(args)
		this.path = 'experiments'
	}
	
	create({name, artifact_location}) {
		this.req('post', '/create', {name, artifact_location})
	}
	
	list({view_type='ACTIVE_ONLY'}={}) {
		return this.req('get', '/list', {view_type})
	}
	
	get({experiment_id}) {
		return this.req('get', '/get', {experiment_id})
	}
	
	delete({experiment_id}) {
		return this.req('post', '/delete', {experiment_id})
	}
	
	update({experiment_id, new_name}) {
		return this.req('post', '/update', {experiment_id, new_name})
	}
	
}

module.exports = Experiments
