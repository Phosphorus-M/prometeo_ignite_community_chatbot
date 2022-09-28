require('dotenv').config()
const bot = require('./src/bot')
const setListProvidersCommand = require('./src/commands/listProviders')
const setLoginCommand = require('./src/commands/login')
const setDetailProviderCommand = require('./src/commands/providerDetail')



setLoginCommand(bot)
setListProvidersCommand(bot)
setDetailProviderCommand(bot)
