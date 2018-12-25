const { spawn } = require('child_process')

/**
 * 安装依赖
 * @param pageAddress
 * @param pageInfo
 * @param packageList
 * @param handler
 */
const installPackage = (pageAddress, pageInfo, packageList, handler) => {
	let modules = []
	packageList.forEach(v => {
		modules.push(`@capricorn/${v.moduleName}`)
	})
	const ls = spawn('npm', ['install', '--save', ...modules], {
		cwd: pageAddress
	})
	ls.stdout.on('data', (data) => {
		console.log(`stdout:\n${data}`)
	})
	ls.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`)
	})
	ls.on('close', (code) => {
		console.log(`子进程退出码：${code}`)
		console.log('安装成功!')
		handler()
	})
}

module.exports = installPackage