const qs = require('querystring')
const fetch = require('isomorphic-unfetch')

class DataBricks {
	
	constructor({domain, token, version='2.0'}){
		this.domain = domain
		this.token = token
		this.version = version
	}
	
	requestUrl(path) {
		return `https://${this.domain}/api/${this.version}/${path}`
	}
	
	async req(method, path, param){
		const url = this.requestUrl(path)
		const headers = {'Authorization': `Bearer ${this.token}`}
		
		const promise = (async () => {
			if( ['put', 'post'].some(m => new RegExp(m, 'i').test(method)) ){
				const body = JSON.stringify(param)
				return fetch(url, {method, headers: {...headers, 'Content-Type': 'application/json'}, body})
			} else {
				const query = qs.stringify(param)
				const urlWithParam = `${url}?${query}`
				return fetch(urlWithParam, {method, headers})
			}
		})()
		
		try {
			return (await promise.then(r => r.json()))
		} catch(T_T) {
			throw new Error(T_T)
		}	
	}
	
	get Jobs() {
		return new Jobs({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Runs() {
		return new Runs({domain: this.domain, version: this.version, token: this.token})
	}
	
}

class Jobs extends DataBricks {
	
	constructor(args) {
		super(args)
	}
	
	runNow({job_id, ...params}) {
		return this.req('post', 'jobs/run-now', {job_id, ...params})
	}
	
}

class Runs extends DataBricks {
	
	constructor(args) {
		super(args)
	}
	
	get({run_id}) {
		return this.req('get', 'jobs/runs/get', {run_id})
	}
	
	getOutput({run_id}) {
		return this.req('get', 'jobs/runs/get-output', {run_id})
	}
	
	cancel({run_id}) {
		return this.req('get', 'jobs/runs/cancel', {run_id})
	}
	
}

module.exports = DataBricks
