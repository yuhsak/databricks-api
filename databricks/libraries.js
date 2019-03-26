const DataBricks = require('./index')

module.exports = class Libraries extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'libraries'
	}
	
	allClustersStatuses() {
		return this.req('get', '/all-clusters-statuses')
	}
	
	clusterStatus({cluster_id}) {
		return this.req('get', '/cluster-status', {cluster_id})
	}
	
	install({cluster_id, libraries}) {
		return this.req('post', '/install', {cluster_id, libraries})
	}
	
	uninstall({cluster_id, libraries}) {
		return this.req('post', '/uninstall', {cluster_id, libraries})
	}
	
}
