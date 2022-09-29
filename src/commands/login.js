const { login } = require("../fetchService");


const setLoginCommand = (bot, RedisClient) => {
    bot.onText(/\/login/, async (msg, match) => {
        const chatId = msg.chat.id;
        if (msg.text.split(" ").length != 3){
            bot.sendMessage(chatId, "El comando necesita tener al menos un usuario y una contraseña:\n/login usuario contraseña", {parse_mode:"HTML"});
        }

    })


    bot.onText(/\/login (\w.*) (\w.*)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const isConnected = await RedisClient.get(chatId+ "");
        const user = match[1];
        const password = match[2];

        if (isConnected) {
            bot.sendMessage(chatId, 'Ya hay una sesión activa actualmente');
            return;
        }

        try {
            const datosDeLogin = await login(user, password)

            const saveResult = await RedisClient.set(
                chatId + "",
                JSON.stringify(datosDeLogin.data), {
                    EX: 60*5,
                }
              );
    
            bot.sendMessage(chatId, 'Inicio de sesión correcto');
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, 'Hubo un problema al conectarse, verifique que las credenciales sean correctas');
    
        }
    });
}


module.exports = setLoginCommand