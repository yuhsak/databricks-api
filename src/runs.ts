import {DataBricksBase, ConstructorProps} from './index'
import {Library} from './libraries'
import {JobTask, CronSchedule, NewCluster} from './jobs'

export enum RunLifeCycleState {
	PENDING = 'PENDING',
	RUNNING = 'RUNNING',
	TERMINATING = 'TERMINATING',
	TERMINATED = 'TERMINATED',
	SKIPPED = 'SKIPPED',
	INTERNAL_ERROR = 'INTERNAL_ERROR'
}

export enum RunResultState {
	SUCCESS = 'SUCCESS',
	FAILED = 'FAILED',
	TIMEDOUT = 'TIMEDOUT',
	CANCELED = 'CANCELED'
}

export enum TriggerType {
	PERIODIC = 'PERIODIC',
	ONE_TIME = 'ONE_TIME',
	RETRY = 'RETRY'
}

export enum ViewType {
	NOTEBOOK = 'NOTEBOOK',
	DASHBOARD = 'DASHBOARD'
}

export enum ViewsToExport {
	CODE = 'CODE',
	DASHBOARDS = 'DASHBOARDS',
	ALL = 'ALL'
}

export type ViewItem = {
	content: string,
	name: string,
	type: ViewType
}

export type ClusterInstance = {
	cluster_id?: string,
	spark_context_id?: string
}

export type ParamPair = {
	key: string,
	value: string
}

export type Run = {
	job_id: number,
	run_id: number,
	creator_user_name: string,
	number_in_job: number,
	original_attempt_run_id: number,
	state: RunState,
	schedule: CronSchedule,
	cluster_instance: ClusterInstance,
	overriding_parameters: RunParameters,
	start_time: number,
	setup_duration: number,
	execution_duration: number,
	cleanup_duration: number,
	trigger: TriggerType
}

export type RunParameters = {
	jar_params?: string[],
	notebook_params?: {[key: string]: string},
	python_params?: string[],
	spark_submit_params?: string[]
}

export type RunState = {
	life_cycle_state: RunLifeCycleState,
	result_state: RunResultState,
	state_message: string
}

export type NotebookOutput = {
	result: string,
	truncated: boolean
}

export default class Runs extends DataBricksBase {
	
	RunLifecycleState: typeof RunLifeCycleState
	RunResultState: typeof RunResultState
	TriggerType: typeof TriggerType
	ViewType: typeof ViewType
	ViewsToExport: typeof ViewsToExport

	constructor(args: ConstructorProps) {
		super(args)
		this.path = '/jobs/runs'
		this.RunLifecycleState = RunLifeCycleState
		this.RunResultState = RunResultState
		this.TriggerType = TriggerType
		this.ViewType = ViewType
		this.ViewsToExport = ViewsToExport
	}
	
	submit(param: 
		({existing_cluster_id: string}|{new_cluster: NewCluster}) &
		JobTask &
		{run_name: string, libraries: Library[], timeout_seconds: number}
	): Promise<{run_id: number}>{
		return this.req('post', '/submit', param)
	}
	
	list(param:
		({active_only: boolean} | {completed_only : boolean}) & {
			job_id?: number,
			offset?: number,
			limit?: number
	}) {
		return this.req('get', '/list', param)
	}
	
	get(param: {run_id: number}): Promise<Run&{run_page_url: string}> {
		return this.req('get', '/get', param)
	}
	
	export(param: {run_id: number, views_to_export?: ViewsToExport}): Promise<{views: ViewItem[]}> {
		return this.req('get', '/export', param)
	}
	
	cancel(param: {run_id: number}) {
		return this.req('post', '/cancel', param)
	}
	
	getOutput(param: {run_id: number}): Promise<({notebook_output: NotebookOutput}|{error: string})&{metadata: Run}> {
		return this.req('get', '/get-output', param)
	}
	
	delete(param: {run_id: number}) {
		return this.req('post', '/delete', param)
	}
	
}
