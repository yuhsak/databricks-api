const DataBricks = require('../databricks/index')

module.exports = class Mlflow extends DataBricks {
	
	constructor(args) {
		super(args)
		this.mlpath = 'preview/mlflow'
	}
	
	requestUrl(path) {
		return `https://${this.domain}/api/${this.version}/${this.mlpath}/${this.path||''}${path}`
	}
	
	purge({horizon_timestamp}) {
		this.req('post', '/purge', {horizon_timestamp})
	}
	
	get Experiments() {
		return new Experiments({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Runs() {
		return new Runs({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Params() {
		return new Params({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Metrics() {
		return new Metrics({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Artifacts() {
		return new Artifacts({domain: this.domain, version: this.version, token: this.token})
	}
	
}

const Experiments = require('./experiments')
const Runs = require('./runs')
const Params = require('./params')
const Metrics = require('./metrics')
const Artifacts = require('./artifacts')
