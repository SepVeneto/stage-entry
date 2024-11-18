# stage-entry

## server部署

```shell
docker run --name=stage-entry -d -p 8000:3000 -v ~/data/db:/app/packages/server/db stageentry
```

## plugin使用

1. 安装
```shell
pnpm i @module-federation/enhanced
```

2. 配置
```js
window.STAGE_ENTRY_PLUGIN = 'http://localhost:3000/plugin/'
init({
  name: 'app1',
  remotes: [
    {
      name: 'app1',
      entry: 'http://localhost:3000/plugin/mf-manifest.json',
      alias: 'app',
    }
  ]
})

loadRemote('app/init')
```
