const { creatConnect, handler } = require('../core/sql')
const code = require('../data/code')

creatConnect()

/**
 * 查询所有页面模版
 * @returns {Promise.<T>}
 */
const queryPageTemplates = () => {
	let sql = `SELECT * FROM CAP_Page_Templates`
	return handler(sql).then((list) => {
		return {
			list,
			code: code.SUCCESS
		}
	}).catch(e => {
		console.log(e)
	})
}

/**
 * 根据id查询页面模版
 * @param body
 * @returns {Promise}
 */
const queryPageTemplateById = (body) => {
	const { templateId } = body
	let sql = `SELECT * FROM CAP_Page_Templates WHERE id = '${templateId}'`
	return handler(sql).then(([data = {}]) => {
		return {
			data,
			code: code.SUCCESS
		}
	}).catch(e => {
		console.log(e)
	})
}

module.exports = {
	queryPageTemplates,
	queryPageTemplateById
}