require('dotenv').config()
const bot = require('./src/bot')
const setHelpCommand = require('./src/commands/help')
const setHolderInformationCommand = require('./src/commands/holderInformation')
const setListOfCreditCardsCommand = require('./src/commands/listCreditCards')
const setListProvidersCommand = require('./src/commands/listProviders')
const setLoginCommand = require('./src/commands/login')
const setProviderDetailCommand = require('./src/commands/providerDetail')
const RedisClient = require('./src/database')


async function main(){
    await RedisClient.connect()

    setHelpCommand(bot)
    setLoginCommand(bot, RedisClient)
    setListProvidersCommand(bot, RedisClient)
    setProviderDetailCommand(bot)
    setHolderInformationCommand(bot, RedisClient)
    setListOfCreditCardsCommand(bot, RedisClient)
}
main()
