const router = require('koa-router')()
const { queryPageTemplates } = require('../sql/template')

router.prefix('/template')

// 查询所有模块类型
router.get('/queryPageTemplates', async (ctx, next) => {
	ctx.body = await queryPageTemplates()
})

module.exports = router
