const router = require('koa-router')()
const { moduleList, addModule } = require('../sql/module')

router.prefix('/module')

// 获取所有模块列表
router.get('/list', async (ctx, next) => {
	ctx.body = await moduleList(ctx.query || {})
})

// 新建模块
router.post('/add', async (ctx, next) => {
	ctx.body = await addModule(ctx.request.body || {})
})

module.exports = router
