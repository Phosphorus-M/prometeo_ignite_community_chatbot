const bot = require("../bot");
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
const setListProvidersCommand = (bot) => {
    bot.onText(/\/listProviders/, async (msg, match) => {
        await RedisClient.connect();
        const chatId = msg.chat.id;
    
        try {
            const datosDeLosProveedores = await login.fetchProviders();
            console.log(datosDeLosProveedores)
            let response = `*Nuestros proveedores:*`;
            datosDeLosProveedores.data.providers.forEach(proveedor => {
                response += `\n\n${proveedor.name} - ${listaDePaises[proveedor.country] ?? proveedor.country}\n`
                response += `\n\nProvider Code: ${proveedor.code}`
            })
    
            bot.sendMessage(chatId, response, {parse_mode:"Markdown"});
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, 'Hubo un problema al obtener la lista de Proveedores, inténtelo más tarde.');
    
        } finally {
            await RedisClient.disconnect()
        }
    
    });
}


module.exports = setListProvidersCommand