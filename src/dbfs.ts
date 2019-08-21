import {DataBricksBase, ConstructorProps} from './index'

export interface FileInfo {
	path: string,
	is_dir: boolean,
	file_size: number
}

export default class DBFS extends DataBricksBase {
	
	constructor(args: ConstructorProps) {
		super(args)
		this.path = '/dbfs'
	}
	
	addBlock(param: {handle: number, data: string}) {
		return this.req('post', '/add-block', param)
	}
	
	close(param: {handle: number}) {
		return this.req('post', '/close', param)
	}
	
	create(param: {path: string, overwrite?: boolean}) {
		return this.req('post', '/create', param)
	}
	
	delete(param: {path: string, recursive?: boolean}) {
		return this.req('post', '/delete', param)
	}
	
	getStatus(param: {path: string}): Promise<FileInfo> {
		return this.req('get', '/get-status', param)
	}
	
	list(param: {path: string}): Promise<{files: FileInfo[]}> {
		return this.req('get', '/list', param)
	}
	
	mkdirs(param: {path: string}) {
		return this.req('post', '/mkdirs', param)
	}
	
	move(param: {source_path: string, destination_path: string}) {
		return this.req('post', '/move', param)
	}
	
	put(param: {path: string, contents: string, overwrite?: boolean}) {
		return this.req('post', '/put', param)
	}
	
	read(param: {path: string, offset: number, length: number}): Promise<{bytes_read: number, data: string}> {
		return this.req('get', '/read', param)
	}
	
}
