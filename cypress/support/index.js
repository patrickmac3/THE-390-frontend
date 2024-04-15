import './commands'

const registerCodeCoverageTasks = require('@cypress/instrument-cra')

module.exports = (on, config) => {
  registerCodeCoverageTasks(on, config)
}