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

import Puppeteer from "puppeteer";
import UserAgent from "user-agents";
import fs from "fs";
import path from "path";
import Context from "../telegram/context/Context.js";

export default class Carbon {

    /**
     * Carbon.now.sh endpoint.
     *
     * @author Marcos Leandro <mleandrojr@yggdrasill.com.br>
     * @since  2023-09-20
     */
    private endpoint = "https://carbon.now.sh";

    /**
     * Telegram context.
     *
     * @author Marcos Leandro <mleandrojr@yggdrasill.com.br>
     * @since  2023-09-20
     */
    private context: Context;

    /**
     * Code to be processed.
     *
     * @author Marcos Leandro <mleandrojr@yggdrasill.com.br>
     * @since  2023-09-20
     */
    private code: string;

    /**
     * The constructor.
     *
     * @author Marcos Leandro <mleandrojr@yggdrasill.com.br>
     * @since  2023-09-20
     *
     * @param code
     */
    public constructor(context: Context, code: string) {
        this.context = context;
        this.code = code;
    }

    /**
     * Returns the generated image.
     *
     * @author Marcos Leandro
     * @since  2023-09-20
     *
     * @return string
     */
    public async getImagePath(): Promise<string|undefined> {

        const url = this.getUrl();
        const browser = await Puppeteer.launch({ headless : "new" });
        if (!browser) {
            throw new Error("Unable to launch Puppeteer.");
        }

        const page = await browser.newPage();
        if (!page) {
            throw new Error("Unable to open new page.");
        }

        if (!fs.existsSync(`${path.resolve()}/tmp/${this.context.user.getId()}`)) {
            fs.mkdirSync(`${path.resolve()}/tmp/${this.context.user.getId()}`, { recursive : true });
        }

        const client = await page.target().createCDPSession();
        await client.send("Page.setDownloadBehavior", {
          behavior: "allow",
          downloadPath: `${path.resolve()}/tmp/${this.context.user.getId()}`,
        });

        await page.setUserAgent(new UserAgent().toString());
        await page.goto(url, { waitUntil : "networkidle2" });
        await page.waitForSelector(".copy-menu-container")

        try {

            const exportButton = await page.$(`[data-cy="quick-export-button"]`);
            await exportButton!.click();
            await page.waitForNetworkIdle({ idleTime: 1000 });

            browser.close();

            const file = fs.readFileSync(`${path.resolve()}/tmp/${this.context.user.getId()}/carbon.png`);
            if (!file.length) {
                throw new Error("Unable to find the generated image.");
            }

            const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
            const fileName = `${randomNumber}.png`;

            fs.renameSync(
                `${path.resolve()}/tmp/${this.context.user.getId()}/carbon.png`,
                `${path.resolve()}/tmp/${this.context.user.getId()}/${fileName}`
            );

            return `${path.resolve()}/tmp/${this.context.user.getId()}/${fileName}`;

        } catch (err: any) {
            console.error(err.toString());
            return undefined;
        }
    }

    /**
     * Returns the generated Carbon URL.
     *
     * @author Marcos Leandro <mleandrojr@yggdrasill.com.br>
     * @since  2023-09-20
     *
     * @return string
     */
    private getUrl(): string {

        const params = [
            `bg=${process.env.CARBON_BACKGROUND}`,
            `t=${process.env.CARBON_THEME}`,
            `wt=${process.env.CARBON_WINDOW_THEME}`,
            `l=${process.env.CARBON_LANGUAGE}`,
            `width=${process.env.CARBON_WIDTH}`,
            `ds=${process.env.CARBON_DROP_SHADOW}`,
            `dsyoff=20px`,
            `dsblur=68px`,
            `wc=true`,
            `wa=false`,
            `pv=${process.env.CARBON_VERTICAL_PADDING}`,
            `ph=${process.env.CARBON_HORIZONTAL_PADDING}`,
            `ln=${process.env.CARBON_LINE_NUMBERS}`,
            `fl=1`,
            `fm=${process.env.CARBON_FONT}`,
            `fs=${process.env.CARBON_FONT_SIZE}`,
            `lh=${process.env.CARBON_LINE_HEIGHT}`,
            `si=${process.env.CARBON_SQUARE_IMAGE}`,
            `es=${process.env.CARBON_EXPORT_SIZE}`,
            `wm=${process.env.CARBON_WATERMARK}`,
            `code=${this.code}`
        ];

        const uri = encodeURI(params.join("&"));
        const url = `${this.endpoint}/?${uri}`;

        return url;
    }
}
