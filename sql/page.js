const { creatConnect, handler } = require('../core/sql')
const uid = require('uid')
const code = require('../data/code')

creatConnect()

/**
 * 根据pageName查页面信息
 * @param body
 * @returns {Promise}
 */
const queryPage = (body) => {
	const { pageName } = body
	const sql = `SELECT * FROM CAP_Page_Build WHERE pageName='${pageName}'`
	return handler(sql).then((list) => {
		return {
			data: list[0],
			code: code.SUCCESS
		}
	}).catch(e => {
		console.log(e)
	})
}

/**
 * 查询所有页面列表
 * @returns {Promise}
 */
const queryAllPages = () => {
	const sql = `SELECT * FROM CAP_Page_Build`
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
 * 根据pageName查询所有绑定的模块
 * @param body
 * @returns {Promise}
 */
const queryModuleByPageName = (body) => {
	const { pageName } = body
	const sql = `SELECT * FROM CAP_Page_Modules_Build WHERE pageName='${pageName}'`
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
 * 根据id查询页面绑定的模块
 * @param body
 * @returns {Promise}
 */
const queryModuleById = (body) => {
	const { idList } = body
	const condition = idList.join(', ')
	const sql = `SELECT * FROM CAP_Page_Modules_Build WHERE id in (${condition})`
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
 * 绑定页面模块
 * @param body
 * @returns {Promise}
 */
const addModule = (body) => {
	const { pageName, moduleName, moduleConfig } = body
	const sql = `INSERT INTO CAP_Page_Modules_Build (pageName, moduleName, moduleConfig) VALUES ('${pageName}', '${moduleName}', '${moduleConfig}')`
	return handler(sql).then(() => {
		return {
			code: code.SUCCESS,
			message: '操作成功'
		}
	}).catch(e => {
		console.log(e)
	})
}

/**
 * 创建一个页面
 * @param body
 * @returns {Promise}
 */
const createPage = (body) => {
	const { title, description, templateId } = body
	const pageName = `${uid()}`
	const sql = `INSERT INTO CAP_Page_Build (pageName, pageTitle, pageDescription, templateId) VALUES ('${pageName}', '${title}', '${description}', ${templateId})`
	return handler(sql).then(() => {
		return {
			code: code.SUCCESS,
			data: {
				pageName
			},
			message: '操作成功'
		}
	}).catch(e => {
		console.log(e)
	})
}

module.exports = {
	queryPage,
	queryAllPages,
	queryModuleByPageName,
	queryModuleById,
	createPage,
	addModule
}