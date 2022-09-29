const { fetchHolderInformation } = require("../fetchService");

const setHolderInformationCommand = (bot, RedisClient) => {
    bot.onText(/\/holderInformation/, async (msg, match) => {
        const chatId = msg.chat.id;

        let isConnected = await RedisClient.get(chatId+ "");
        if (!isConnected) {
            bot.sendMessage(chatId, 'Necesita estar conectado para pedir la información del titular 😔\nPor favor usar el comando /login {username} {password}');
            return;
        }
        isConnected = JSON.parse(isConnected);
        try {
            
            const datosDelTitular = await fetchHolderInformation(isConnected.key);

            let response = `Titular: <b>${datosDelTitular.data.info.name}</b>\n`
            response += `Documento: <b>${datosDelTitular.data.info.document}</b>\n` 
            response += `Email: <b>${datosDelTitular.data.info.email}</b>` 
            bot.sendMessage(chatId, response, {parse_mode:"HTML"});
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, 'Hubo un problema al obtener los datos del titular, inténtelo más tarde.');
        } 
    
    
    });
}



module.exports = setHolderInformationCommand