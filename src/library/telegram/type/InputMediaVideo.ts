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

import { InputFile } from "./InputFile.js";
import { MessageEntity } from "./MessageEntity.js";

export type InputMediaVideo = {
    type: string;
    media: string;
    thumbnail?: InputFile|string;
    caption?: string;
    parseMode?: string;
    captionEntities?: MessageEntity[];
    width?: number;
    height?: number;
    duration?: number;
    supportsStreaming?: boolean;
    hasSpoiler?: boolean;
};
