const RedisClient = require("../database");
const login = require("../fetchService");

const listaDePaises = {
    "AR": "🇦🇷",
    "BR": "🇧🇷",
    "CL": "🇨🇱",
    "CO": "🇨🇴",
    "EC": "🇪🇨",
    "MX": "🇲🇽",
    "PA": "🇵🇦",
    "PE": "🇵🇪",
    "UY": "🇺🇾",
}

const setDetailProviderCommand = (bot) => {
    bot.onText(/\/detailProvider (\w.*)/, async (msg, match) => {
        await RedisClient.connect();
        const chatId = msg.chat.id;
        const provider_code = match[1]
        console.log(chatId, provider_code);
    
        try {
            const datosDelDetalle = await login.fetchDetailProvider(provider_code);
            console.log(datosDelDetalle.data)
            let response = `${datosDelDetalle.data.provider.bank.name}` 
            response += `\nTipo de cuenta: ${datosDelDetalle.data.provider.account_type[0].label_es}`
            // response += `\n\n${datosDelDetalle.data.provider.logo}` 
            const logo = datosDelDetalle.data.provider.logo;
            console.log(response)
            bot.sendMessage(chatId, response, {parse_mode:"Markdown"});
            bot.sendPhoto(chatId, logo);
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, 'Hubo un problema al obtener la lista de Proveedores, inténtelo más tarde.');
        } finally {
            await RedisClient.disconnect()
        }
    
    
    });
}



module.exports = setDetailProviderCommand