const { fetchProviderDetail } = require("../fetchService");

const setProviderDetailCommand = (bot) => {
    bot.onText(/\/providerDetail (\w.*)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const provider_code = match[1]

        if(!provider_code){
            bot.sendMessage(chatId, "El comando necesita tener al menos un código de proveedor valido:\n/providerDetail código_de_proveedor", {parse_mode:"HTML"});
            return;
        }

        try {
            const datosDelDetalle = await fetchProviderDetail(provider_code);
            let response = `<b>${datosDelDetalle.data.provider.bank.name}</b>` 
            response += `\nTipo de cuenta: ${datosDelDetalle.data.provider.account_type[0].label_es}`

            const logo = datosDelDetalle.data.provider.logo;

            bot.sendMessage(chatId, response, {parse_mode:"HTML"});
            bot.sendPhoto(chatId, logo);
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, 'Hubo un problema al obtener la lista de Proveedores, inténtelo más tarde.');
        }
    
    
    });
}



module.exports = setProviderDetailCommand