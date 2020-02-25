const core = require('@actions/core')
const io = require('@actions/io')
const exec = require('@actions/exec')

const DEFAULT_REGISTRY = 'https://registry.npmjs.com/'
const PROJECT_DIR = core.getInput('directory')
const REGISTRY = core.getInput('registry') || DEFAULT_REGISTRY

const setRegistry = () => io
	.which('npm', true)
	.then(npm => exec.exec(npm, ['--registry', REGISTRY]))

const install = () => io
	.which('npm', true)
	.then(npm => {
		core.debug(`npm at "${npm}"`)

		if(PROJECT_DIR)
			process.chdir(`./${PROJECT_DIR}`)

		return exec.exec(npm, 'i')
	})

const test = () => io
	.which('npm', true)
	.then(npm => exec.exec(npm, 'test'))


setRegistry()
.then(install)
.then(test)
.catch(error => {
	console.error(error)
	core.setFailed(error.message)
	process.exit(1)
})
