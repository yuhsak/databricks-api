import {DataBricksBase, ConstructorProps} from './index'

export interface InstanceProfile {
	instance_profile_arn: string
}

export default class InstanceProfiles extends DataBricksBase {
	
	constructor(args: ConstructorProps) {
		super(args)
		this.path = '/instance-profiles'
	}
	
	add(param: InstanceProfile&{skip_validation?: boolean}) {
		return this.req('post', '/add', param)
	}
	
	list(): Promise<{instance_profiles: InstanceProfile[]}> {
		return this.req('get', '/list')
	}
	
	remove(param: InstanceProfile) {
		return this.req('post', '/remove', param)
	}
	
}
