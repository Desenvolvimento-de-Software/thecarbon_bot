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

import Action from "./Action.js";
import Carbon from "../library/carbon/Carbon.js";
import Context from "../library/telegram/context/Context.js";
import { MessageEntity } from "src/library/telegram/type/MessageEntity.js";
import fs from "fs";

export default class ProcessCode extends Action {

    /**
     * The constructor.
     *
     * @author Marcos Leandro <mleandrojr@yggdrasill.com.br>
     * @since  2023-09-20
     *
     * @param context
     * @param type
     */
    public constructor(context: Context) {
        super(context, "async");
    }

    /**
     * Run the action.
     *
     * @author Marcos Leandro <mleandrojr@yggdrasill.com.br>
     * @since  2023-09-20
     *
     * @returns
     */
    public async run(): Promise<void> {

        const entities = this.context.message.getEntities();
        if (!entities.length) {
            return;
        }

        for (const entity of entities) {
            if (["pre", "code"].includes(entity.type)) {
                this.parseEntity(entity, this.context.message.getText());
            }
        }
    }

    /**
     * Parses the entity.
     *
     * @author Marcos Leandro <mleandrojr@yggdrasill.com.br>
     * @since  2023-09-20
     *
     * @param entity
     * @param text
     */
    private async parseEntity(entity: MessageEntity, text: string): Promise<void> {

        const offset = entity.offset as number;
        const length = entity.length as number;
        const code = text.substring(offset, offset + length);

        const imagePath = await this.getImagePath(code);
        if (imagePath && imagePath.length) {
            await this.sendPhoto(imagePath);
        }
    }

    /**
     * Returns the generated image path.
     *
     * @author Marcos Leandro <mleandrojr@yggdrasill.com.br>
     * @since  2023-09-20
     *
     * @param code
     *
     * @return string
     */
    private async getImagePath(code: string): Promise<string|undefined> {

        const carbon = new Carbon(this.context, code);
        const imagePath = await carbon.getImagePath();

        if (imagePath) {
            return imagePath;
        }

        return undefined;
    }

    /**
     * Sends the photo to the chat.
     *
     * @author Marcos Leandro <mleandrojr@yggdrasill.com.br>
     * @since  2023-09-20
     *
     * @param imagePath
     */
    private async sendPhoto(imagePath: string): Promise<void> {

        const fileStream = fs.readFileSync(imagePath);
        const fileBlob = new Blob([fileStream], { type : "image/png" });
        const formData = new FormData();

        formData.append("photo", fileBlob, "carbon.png");
        formData.append("chat_id", this.context.chat.getId().toString());
        formData.append("reply_to_message_id", this.context.message.getId().toString());

        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto?chat_id=${this.context.chat.getId()}&reply_to_message_id=${this.context.message.getId()}`;

        const response = await fetch(url, {
            method : "POST",
            body : formData
        });

        const data = await response.json();

        if (data.ok) {
            fs.unlinkSync(imagePath);
        }
    }
}
