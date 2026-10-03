import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const commands = [
  new SlashCommandBuilder()
    .setName('postrules')
    .setDescription('📜 Post the server rules in this channel')
    .setDefaultMemberPermissions('0')
    .toJSON(),

  new SlashCommandBuilder()
    .setName('announcement')
    .setDescription('📣 Send an announcement to the server — tags all roles')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('The announcement message to send')
        .setRequired(true)
        .setMaxLength(2000)
    )
    .setDefaultMemberPermissions('0')
    .toJSON(),

  new SlashCommandBuilder()
    .setName('postnap')
    .setDescription('🚨 Post the NAP Rules in this channel')
    .setDefaultMemberPermissions('0')
    .toJSON(),
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔄  Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('✅  Successfully registered /postrules for guild', process.env.GUILD_ID);
  } catch (error) {
    console.error('❌  Failed to register commands:', error);
  }
})();
