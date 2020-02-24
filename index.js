const core = require('@actions/core')
const io = require('@actions/io')
const exec = require('@actions/exec')

const PROJECT_DIR = core.getInput('directory')
const IS_GLOBAL_INSTALL = core.getInput('globalInstall')

const install = () => io
	.which('npm', true)
	.then(npm => {
		core.debug(`npm at "${npm}"`)

		if(PROJECT_DIR)
			process.chdir(`./${PROJECT_DIR}`)

		let install = IS_GLOBAL_INSTALL ? 'i -g' : 'i'
		return exec.exec(npm, install)
	})

const test = () => io
	.which('npm', true)
	.then(npm => exec.exec(npm, 'test'))

install()
.then(test)
.catch(error => {
	console.error(error)
	core.setFailed(error.message)
	process.exit(1)
})
