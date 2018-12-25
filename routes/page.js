const router = require('koa-router')()
const { createPage, queryPage, queryAllPages, addModule, queryModuleByPageName } = require('../sql/page')
const generateView = require('../server/generateView')
const code = require('../data/code')

router.prefix('/page')

// 创建页面
router.post('/createPage', async (ctx, next) => {
	ctx.body = await createPage(ctx.request.body || {})
})

// 查询所有页面列表
router.get('/queryAllPages', async (ctx, next) => {
	ctx.body = await queryAllPages(ctx.query || {})
})

// 查询页面信息
router.get('/queryPage', async (ctx, next) => {
	ctx.body = await queryPage(ctx.query || {})
})

// 查询页面绑定的所有模块
router.get('/queryModuleByPageName', async (ctx, next) => {
	ctx.body = await queryModuleByPageName(ctx.query || {})
})

// 绑定页面模块
router.post('/addModule', async (ctx, next) => {
	ctx.body = await addModule(ctx.request.body || {})
})

// 生成页面
router.post('/generateView', async (ctx, next) => {
	generateView(ctx.request.body || {})
	ctx.body = {
		msg: '页面创建任务发送成功，可通过日志查看创建进度！',
		code: code.SUCCESS
	}
})

module.exports = router
