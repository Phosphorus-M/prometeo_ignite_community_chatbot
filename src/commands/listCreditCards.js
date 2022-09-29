const { fetchListOfCreditCards } = require("../fetchService");

const setListOfCreditCardsCommand = (bot, RedisClient) => {
    bot.onText(/\/listCreditCards/, async (msg, match) => {
        const chatId = msg.chat.id;

        let isConnected = await RedisClient.get(chatId+ "");
        if (!isConnected) {
            bot.sendMessage(chatId, 'Necesita estar conectado para pedir la lista de tarjetas de crédito 😔\nPor favor usar el comando /login {username} {password}');
            return;
        }
        isConnected = JSON.parse(isConnected);
        try {
            
            const datosDelTitular = await fetchListOfCreditCards(isConnected.key);
            let response = ""
            datosDelTitular.data.credit_cards.forEach(credit_card => {
                response = `Nombre: <b>${credit_card.name}</b>\n`
                response += `Numero: <b>${credit_card.number}</b>\n`
                response += `Fecha de emisión: <b>${credit_card.close_date}</b>\n`
                response += `Fecha de vencimiento: <b>${credit_card.due_date}</b>\n`
                response += `Balance local: <b>${credit_card.balance_local}</b>\n`
                response += `Balance en Dólares: <b>${credit_card.balance_dollar}</b>\n`
                response += `ID de Tarjeta: <b>${credit_card.id}</b>\n`
            })
            bot.sendMessage(chatId, response, {parse_mode:"HTML"});
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, 'Hubo un problema al obtener la lista de tarjetas de crédito, inténtelo más tarde.');
        }
    
    });
}



module.exports = setListOfCreditCardsCommand