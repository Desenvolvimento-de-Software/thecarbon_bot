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

import { User } from "./User.js";

export type ChatMemberAdministrator = {
    status: "administrator";
    user: User;
    canBeEdited?: boolean;
    isAnonymous?: boolean;
    canManageChat?: boolean;
    canDeleteMessages?: boolean;
    canMessageVideoChats?: boolean;
    canRestrictMembers?: boolean;
    canPromoteMembers?: boolean;
    canChangeInfo?: boolean;
    canInviteUsers?: boolean;
    canPostMessages?: boolean;
    canEditMessages?: boolean;
    canPinMessages?: boolean;
    customTitle?: string;
};
