const DataBricks = require('./index')

module.exports = class InstanceProfiles extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'instance-profiles'
	}
	
	add({instance_profile_arn, ...param}) {
		return this.req('post', '/add', {instance_profile_arn, ...param})
	}
	
	list(param) {
		return this.req('get', '/list', param)
	}
	
	remove({instance_profile_arn}) {
		return this.req('post', '/remove', {instance_profile_arn})
	}
	
}
