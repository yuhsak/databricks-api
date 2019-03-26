const qs = require('querystring')
const fetch = require('isomorphic-unfetch')

module.exports = class DataBricks {
	
	constructor({domain, token, version='2.0'}){
		this.domain = domain
		this.token = token
		this.version = version
		this.contentType = 'application/json'
		this.accept = 'application/json'
	}
	
	requestUrl(path) {
		return `https://${this.domain}/api/${this.version}/${this.path||''}${path}`
	}
	
	async req(method, path, param){
		const url = this.requestUrl(path)
		const headers = {'Authorization': `Bearer ${this.token}`, 'Accept': this.accept}
		
		const promise = (async () => {
			if( ['put', 'post', 'patch'].some(m => new RegExp(m, 'i').test(method)) ){
				const body = JSON.stringify(param)
				return fetch(url, {method, headers: {...headers, 'Content-Type': this.contentType}, body})
			} else {
				const query = param ? '?'+qs.stringify(param) : ''
				const urlWithParam = `${url}${query}`
				return fetch(urlWithParam, {method, headers})
			}
		})()
		
		try {
			return (await promise.then(r => r.json()))
		} catch(T_T) {
			throw new Error(T_T)
		}	
	}
	
	get Clusters() {
		return new Clusters({domain: this.domain, version: this.version, token: this.token})
	}
	
	get DBFS() {
		return new DBFS({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Groups() {
		return new Groups({domain: this.domain, version: this.version, token: this.token})
	}
	
	get InstanceProfiles() {
		return new InstanceProfiles({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Jobs() {
		return new Jobs({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Runs() {
		return new Runs({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Libraries() {
		return new Libraries({domain: this.domain, version: this.version, token: this.token})
	}
	
	get SCIM() {
		return new SCIM({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Secrets() {
		return new Secrets({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Workspace() {
		return new Workspace({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Mlflow() {
		return new Mlflow({domain: this.domain, version: this.version, token: this.token})
	}
	
}

const Clusters = require('./clusters')
const DBFS = require('./dbfs')
const Groups = require('./groups')
const InstanceProfiles = require('./instance-profiles')
const Jobs = require('./jobs')
const Runs = require('./runs')
const Libraries = require('./libraries')
const SCIM = require('./scim')
const Secrets = require('./secrets')
const Workspace = require('./workspace')
const Mlflow = require('../mlflow/index')
