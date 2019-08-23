import {DataBricksBase, ConstructorProps} from './index'

export type PrincipalName = { user_name: string } | { group_name: string }

export default class Groups extends DataBricksBase {

	constructor(args: ConstructorProps) {
		super(args)
		this.path = '/groups'
	}
	
	addMember(param: PrincipalName&{parent_name: string}) {
		return this.req('post', '/add-member', param)
	}
	
	create(param: {group_name: string}): Promise<{group_name: string}> {
		return this.req('post', '/create', param)
	}
	
	listMembers(param: {group_name: string}): Promise<{members: PrincipalName[]}> {
		return this.req('get', '/list-members', param)
	}
	
	list(): Promise<{group_names: string[]}> {
		return this.req('get', '/list')
	}
	
	listParents(param: PrincipalName): Promise<{group_names: string[]}> {
		return this.req('get', '/list-parents', param)
	}
	
	removeMember(param: PrincipalName&{parent_name: string}) {
		return this.req('post', '/remove-member', param)
	}
	
	delete(param: {group_name: string}) {
		return this.req('post', '/delete', param)
	}
	
}
