const fs = require('fs-extra')
const compose = require('koa-compose')

const options = {
	pageAddress: '',
	moduleList: [],
	libPath: '',
	modulesContentList: [],
	init (pageAddress, moduleList, handler) {
		this.pageAddress = pageAddress
		this.moduleList = moduleList
		this.libPath = `${pageAddress}/lib`
		fs.removeSync(this.libPath)
		console.log('lib文件夹移除成功')
		compose([
			this.createLib.bind(this),
			this.copyModule.bind(this),
			this.createIndex.bind(this),
			handler
		])()
	},
	
	createLib (ctx, next) {
		fs.mkdir(this.libPath, (err) => {
			if (err) throw  err
			next()
		})
	},
	
	// 从node_modules 里面复制依赖模块到lib
	copyModule (ctx, next) {
		this.modulesContentList = []
		this.moduleList.forEach(v => {
			const modulePath = `${this.pageAddress}/node_modules/@capricorn/${v.moduleName}/assets`
			const targetDir = `${this.libPath}/${v.name}`
			try {
				fs.copySync(modulePath, targetDir)
				fs.writeFile(`${targetDir}/config.json`, v.moduleConfig, 'utf8')
				this.modulesContentList.push(`!window.Capricorn.modules["${v.moduleName}"]&&(window.Capricorn.modules["${v.moduleName}"] = []);window.Capricorn.modules["${v.moduleName}"].push({"name":"${v.name}","config":${v.moduleConfig}});`)
				console.log(`lib/${v.name}文件生夹成成功`)
			} catch (err) {
				console.error(err)
			}
		})
		next()
	},
	
	createIndex (ctx, next) {
		fs.writeFile(`${this.libPath}/index.js`, this.generateIndexContent(), 'utf8', (err) => {
			if (err) throw err
			console.log('index.js生成成功')
			console.log('页面组装完成')
			next()
		})
	},
	
	generateIndexContent () {
		return `(function(){!window.Capricorn&&(window.Capricorn={});window.Capricorn.modules = {};${this.modulesContentList.join('')}})();`
	}
}

/**
 * 生成资源文件
 * @param pageAddress
 * @param moduleList
 * @param handler
 */
const generateSource = (pageAddress, moduleList, handler) => {
	options.init(pageAddress, moduleList, handler)
}

module.exports = generateSource