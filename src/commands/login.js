const bot = require("../bot");
const RedisClient = require("../database");
const { login } = require("../fetchService");


const setLoginCommand = (bot) => {
    bot.onText(/\/login (\w.*) (\w.*)/, async (msg, match) => {
        await RedisClient.connect();
        const chatId = msg.chat.id;
        const isConnected = await RedisClient.get(chatId+ "");
        
        if (isConnected) {
            console.log(isConnected)
            bot.sendMessage(chatId, 'Joya 💎😂');
            return;
        }
    
        const user = match[1];
        const password = match[2];
        try {
            const datosDeLogin = await login(user, password)
    
            const saveResult = await RedisClient.set(
                chatId + "",
                JSON.stringify(datosDeLogin.data), {
                    EX: 60 * 60
                }
              );
    
            bot.sendMessage(chatId, 'Joya 💎😂');
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, 'Hubo un problema al conectarse, verifique que las credenciales sean correctas');
    
        } finally {
            await RedisClient.disconnect()
        }
    
    });
}


module.exports = setLoginCommand