# stage-entry

## server部署

```shell
docker run --name=stage-entry -d -p 8000:3000 -v ~/data/db:/app/packages/server/db stageentry
```
