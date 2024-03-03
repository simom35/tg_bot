import { Telegraf, session } from "telegraf";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/comands.class";
import { StartCommand } from "./commands/start.command";
class Bot {
    bot: Telegraf<IBotContext>;
    comands: Command[] = [];
    
    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
        this.bot.use(session());
    };

    init() {
        this.comands = [new StartCommand(this.bot)]
        for( const command of this.comands){
            command.heandle();
        }
        this.bot.launch();
    }
}



const bot = new Bot(new ConfigService());
bot.init();


