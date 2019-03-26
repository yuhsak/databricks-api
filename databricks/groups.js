const DataBricks = require('./index')

module.exports = class Groups extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'groups'
	}
	
	addMember({parent_name, ...param}) {
		return this.req('post', '/add-member', {parent_name, ...param})
	}
	
	create({group_name}) {
		return this.req('post', '/create', {group_name})
	}
	
	listMembers({group_name}) {
		return this.req('get', '/list-members', {group_name})
	}
	
	list() {
		return this.req('get', '/list')
	}
	
	listParents(param) {
		return this.req('get', '/list-parents', param)
	}
	
	removeMember({parent_name, ...param}) {
		return this.req('post', '/remove-member', {parent_name, ...param})
	}
	
	delete({group_name}) {
		return this.req('post', '/delete', {group_name})
	}
	
}
