# databricks-api
Simple databricks rest api client for node.js

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
	
	const {jobs} = await Jobs.list()
	const {job_id} = jobs[0]
	const {run_id} = await Jobs.runNow({job_id})
	const output = await Runs.getOutput({run_id})
	console.log(output)
	
})()

```

All interfaces provided on DataBricks API v2.0 are implemented.  

[https://docs.databricks.com/api/index.html](https://docs.databricks.com/api/index.html)
