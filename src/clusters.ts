import {DataBricksBase, ConstructorProps} from './index'

export enum AwsAvailability {
	SPOT = 'SPOT',
	ON_DEMAND = 'ON_DEMAND',
	SPOT_WITH_FALLBACK = 'SPOT_WITH_FALLBACK'
}

export enum EbsVolumeType {
	GENERAL_PURPOSE_SSD = 'GENERAL_PURPOSE_SSD',
	THROUGHPUT_OPTIMIZED_HDD = 'THROUGHPUT_OPTIMIZED_HDD'
}

export enum ClusterEventType {
	CREATING = 'CREATING',
	DID_NOT_EXPAND_DISK = 'DID_NOT_EXPAND_DISK',
	EXPANDED_DISK = 'EXPANDED_DISK',
	FAILED_TO_EXPAND_DISK = 'FAILED_TO_EXPAND_DISK',
	INIT_SCRIPTS_STARTING = 'INIT_SCRIPTS_STARTING',
	INIT_SCRIPTS_FINISHED = 'INIT_SCRIPTS_FINISHED',
	STARTING = 'STARTING',
	RESTARTING = 'RESTARTING',
	TERMINATING = 'TERMINATING',
	EDITED = 'EDITED',
	RUNNING = 'RUNNING',
	RESIZING = 'RESIZING',
	UPSIZE_COMPLETED = 'UPSIZE_COMPLETED',
	NODES_LOST = 'NODES_LOST',
	DRIVER_HEALTHY = 'DRIVER_HEALTHY',
	DRIVER_UNAVAILABLE = 'DRIVER_UNAVAILABLE',
	SPARK_EXCEPTION = 'SPARK_EXCEPTION',
	DRIVER_NOT_RESPONDING = 'DRIVER_NOT_RESPONDING',
	DBFS_DOWN = 'DBFS_DOWN',
	METASTORE_DOWN = 'METASTORE_DOWN',
	AUTOSCALING_STATS_REPORT = 'AUTOSCALING_STATS_REPORT',
	NODE_BLACKLISTED = 'NODE_BLACKLISTED',
	PINNED = 'PINNED',
	UNPINNED = 'UNPINNED'
}

export enum ClusterSource {
	UI = 'UI',
	JOB = 'JOB',
	API = 'API'
}

export enum ClusterState {
	PENDING = 'PENDING',
	RUNNING = 'RUNNING',
	RESTARTING = 'RESTARTING',
	RESIZING = 'RESIZING',
	TERMINATING = 'TERMINATING',
	TERMINATED = 'TERMINATED',
	ERROR = 'ERROR',
	UNKNOWN = 'UNKNOWN'
}

export enum TerminationCode {
	USER_REQUEST = 'USER_REQUEST',
	JOB_FINISHED = 'JOB_FINISHED',
	INACTIVITY = 'INACTIVITY',
	CLOUD_PROVIDER_SHUTDOWN = 'CLOUD_PROVIDER_SHUTDOWN',
	COMMUNICATION_LOST = 'COMMUNICATION_LOST',
	CLOUD_PROVIDER_LAUNCH_FAILURE = 'CLOUD_PROVIDER_LAUNCH_FAILURE',
	SPARK_STARTUP_FAILURE = 'SPARK_STARTUP_FAILURE',
	INVALID_ARGUMENT = 'INVALID_ARGUMENT',
	UNEXPECTED_LAUNCH_FAILURE = 'UNEXPECTED_LAUNCH_FAILURE',
	INTERNAL_ERROR = 'INTERNAL_ERROR',
	INSTANCE_UNREACHABLE = 'INSTANCE_UNREACHABLE',
	INSTANCE_POOL_CLUSTER_FAILURE = 'INSTANCE_POOL_CLUSTER_FAILURE',
	REQUEST_REJECTED = 'REQUEST_REJECTED',
	INIT_SCRIPT_FAILURE = 'INIT_SCRIPT_FAILURE',
	TRIAL_EXPIRED = 'TRIAL_EXPIRED'
}

