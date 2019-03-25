const qs = require('querystring')
const fetch = require('isomorphic-unfetch')

class DataBricks {
	
	constructor({domain, token, version='2.0'}){
		this.domain = domain
		this.token = token
		this.version = version
	}
	
	requestUrl(path) {
		return `https://${this.domain}/api/${this.version}/${this.path||''}${path}`
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
	
	get Mlflow() {
		return new Mlflow({domain: this.domain, version: this.version, token: this.token})
	}
	
}

class Jobs extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'jobs'
	}
	
	create(param) {
		return this.req('post', '/create', param)
	}
	
	list() {
		return this.req('get', '/list')
	}
	
	delete({job_id}) {
		return this.req('post', '/delete', {job_id})
	}
	
	get({job_id}) {
		return this.req('get', '/get', {job_id})
	}
	
	reset({job_id, new_settings}) {
		return this.req('post', '/reset', {job_id, new_settings})
	}
	
	runNow({job_id, ...param}) {
		return this.req('post', '/run-now', {job_id, ...param})
	}
	
}

class Runs extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'jobs/runs'
	}
	
	submit(param) {
		return this.req('post', `/submit`, param)
	}
	
	list(param) {
		return this.req('get', `/list`, param)
	}
	
	get({run_id}) {
		return this.req('get', `/get`, {run_id})
	}
	
	export({run_id, views_to_export='CODE'}) {
		return this.req('get', `/export`, {run_id, views_to_export})
	}
	
	cancel({run_id}) {
		return this.req('post', `/cancel`, {run_id})
	}
	
	getOutput({run_id}) {
		return this.req('get', `/get-output`, {run_id})
	}
	
	delete({run_id}) {
		return this.req('post', `/delete`, {run_id})
	}
	
}

class Mlflow extends DataBricks {
	
	constructor(args) {
		super(args)
		this.path = 'preview/mlflow'
	}
	
	get Experiment() {
		return new Experiment({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Runs() {
		return new MlflowRuns({domain: this.domain, version: this.version, token: this.token})
	}
	
}

class Experiment extends Mlflow {
	
	constructor(args) {
		super(args)
		this.path = 'preview/mlflow/experiments'
	}
	
	get({experiment_id}) {
		return this.req('get', '/get', {experiment_id})
	}
	
}

class MlflowRuns extends Mlflow {
	
	constructor(args) {
		super(args)
		this.path = 'preview/mlflow/runs'
	}
	
	search({experiment_ids, ...param}) {
		return this.req('post', '/search', {experiment_ids, ...param})
	}
	
}

module.exports = DataBricks
