const io = require('@actions/io')
const core = require('@actions/core')
const exec = require('@actions/exec')

const DEFAULT_REGISTRY = 'https://registry.npmjs.com/'
const REGISTRY = core.getInput('registry') || DEFAULT_REGISTRY
const PROJECT_DIR = core.getInput('directory')

const install = () => io
	.which('npm', true)
	.then(npm => {
		core.debug(`npm at "${npm}"`)

		if (PROJECT_DIR)
			process.chdir(`./${PROJECT_DIR}`)

		return exec.exec(npm, ['i', '--registry', REGISTRY])
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