export enum TerminationParameter {
	username = 'username',
	aws_api_error_code = 'aws_api_error_code',
	aws_instance_state_reason = 'aws_instance_state_reason',
	aws_spot_request_status = 'aws_spot_request_status',
	aws_spot_request_fault_code = 'aws_spot_request_fault_code',
	aws_impaired_status_details = 'aws_impaired_status_details',
	aws_instance_status_event = 'aws_instance_status_event',
	aws_error_message = 'aws_error_message',
	databricks_error_message = 'databricks_error_message',
	inactivity_duration_min = 'inactivity_duration_min',
	instance_id = 'instance_id'
}

export enum ListOrder {
	DESC = 'DESC',
	ASC = 'ASC'
}

export enum ResizeCause {
	AUTOSCALE = 'AUTOSCALE',
	USER_REQUEST = 'USER_REQUEST',
	AUTORECOVERY = 'AUTORECOVERY'
}

export enum ClusterCloudProviderNodeStatus {
	NotEnabledOnSubscription = 'NotEnabledOnSubscription',
	NotAvailableInRegion = 'NotAvailableInRegion'
}

export type AutoScale = {
	min_workers: number,
	max_workers: number
}

export type ClusterAttributes = {
	cluster_name?: string,
	spark_version: string,
	spark_conf?: SparkConfPair,
	aws_attributes?: AwsAttributes,
	node_type_id: string,
	driver_node_type_id?: string,
	ssh_public_keys?: string[],
	custom_tags?: ClusterTag[],
	cluster_log_conf?: ClusterLogConf,
	init_scripts?: InitScriptInfo[],
	spark_env_vars?: SparkEnvPair,
	autotermination_minutes: number,
	enable_elastic_disk?: boolean,
	instance_pool_id?: string,
	cluster_source: AwsAvailability
}

export type ClusterSize = {num_workers: number} | {autoscale: AutoScale}

export type ClusterInfo = ClusterSize & ClusterAttributes &  {
	cluster_id: string,
	creator_user_name: string,
	driver: SparkNode,
	executors: SparkNode[],
	spark_context_id: number,
	jdbc_port: number,
	state: ClusterState,
	state_message: string,
	start_time: number,
	terminated_time: number,
	last_state_loss_time: number,
	last_activity_time: number,
	cluster_memory_mb: number,
	cluster_cores: number,
	default_tags: ClusterTag[]
	cluster_log_status: LogSyncStatus,
	termination_reason: S3StorageInfo
}

export type ClusterEvent = {
	cluster_id: string,
	timestamp: number,
	type: ClusterEventType,
	details: AwsAttributes
}

export type AwsAttributes = {
	first_on_demand: number,
	availability: AwsAvailability,
	zone_id: string,
	instance_profile_arn: string,
	spot_bid_price_percent: number,
	ebs_volume_type: EbsVolumeType,
	ebs_volume_count: number,
	ebs_volume_size: number
}

export type EventDetails = {
	current_num_workers: number,
	target_num_workers: number,
	previous_attributes: ClusterAttributes,
	attributes: ClusterAttributes,
	previous_cluster_size: ClusterSize,
	cluster_size: ClusterSize,
	cause: ResizeCause,
	reason: S3StorageInfo,
	user: string
}

export type ClusterLogConf = {dbfs: DbfsStorageInfo} | {s3: S3StorageInfo}

// This probably a type in official doc
export type InitScriptInfo = {dbfs: DbfsStorageInfo} | {s3: S3StorageInfo}

export type ClusterTag = {
	key: string,
	value: string
}

export type DbfsStorageInfo = {
	destination: string
}

export type LogSyncStatus = {
	last_attempted: number,
	last_exception: number
}

export type NodeType = {
	node_type_id: string,
	memory_mb: number,
	num_cores: number,
	description: string,
	instance_type_id: string,
	is_deprecated: boolean,
	node_info: ClusterCloudProviderNodeInfo
}

export type ClusterCloudProviderNodeInfo = {
	status: ClusterCloudProviderNodeStatus,
	available_core_quota: number,
	total_core_quota: number
}

