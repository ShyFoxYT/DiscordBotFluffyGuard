# FluffyGuard Discord Bot
##### *Version 0.0.1*
May I present: The Discord bot FluffyGuard.

This bot is currently a single server bot, running it on multiple server isn't tested.

To add commands put them in a folder in the command folder like aboutme and welcome.
You need to add a bot Discord token in the .env file to run it.

Also feel free to ask me via discord or Telegram to add a command you want for your version of the bot.
If you use the bot, please add in the bots description `BotDev: ShyFox` to show some respect because I offer it for free.

## Functions:
### Commands:
You can see the commands in [this](./commands/commands.md) file.
Set commands will be found in the [Commands](./commands/setcommands.md)

# Known bugs:
- !verify is currently not working.
- !view is currently in build.
- The automatic welcome message with picture is bugged.
- Sometimes (when the bot were offline) you need to add `NEW_MEMBER_DISCORD_ID.json` (Replace `NEW_MEMBER_DISCORD_ID` with the user ID of the member who joined and add a {} to the file) into the `commands/server/profile`. !verify should fix it alternately I'll add a command for Admins to manually add it.


# To-Do:
- Finish `!verify`
- Finish `!view`
- Finish all `!set...` commands.
- Repair welcome message.
- Add `!newjoinfile @...`.
- Do a `!hug` command
- Do a `!kiss` command
- Add Moderation commands
