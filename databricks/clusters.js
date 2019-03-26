const DataBricks = require('./index')

module.exports = class Clusters extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'clusters'
	}
	
	create(param) {
		return this.req('post', '/create', param)
	}
	
	edit(param) {
		return this.req('post', '/edit', param)
	}
	
	start({cluster_id}) {
		return this.req('post', '/start', {cluster_id})
	}
	
	restart({cluster_id}) {
		return this.req('post', '/start', {cluster_id})
	}
	
	resize({cluster_id, ...param}) {
		return this.req('post', '/resize', {cluster_id, ...param})
	}
	
	delete({cluster_id}) {
		return this.req('post', '/delete', {cluster_id})
	}
	
	permanentDelete({cluster_id}) {
		return this.req('post', '/permanent-delete', {cluster_id})
	}
	
	get({cluster_id}) {
		return this.req('get', '/get', {cluster_id})
	}
	
	pin({cluster_id}) {
		return this.req('post', '/pin', {cluster_id})
	}
	
	unpin({cluster_id}) {
		return this.req('post', '/unpin', {cluster_id})
	}
	
	list() {
		return this.req('get', '/list')
	}
	
	listNodeTypes() {
		return this.req('get', '/list-node-types')
	}
	
	listZones() {
		return this.req('get', '/list-zones')
	}
	
	sparkVersions() {
		return this.req('get', '/spark-versions')
	}
	
	events({cluster_id, ...param}) {
		return this.req('post', '/events', {cluster_id, ...param})
	}
	
}
