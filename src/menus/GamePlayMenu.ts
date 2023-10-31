import Context from '@/models/Context'
import { Menu } from "@grammyjs/menu";
import { BackMainMenu } from "./BackMainMenu";
import { captureTypeData } from '@/handlers/CaptureTypeData';


export const GamePlayMenu = new Menu<Context>("SettingsMenu")
  .text("⌨️ Start Typing ", (ctx) => captureTypeData(ctx))
  .append(BackMainMenu);


