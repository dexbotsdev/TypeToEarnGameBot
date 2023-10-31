import Context from '@/models/Context'
import { Menu } from "@grammyjs/menu";


export const StartScreenMenu = new Menu<Context>("StartScreenMenu")
  .text("🔆 Join Game", (ctx) => ctx.reply("Disabled For Security Reasons")).row()
  .text("🔰 LeaderBoard", (ctx) => ctx.reply("Disabled For Security Reasons")).row()

