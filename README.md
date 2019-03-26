# databricks-api
Simple client for databricks rest api for nodejs

## Usage

```bash
npm install databricks-api
```

```js
const DataBricks = require('databricks-api')

const client = new DataBricks({domain: your.domain.databricks.com, token: <access_token>})

const {
	Clusters,
	DBFS,
	Groups,
	InstanceProfiles,
	Jobs,
	Runs,
	Libraries,
	SCIM,
	Secrets,
	Workspace,
	Mlflow
} = client

const {
	Experiments,
	Runs: MlRuns,
	Params,
	Metrics,
	Artifacts
} = Mlflow

;(async () => {
	
	const jobList = await Jobs.list()
	const {job_id} = jobList.jobs[0]
	const res = await Jobs.runNow({job_id})
	const {run_id} = res
	const output = Runs.getOutput({run_id})
	
	console.log(output)
	
})()

```

All interfaces provided on DataBricks API v2.0 are implemented.  

[https://docs.databricks.com/api/index.html](https://docs.databricks.com/api/index.html)