export type ParameterPair = {
	key: TerminationParameter,
	value: string
}

export type SparkConfPair = {
	key: string,
	value: string
}

export type SparkEnvPair = {
	key: string,
	value: string
}

export type SparkNode = {
	private_ip: string,
	public_dns: string,
	node_id: string,
	instance_id: string,
	start_timestamp: string,
	node_aws_attributes: SparkNodeAwsAttributes,
	host_private_ip: string
}

export type SparkVersion = {
	key: string,
	name: string
}

export type S3StorageInfo = {
	destination: string,
	region: string,
	endpoint: string,
	enable_encryption: boolean,
	encryption_type: string,
	kms_key: string,
	canned_acl: string
}

export type SparkNodeAwsAttributes = {
	is_spot: boolean
}

export type TerminationReason = {
	code: TerminationCode,
	parameters: ParameterPair[]
}

export type EventsRequest = {
	cluster_id: string,
	start_time?: number,
	end_time?: number,
	order?: ListOrder,
	event_types?: ClusterEventType[],
	offset?: number,
	limit?: number
}

export default class Clusters extends DataBricksBase {
	
	AwsAvailability: typeof AwsAvailability
	EbsVolumeType: typeof EbsVolumeType
	ClusterEventType: typeof ClusterEventType
	ClusterSource: typeof ClusterSource
	ClusterState: typeof ClusterState
	TerminationCode: typeof TerminationCode
	TerminationParameter: typeof TerminationParameter
	ListOrder: typeof ListOrder
	ResizeCause: typeof ResizeCause
	ClusterCloudProviderNodeStatus: typeof ClusterCloudProviderNodeStatus

	constructor(args:ConstructorProps) {
		super(args)
		this.path = '/clusters'
		this.AwsAvailability = AwsAvailability
		this.EbsVolumeType = EbsVolumeType
		this.ClusterEventType = ClusterEventType
		this.ClusterSource = ClusterSource
		this.ClusterState = ClusterState
		this.TerminationCode = TerminationCode
		this.TerminationParameter = TerminationParameter
		this.ListOrder = ListOrder
		this.ResizeCause = ResizeCause
		this.ClusterCloudProviderNodeStatus = ClusterCloudProviderNodeStatus
	}
	
	create(param: Omit<ClusterSize&ClusterAttributes, 'cluster_source'>): Promise<{cluster_id: string}> {
		return this.req('post', '/create', param)
	}
	
	edit(param: Omit<ClusterSize&ClusterAttributes, 'cluster_source'>) {
		return this.req('post', '/edit', param)
	}
	
	start(param: {cluster_id: string}) {
		return this.req('post', '/start', param)
	}
	
	restart(param: {cluster_id: string}) {
		return this.req('post', '/start', param)
	}
	
	resize(param: ClusterSize&{cluster_id: string}) {
		return this.req('post', '/resize', param)
	}
	
	delete(param: {cluster_id: string}) {
		return this.req('post', '/delete', param)
	}
	
	permanentDelete(param: {cluster_id: string}) {
		return this.req('post', '/permanent-delete', param)
	}
	
	get(param: {cluster_id: string}):Promise<ClusterInfo> {
		return this.req('get', '/get', param)
	}
	
	pin(param: {cluster_id: string}) {
		return this.req('post', '/pin', param)
	}
	
	unpin(param: {cluster_id: string}) {
		return this.req('post', '/unpin', param)
	}
	
	list(): Promise<{clusters: ClusterInfo[]}> {
		return this.req('get', '/list')
	}
	
	listNodeTypes(): Promise<{node_types: NodeType[]}> {
		return this.req('get', '/list-node-types')
	}
	
	listZones(): Promise<{zones: string[], default_zone: string}> {
		return this.req('get', '/list-zones')
	}
	
	sparkVersions(): Promise<{versions: SparkVersion[]}> {
		return this.req('get', '/spark-versions')
	}
	
	events(param: EventsRequest): Promise<{
		events: ClusterEvent[],
		next_page: EventsRequest,
		total_count: number
	}> {
		return this.req('post', '/events', param)
	}
	
}
