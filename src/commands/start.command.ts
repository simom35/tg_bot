import { Markup, Telegraf } from "telegraf";
import { Command } from "./comands.class";
import { IBotContext } from "../context/context.interface";

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }
    heandle(): void {
        this.bot.start((ctx) => {
            console.log(ctx.session);
            ctx.reply("Пил Вчера?", Markup.inlineKeyboard([
                Markup.button.callback("Дa", "yes_i_drank"),
                Markup.button.callback("нет", "No_i_do_not_drank"),
            ]))
        })
        this.bot.action("yes_i_drank", (ctx) => {
            ctx.editMessageText("Как не стыдно")
        })
        this.bot.action("No_i_do_not_drank", (ctx) => {
            ctx.editMessageText("Молодец")
        })
    }
}