/**
 * The Carbon Telegram Bot
 *
 * This file is part of The Carbon Telegram Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  thecarbon_bot
 * @author   Marcos Leandro <mleandrojr@yggdrasill.com.br>
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import TelegramBotApi from "../TelegramBotApi.js";

export default class GetChatAdministrators extends TelegramBotApi {

    /**
     * Method payload.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
     protected payload: Record<string, any> = {};

     /**
      * The constructor.
      *
      * @author Marcos Leandro
      * @since  1.0.0
      */
     public constructor() {
         super("getChatAdministrators");
     }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} chatId
     *
     * @return {SendMessage}
     */
    public setChatId(chatId: number): GetChatAdministrators {
        this.payload.chat_id = chatId;
        return this;
    }
}
