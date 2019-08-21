import qs from 'querystring'
import fetch from 'isomorphic-unfetch'
import MLflow from 'mlflow'

export interface ConstructorProps {
	domain: string,
	token: string,
	version?: string
}

export class DataBricksBase {

	domain: string
	token: string
	version: string
	protected contentType: string
	protected accept: string
	protected path: string

	constructor({domain, token, version='2.0'}:ConstructorProps){
		this.domain = domain
		this.token = token
		this.version = version
		this.contentType = 'application/json'
		this.accept = 'application/json'
		this.path = '/'
	}
	
	protected requestUrl(path: string) {
		return `https://${this.domain}/api/${this.version}${this.path}${path}`
	}
	
	protected async req(method: string, path: string, param?: any){
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
			const r = await promise.then(async r => {
				const {status, statusText} = r
				const data = await r.json().catch(() => null)
				if(status == 200){
					return data
				} else {
					throw new Error(JSON.stringify({status, statusText, data}))
				}
			})
			return r
		} catch(T_T) {
			throw new Error(T_T)
		}	
	}

}

export default class DataBricks extends DataBricksBase {
	
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

	get Token() {
		return new Token({domain: this.domain, version: this.version, token: this.token})
	}
	
	get Workspace() {
		return new Workspace({domain: this.domain, version: this.version, token: this.token})
	}
	
	get MLflow() {
		return new MLflow({endpoint: `https://${this.domain}`, version: this.version, headers: {'Authorization': `Bearer ${this.token}`}})
	}
	
}

import Clusters from './clusters'
import DBFS from './dbfs'
import Groups from './groups'
import InstanceProfiles from './instance-profiles'
import Jobs from './jobs'
import Runs from './runs'
import Libraries from './libraries'
import SCIM from './scim'
import Secrets from './secrets'
import Token from './token'
import Workspace from './workspace'
