import {DataBricksBase, ConstructorProps} from './index'

export enum LibraryInstallStatus {
	PENDING = 'PENDING',
	RESOLVING = 'RESOLVING',
	INSTALLING = 'INSTALLING',
	INSTALLED = 'INSTALLED',
	FAILED = 'FAILED',
	UNINSTALL_ON_RESTART = 'UNINSTALL_ON_RESTART'
}

export type ClusterLibraryStatuses = {
	cluster_id: string,
	library_statuses: LibraryFullStatus[]
}

export type Library = {jar: string} | {egg: string} | {whl: string} | {pypi: PythonPyPiLibrary} | {maven: MavenLibrary} | {cran: RCranLibrary}

export type LibraryFullStatus = {
	library: Library,
	status: LibraryInstallStatus,
	messages: string[],
	is_library_for_all_clusters: boolean
}

export type MavenLibrary = {
	coordinates: string,
	repo?: string,
	exclusions?: string[]
}

export type PythonPyPiLibrary = {
	package: string,
	repo?: string
}

export type RCranLibrary = {
	package: string,
	repo?: string
}

export default class Libraries extends DataBricksBase {
	
	constructor(args: ConstructorProps) {
		super(args)
		this.path = '/libraries'
	}
	
	allClustersStatuses(): Promise<{statuses: ClusterLibraryStatuses[]}> {
		return this.req('get', '/all-clusters-statuses')
	}
	
	clusterStatus(param: {cluster_id: string}): Promise<{cluster_id: string, library_statuses: LibraryFullStatus[]}> {
		return this.req('get', '/cluster-status', param)
	}
	
	install(param: {cluster_id: string, libraries: Library[]}) {
		return this.req('post', '/install', param)
	}
	
	uninstall(param: {cluster_id: string, libraries: Library[]}) {
		return this.req('post', '/uninstall', param)
	}
	
}
