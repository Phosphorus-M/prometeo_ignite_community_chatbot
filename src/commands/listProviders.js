const login = require("../fetchService");

const listaDePaises = {
    "AR": "π¦π·",
    "BR": "π§π·",
    "CL": "π¨π±",
    "CO": "π¨π΄",
    "EC": "πͺπ¨",
    "MX": "π²π½",
    "PA": "π΅π¦",
    "PE": "π΅πͺ",
    "UY": "πΊπΎ",
}
const setListProvidersCommand = (bot) => {
    bot.onText(/\/listProviders/, async (msg, match) => {
        const chatId = msg.chat.id;
    
        try {
            const datosDeLosProveedores = await login.fetchProviders();
            let response = `<b>Nuestros proveedores:</b>`;
            datosDeLosProveedores.data.providers.forEach(proveedor => {
                response += `\n\n${proveedor.name} - ${listaDePaises[proveedor.country] ?? proveedor.country}\n`
                response += `Provider Code: ${proveedor.code}\n`
            })
    
            bot.sendMessage(chatId, response, {parse_mode:"HTML"});
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, 'Hubo un problema al obtener la lista de Proveedores, intΓ©ntelo mΓ‘s tarde.');
    
        } 
    });
}


module.exports = setListProvidersCommand