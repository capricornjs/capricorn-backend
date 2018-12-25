const download = require('download-git-repo')
const compose = require('koa-compose')
const path = require('path')
const fs = require('fs-extra')
const { queryModuleById, queryPage } = require('../../sql/page')
const { queryPageTemplateById } = require('../../sql/template')
const updatePackage = require('./updatePackage')
const updateHtml = require('./updateHtml')
const installPackage = require('./installPackage')
const generateSource = require('./generateSource')

const options = {
	init (body) {
		this.resetBaseInfo()
		Promise.all([
			queryModuleById(body),
			queryPage(body)
		]).then(([{ list = [] }, { data }]) => {
			this.moduleList = list
			this.initModuleList()
			this.pageInfo = data
			this.pageAddress = `/Users/fangke/Desktop/capricorn/www/${data.pageName}`
			return this.getTemplate()
		}).then(() => {
			compose([
				this.downloadHtml.bind(this),
				this.updatePackage.bind(this),
				this.updateHtml.bind(this),
				this.installPackage.bind(this),
				this.generateSource.bind(this)
			])()
		})
	},
	
	initModuleList () {
		const listStore = []
		this.moduleList.forEach((v, i) => {
			v.name = `${v.moduleName}_${i}`
			if (listStore.indexOf(v.moduleName) === -1) {
				listStore.push(v.moduleName)
				this.packageList.push(v)
			}
		})
	},
	
	resetBaseInfo () {
		this.pageInfo = {}
		this.moduleList = []
		this.packageList = [] // 区别与moduleList, 只是用于安装
		this.templateInfo = {}
		this.pageAddress = ''
	},
	
	// 获取模版信息
	getTemplate () {
		return queryPageTemplateById(this.pageInfo).then(({ data }) => {
			this.templateInfo = data
		})
	},
	
	// 下载页面模版
	downloadHtml (ctx, next) {
		fs.removeSync(this.pageAddress)
		console.log('页面已被删除')
		const { templateAddress, templateBranch } = this.templateInfo
		console.log('开始下载html模版')
		download(`${templateAddress}#${templateBranch}`, this.pageAddress, (err) => {
			if (err) throw err
			console.log('html模版下载成功')
			next()
		})
	},
	
	// 更新package.json的依赖
	updatePackage (ctx, next) {
		updatePackage(this.pageAddress, this.pageInfo, this.packageList, next)
	},
	
	// 更新index.html
	updateHtml (ctx, next) {
		updateHtml(this.pageAddress, this.pageInfo, this.moduleList, next)
	},
	
	// 安装依赖
	installPackage (ctx, next) {
		installPackage(this.pageAddress, this.pageInfo, this.packageList, next)
	},
	
	// 生成资源文件
	generateSource (ctx, next) {
		generateSource(this.pageAddress, this.moduleList, next)
	}
}

/**
 * 生成页面
 * @param body
 */
const generateView = (body) => {
	options.init(body)
}

module.exports = generateView