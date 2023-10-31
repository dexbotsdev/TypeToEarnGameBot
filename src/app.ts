import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { run } from '@grammyjs/runner'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import startMongo from '@/helpers/startMongo'
import startBot from './handlers/start'
import { StartScreenMenu } from './menus/StartScreenMenus'
import { DeleteMessageMenu } from './menus/DeleteMessageMenu'
import { WelcomeUser } from './handlers/WelcomeUser'
import { BackMainMenu } from './menus/BackMainMenu'
import { MessageHandler } from './handlers/MessageHandler'
import { NewGameCreationHandler } from './handlers/NewGameCreationHandler'
import { ScoreboardHandler } from './handlers/ScoreboardHandler'
import { GamePlayMenu } from './menus/GamePlayMenu'
import { CaptureTagQuestion } from './handlers/CaptureTypeData'
import { WalletCaptureMenu } from './menus/WalletCaptureMenu'
import { CaptureWallet } from './handlers/CaptureWallet'
import { ArchiveLeaderboard } from './handlers/ArchiveLeaderboard'
import { LeaderboardHandler } from './handlers/LeaderboardHandler'
import { TopScoresHandler } from './handlers/TopScoresHandler'
import { Bot, Api, RawApi } from 'grammy'
import UserContext from './models/Context'
import { sendScoresEvery30Minutes } from './jobs/TopScoresJob'
import { ResetGameHandler } from './handlers/ResetGame'
import { GameInfoHandler } from './handlers/GameInfo'

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('Mongo connected')
  bot
    .use(attachUser)
    .use(BackMainMenu)
    .use(DeleteMessageMenu)
    .use(StartScreenMenu)
    .use(GamePlayMenu)
    .use(WalletCaptureMenu)
    .use(CaptureTagQuestion.middleware())
    .use(CaptureWallet.middleware())


  bot.command('start', startBot)
  bot.command('menu', WelcomeUser)
  bot.command('newgame', NewGameCreationHandler);
  bot.command('scores', ScoreboardHandler);
  bot.command('archive', ArchiveLeaderboard);
  bot.command('leaderboard', LeaderboardHandler);
  bot.command('topscores', TopScoresHandler);
  bot.command('resetgame', ResetGameHandler)
  bot.command('gameInfo', GameInfoHandler)
  bot.on('message', MessageHandler)
  // Errors
  bot.catch(console.error)

  setInterval(() => {

    sendScoresEvery30Minutes(bot);

  }, 30 * 60 * 1000)

  // Start bot
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()

