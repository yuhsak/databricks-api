import {DataBricksBase, ConstructorProps} from './index'

export enum ExportFormat {
	SOURCE = 'SOURCE',
	HTML = 'HTML',
	JUPYTER = 'JUPYTER',
	DBC = 'DBC'
}

export enum Language {
	SCALA = 'SCALA',
	PYTHON = 'PYTHON',
	SQL = 'SQL',
	R = 'R'
}

export enum ObjectType {
	NOTEBOOK = 'NOTEBOOK',
	DIRECTORY = 'DIRECTORY',
	LIBRARY = 'LIBRARY'
}

export type ObjectInfo = {
	object_type: ObjectType,
	path: string,
	language?: Language
}

export default class Workspace extends DataBricksBase {

	Exportformat: typeof ExportFormat
	Language: typeof Language
	ObjectType: typeof ObjectType

	constructor(args:ConstructorProps) {
		super(args)
		this.path = '/workspace'
		this.Language = Language
		this.Exportformat = ExportFormat
		this.ObjectType = ObjectType
	}
	
	delete(param:{
		path: string,
		recursive?: boolean
	}) {
		return this.req('post', '/delete', param)
	}
	
	export(param:{
		path: string,
		format?: ExportFormat,
		direct_download?: boolean
	}):Promise<{
		content: string
	}> {
		return this.req('get', '/export', param)
	}
	
	getStatus(param:{
		path: string
	}):Promise<ObjectInfo> {
		return this.req('get', '/get-status', param)
	}
	
	import(param:{
		path: string,
		content: string,
		format?: ExportFormat,
		language?: Language,
		overwrite?: boolean
	}) {
		return this.req('post', '/import', param)
	}
	
	list(param:{
		path: string
	}):Promise<{
		objects: ObjectInfo[]
	}> {
		return this.req('get', '/list', param)
	}
	
	mkdirs(param:{
		path: string
	}) {
		return this.req('post', '/mkdirs', param)
	}
	
}
