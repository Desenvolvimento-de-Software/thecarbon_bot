/**
 * Ada Lovelace Telegram Bot
 *
 * This file is part of Ada Lovelace Telegram Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  mslovelace_bot
 * @author   Marcos Leandro <mleandrojr@yggdrasill.com.br>
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import TelegramBotApi from "../TelegramBotApi.js";
import { InlineKeyboardMarkup } from "../type/InlineKeyboardMarkup.js";

export default class SendPhoto extends TelegramBotApi {

    /**
     * Method payload.
     *
     * @author Marcos Leandro
     * @since  2023-06-20
     */
    protected payload: Record<string, any> = {};

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  2023-06-20
     */
    public constructor() {
        super("sendPhoto");
    }

    /**
     * Sets the message options.
     *
     * @author Marcos Leandro
     * @since  2023-06-06
     *
     * @param options
     *
     * @returns {SendPhoto}
     */
    public setOptions(options: Record<string, any>): SendPhoto {

        for (const key in options) {
            this.payload[key] = options[key];
        }

        return this;
    }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  2023-06-20
     *
     * @param  {number} messageThreadId
     *
     * @return {SendPhoto}
     */
    public setMessageThreadId(messageThreadId: number): SendPhoto {
        this.payload.message_thread_id = messageThreadId;
        return this;
    }

    /**
     * Sets the message content.
     *
     * @author Marcos Leandro
     * @since  2023-06-20
     *
     * @param  {String} text
     *
     * @return {SendPhoto}
     */
    public setPhoto(photo: string): SendPhoto {
        this.payload.photo = photo;
        return this;
    }

    /**
     * Sets the message content.
     *
     * @author Marcos Leandro
     * @since  2023-06-20
     *
     * @param  {String} caption
     *
     * @return {SendPhoto}
     */
    public setCaption(caption: string): SendPhoto {
        this.payload.caption = caption;
        return this;
    }

    /**
     * Sets the parse mode.
     *
     * @author Marcos Leandro
     * @since  2023-06-20
     *
     * @param  {String} parseMode
     *
     * @return {SendPhoto}
     */
    public setParseMode(parseMode: string): SendPhoto {
        this.payload.parseMode = parseMode;
        return this;
    }

    /**
     * Sets the entitites.
     *
     * @author Marcos Leandro
     * @since  2023-06-20
     *
     * @param  {Array} entities
     *
     * @return {SendPhoto}
     */
    public setEntities(entities: Array<Object>): SendPhoto {
        this.payload.entities = entities;
        return this;
    }

    /**
     * Sets the disable web page preview.
     *
     * @author Marcos Leandro
     * @since  2023-06-20
     *
     * @param  {Boolean} disableWebPagePreview
     *
     * @return {SendPhoto}
     */
    public setDisableWebPagePreview(disableWebPagePreview: boolean): SendPhoto {
        this.payload.disableWebPagePreview = disableWebPagePreview;
        return this;
    }

    /**
     * Sets the disable notification.
     *
     * @author Marcos Leandro
     * @since  2023-06-20
     *
     * @param  {Boolean} disableNotification
     *
     * @return {SendPhoto}
     */
    public setDisableNotification(disableNotification: boolean): SendPhoto {
        this.payload.disableNotification = disableNotification;
        return this;
    }

    /**
     * Sets the reply to message id.
     *
     * @author Marcos Leandro
     * @since  2023-06-20
     *
     * @param  {number} replyToMessageId
     *
     * @return {SendPhoto}
     */
    public setReplyToMessageId(replyToMessageId: number): SendPhoto {
        this.payload.replyToMessageId = replyToMessageId;
        return this;
    }

    /**
     * Sets the reply markup.
     *
     * @author Marcos Leandro
     * @since  2023-06-20
     *
     * @param  {InlineKeyboardMarkup} replyMarkup
     *
     * @return {SendPhoto}
     */
    public setReplyMarkup(replyMarkup: InlineKeyboardMarkup): SendPhoto {
        this.payload.replyMarkup = replyMarkup;
        return this;
    }
}
