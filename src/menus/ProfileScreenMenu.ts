import { captureStarHandle } from "@/handlers/CaptureStarTag";
import { CustomAlerts } from "@/handlers/CustomAlerts";
import Context from '@/models/Context'
import { Menu } from "@grammyjs/menu";
import { CustomAlertsMenu } from "./CustomAlertsMenu";
import { PortfolioDisplay } from "@/handlers/PortfolioDisplay";
import { ResetWallet } from "@/handlers/ResetWallet";
import { SettingsScreen } from "@/handlers/SettingsScreen";


export const ProfileScreenMenu = new Menu<Context>("ProfileScreenMenu")
  .text("🌟 Star Key", (ctx) => captureStarHandle(ctx))
  .text("🤴 Custom Alerts", (ctx) => captureStarHandle(ctx)).row()
  .text("👔 My Folio", (ctx) => PortfolioDisplay(ctx))
  .text("🪙 Premium Access", (ctx) => ctx.reply("Disabled For Security Reasons")).row()
  .text("💱 Reset Wallet", (ctx) => ResetWallet(ctx))
  .text("⚙ Settings", (ctx) => SettingsScreen(ctx)).row()
  .submenu("🔉 Profile Alerts", "CustomAlertsMenu")


ProfileScreenMenu.register(CustomAlertsMenu);
