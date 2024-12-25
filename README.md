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
// 插件地址
window.STAGE_ENTRY_PLUGIN = 'http://localhost:3000/plugin/'
// 网关地址
window.STAGE_ENTRY_URL = 'http://localhost:3000/distribute'
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

/* 可选配置项
window.__STAGE_ENTRY__ = {
  duration: 1000,
}
*/
loadRemote('app/init')
```

### 配置项

| 名称 | 类型 | 默认值 | 说明 |
| :-- | :-- | :------ | :--- |
| duration | number | 3000 | 单位：ms，标签提示显示的时间 |
