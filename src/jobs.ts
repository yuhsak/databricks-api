import {DataBricksBase, ConstructorProps} from './index'
import {ClusterSize, ClusterAttributes} from './clusters'
import {Library} from './libraries'

export type NotebookTask = {
	notebook_path: string,
	base_parameters?: {[key: string]: string}
}

export type SparkJarTask = {
	jar_uri: string,
	main_class_name: string,
	parameters?: string[]
}

export type SparkPythonTask = {
	python_file: string,
	parameters?: string[]
}

export type SparkSubmitTask = {
	parameters?: string[]
}

export type JobTask =
	{notebook_task: NotebookTask} |
	{spark_jar_task: SparkJarTask} |
	{spark_python_task: SparkPythonTask} |
	{spark_submit_task: SparkSubmitTask}

export type CronSchedule = {
	quartz_cron_expression: string,
	timezone_id: string
}

export type NewCluster = Omit<ClusterSize & ClusterAttributes, 'cluster_source'>

export type JobEmailNotifications = {
	on_start?: string[],
	on_success?: string[],
	on_failure?: string[],
	no_alert_for_skipped_runs?: boolean
}

export type Job = {
	job_id: number,
	creator_user_name: string,
	settings: JobSettings,
	created_time: number
}

export type JobSettings = ({existing_cluster_id: string}|{new_cluster: NewCluster})&JobTask&{
	name?: string,
	libraries?: Library[],
	email_notifications?: JobEmailNotifications,
	timeout_seconds?: number,
	max_retries?: number,
	min_retry_interval_millis?: number,
	retry_on_timeout?: boolean,
	schedule?: CronSchedule,
	max_concurrent_runs?: number
}

export default class Jobs extends DataBricksBase {
	
	constructor(args: ConstructorProps) {
		super(args)
		this.path = '/jobs'
	}
	
	create(param: JobSettings): Promise<{job_id: number}> {
		return this.req('post', '/create', param)
	}
	
	list(): Promise<{jobs: Job[]}> {
		return this.req('get', '/list')
	}
	
	delete(param: {job_id: number}) {
		return this.req('post', '/delete', param)
	}
	
	get(param: {job_id: number}): Promise<Job> {
		return this.req('get', '/get', param)
	}
	
	reset(param: {job_id: number, new_settings: JobSettings}) {
		return this.req('post', '/reset', param)
	}
	
	runNow(param: {
		job_id: string,
		jar_params?: string[],
		notebook_params?: {[key: string]: string},
		python_params?: string[],
		spark_submit_params?: string[]
	}): Promise<{run_id: number, number_in_job: number}> {
		return this.req('post', '/run-now', param)
	}
	
}
