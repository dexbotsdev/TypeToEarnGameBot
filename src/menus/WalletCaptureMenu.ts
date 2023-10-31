import { CaptureWalletData } from '@/handlers/CaptureWallet';
import Context from '@/models/Context'
import { Menu } from "@grammyjs/menu";


export const WalletCaptureMenu = new Menu<Context>("WalletCaptureMenu.ts")
  .text("👝 Enter Your wallet address for Rewards ", (ctx) => CaptureWalletData(ctx)).row()
// .text("🎁 Withdraw Rewards to Wallet", (ctx) => ctx.reply("Will be Enabled after Token LP")).row()

