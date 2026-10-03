# Server Management & NAP Discord Bot

This is a custom Discord bot built to help manage our server, specifically designed for posting rules, enforcing NAP (Non-Aggression Pact) guidelines, and sending out high-priority staff announcements. 

*Note: This project was built by extending the [Discord example app template](https://github.com/discord/discord-example-app) originally provided by Shay DeWael.*

## Features

- **📜 Post Server Rules**: Quickly post a beautifully formatted embed of the core server rules.
- **🚨 Post NAP Rules**: Post the Non-Aggression Pact rules for the Kingdom/Alliance.
- **📣 Staff Announcements**: Send out important announcements that automatically ping leadership roles (`R5`, `R4`, `R3`, `R2`, `R1/CHAOS CREW`) and notify the general chat channel.

## Tech Stack & Framework

- **[Node.js](https://nodejs.org/)**: The runtime environment.
- **[Discord.js](https://discord.js.org/)**: The core framework used to interact with the Discord API. It handles connecting to the Discord Gateway, listening to interaction events, and creating rich embeds.
- **[Dotenv](https://www.npmjs.com/package/dotenv)**: Manages secure environment variables for API tokens and IDs.

## Project Structure

```text
├── .env                  -> (Create this yourself) Stores your sensitive keys and IDs
├── bot.js                -> Main entry point containing bot logic, event listeners, and embed definitions
├── deploy-commands.js    -> Utility script to register slash commands to the Discord REST API
├── package.json          -> Lists dependencies and defines run scripts (start, dev, deploy)
└── README.md             -> Project documentation
```

## Available Commands

- `/postrules` - Posts the main server rules. *(Requires `Manage Messages` permission)*
- `/postnap` - Posts the NAP rules. *(Requires `Manage Messages` permission)*
- `/announcement <message>` - Sends an official announcement, pings leadership roles, and forwards a notification to the general chat. *(Requires `Manage Server` permission)*

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/en/download/) (v18 or higher)
- A Discord App/Bot created via the [Discord Developer Portal](https://discord.com/developers/applications).
- Make sure the bot has the `Message Content`, `Server Members`, and `Presence` intents enabled if required, along with permissions to send messages, manage messages, and mention roles.

### 2. Setup Configuration
Create a `.env` file in the root directory and add the following variables:

```env
DISCORD_TOKEN=your_bot_token_here
APP_ID=your_application_id_here
GUILD_ID=your_server_id_here
GENERAL_CHANNEL_ID=your_general_chat_channel_id_here
```

### 3. Installation
Install all required dependencies:
```bash
npm install
```

### 4. Deploy Slash Commands
Before using the commands, you need to register them to your server:
```bash
npm run deploy
```

### 5. Run the Bot
Start the bot normally:
```bash
npm start
```
*For local development, you can use `npm run dev` to automatically restart the bot when files change.*
