const setHelpCommand = (bot) => {
    bot.onText(/(.+)/, (msg) => {
        const isDifferentOfHolderInformation = msg.text != "/holderInformation";
        const isDifferentOfListCreditCards = msg.text != "/listCreditCards";
        const isDifferentOfListProviders = msg.text != "/listProviders";
        const isDifferentOfLogin = !msg.text.startsWith("/login");
        const isDifferentOfProviderDetail = !msg.text.startsWith("/providerDetail");

        if(isDifferentOfHolderInformation && isDifferentOfListCreditCards && isDifferentOfLogin && isDifferentOfProviderDetail && isDifferentOfListProviders){
            const chatId = msg.chat.id;
            sendHelp(bot,chatId)
        }
    })

    bot.onText(/\/help/, async (msg, match) => {
        const chatId = msg.chat.id;

        sendHelp(bot,chatId)
    });
}

function sendHelp(bot,chatId) {
    let response = "";
    response += `La lista de comandos permitidos es:\n`
    response += `/login usuario contraseña - Comando para iniciar sesión (El usuario debe ser reemplazado por su usuario y la contraseña por su contraseña) \n`
    response += `/listProviders - Devuelve la lista de proveedores \n`
    response += `/providerDetail código_de_proveedor - Muestra un poco más de información acerca del proveedor (Debe remplazar código_de_proveedor por el código correspondiente) \n`
    response += `/listCreditCards - Devuelve la lista de tarjetas de crédito (Necesita estar conectado previamente a usarse) \n`
    response += `/holderInformation - Devuelve la información del titular \n`
    response += `\n\n`
    response += `Integrantes del grupo:\n`
    response += `Mateo Almanza\n`
    response += `Fernando Pastorelli\n`

    bot.sendMessage(chatId, response, { parse_mode: "HTML" });
}



module.exports = setHelpCommand