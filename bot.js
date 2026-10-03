import 'dotenv/config';
import { Client, GatewayIntentBits, EmbedBuilder, PermissionFlagsBits, MessageFlags } from 'discord.js';

// ─── Discord Client ───────────────────────────────────────────────────────────
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, // needed to watch for new messages
  ],
});

// ─── Server Rules Content ─────────────────────────────────────────────────────
const RULES = [
  {
    number: '1',
    emoji: '🤝',
    title: 'Be Respectful',
    description:
      'Treat every member with kindness and respect. Harassment, bullying, hate speech, discrimination based on race, gender, sexuality, religion, or nationality **will not be tolerated**.',
  },
  {
    number: '2',
    emoji: '🚫',
    title: 'No Spam or Self-Promotion',
    description:
      'Do not flood channels with repeated messages, emojis, or links. Unsolicited advertising, server invites, or self-promotion outside designated channels is **strictly prohibited**.',
  },
  {
    number: '3',
    emoji: '🔞',
    title: 'Keep Content Appropriate',
    description:
      'No NSFW, graphic, violent, or explicit content outside of specifically designated age-gated channels. When in doubt, **do not post it**.',
  },
  {
    number: '4',
    emoji: '🔒',
    title: 'Protect Privacy',
    description:
      'Do not share personal information about yourself or others — including real names, addresses, phone numbers, or photos — without explicit consent. **Doxxing is a permanent ban offense**.',
  },
  {
    number: '5',
    emoji: '⚠️',
    title: 'No Threats or Illegal Content',
    description:
      'Threats of violence, illegal activity, piracy, cheating software, hacking tools, or any content that violates Discord\'s Terms of Service are **absolutely forbidden**.',
  },
  {
    number: '6',
    emoji: '💬',
    title: 'Use the Right Channels',
    description:
      'Keep conversations relevant to each channel\'s topic. Read the channel description before posting. Off-topic discussions belong in the appropriate general channels.',
  },
  {
    number: '7',
    emoji: '🤖',
    title: 'No Bot Abuse',
    description:
      'Do not spam bot commands or attempt to exploit bots. Bots are here to enhance your experience — misuse results in a warning or ban.',
  },
  {
    number: '8',
    emoji: '📢',
    title: 'Listen to Staff',
    description:
      'Moderators and admins have the final say. If you disagree with a decision, bring it up calmly through the appropriate channel. **Do not argue publicly** or attempt to undermine staff authority.',
  },
  {
    number: '9',
    emoji: '🌐',
    title: 'English in Main Channels',
    description:
      'Please use English in the main public channels so that staff and members can understand and moderate discussions fairly. Language-specific channels may be available for other languages.',
  },
  {
    number: '10',
    emoji: '✅',
    title: 'By Being Here, You Agree',
    description:
      'By participating in this server you confirm that you have **read, understood, and agree** to abide by these rules. Ignorance of the rules is not an excuse. Violations may result in warnings, mutes, kicks, or permanent bans.',
  },
];

// ─── NAP Rules Content ───────────────────────────────────────────────────────
const NAP_RULES = [
  {
    number: '1',
    emoji: '🛡️',
    title: 'No Attacks on NAP Cities or Banners',
    description:
      'Do not attack or scout NAP alliance cities, or attack NAP alliance banners.',
  },
  {
    number: '2',
    emoji: '⚔️',
    title: 'Non-NAP Cities & New Player Protection',
    description:
      'Non-NAP cities may be attacked. However, **attacks on new and low-level players are not allowed**. Our goal is to protect new players and support Kingdom growth.',
  },
  {
    number: '3',
    emoji: '⏱️',
    title: '24-Hour Response Requirement',
    description:
      'If an issue is brought up in NAP chat requiring a response, the alliance **must respond within 24 hours**.',
  },
  {
    number: '4',
    emoji: '⚠️',
    title: 'Member Conduct & Removal Policy',
    description:
      'If you have a player who is breaking NAP rules, all attempts must be made to contact your member and correct the behavior. If a **2nd offense** occurs by the same player, they **must be removed** from your alliance.',
  },
  {
    number: '5',
    emoji: '🚧',
    title: 'No Enclosing Outpost Territory',
    description:
      'NAP members are **not allowed** to enclose Outpost territory to block other alliances.',
  },
  {
    number: '6',
    emoji: '🌾',
    title: 'Open Gathering Rights',
    description:
      'Gathering is **allowed on any lands** regardless of flag placement.',
  },
  {
    number: '7',
    emoji: '🚫',
    title: 'No Recruiting or Poaching',
    description:
      'No recruiting or poaching members from another NAP alliance.',
  },
  {
    number: '8',
    emoji: '💬',
    title: 'Accidental Attacks Must Be Reported',
    description:
      'Accidental attacks must be reported in NAP chat. **No retaliation** until the issue has been discussed.',
  },
  {
    number: '9',
    emoji: '🗳️',
    title: 'Rule Changes Require Majority Vote',
    description:
      'Any future changes to these rules require **discussion and a majority vote** of the NAP leaders.',
  },
  {
    number: '10',
    emoji: '🤝',
    title: 'No Harassment or False Accusations',
    description:
      'Personal attacks, harassment, false accusations, and deliberate provocation are **not allowed**. Any accusation or complaint must be supported by **evidence** (screenshots, battle reports, or chat logs).',
  },
  {
    number: '11',
    emoji: '🔁',
    title: '10-Minute Response Under Attack',
    description:
      'If an alliance is under repeated attack, the attacking alliance\'s **R4/R5 must respond within 10 minutes** after being contacted. If there is no response, the defending alliance may use **proportional retaliation** until contact is established. The incident must then be reported in NAP chat with evidence.',
  },
  {
    number: '12',
    emoji: '💀',
    title: 'Zeroing is Strictly Prohibited',
    description:
      'Zeroing any NAP member / academies & farms is **extremely prohibited**.\n\n🟡 **1st Offense:** Warning + restitution/penalty determined by NAP leadership.\n🔴 **2nd Offense:** Immediate removal from NAP and **ban from NAP protection**.',
  },
];

// ─── Build the NAP rules embeds ───────────────────────────────────────────────
function buildNapRulesEmbeds() {
  const embeds = [];

  // Header embed
  const headerEmbed = new EmbedBuilder()
    .setColor(0xe74c3c) // alert red
    .setTitle('🚨  NAP RULES 🚨')
    .setDescription(
      '> These are the **Non-Aggression Pact (NAP)** rules that all member alliances **must** follow.\n> Violations are taken seriously and may result in **removal from the NAP**.'
    )
    .setTimestamp()
    .setFooter({ text: 'NAP Leadership  •  Last updated' });

  embeds.push(headerEmbed);

  // Split rules into two embeds to stay under Discord's 25-field limit
  const firstBatch = NAP_RULES.slice(0, 6);
  const secondBatch = NAP_RULES.slice(6);

  const rulesEmbed1 = new EmbedBuilder()
    .setColor(0xe67e22) // orange accent
    .addFields(
      firstBatch.map((rule) => ({
        name: `${rule.emoji}  Rule ${rule.number} — ${rule.title}`,
        value: rule.description,
        inline: false,
      }))
    );

  embeds.push(rulesEmbed1);

  const rulesEmbed2 = new EmbedBuilder()
    .setColor(0xe67e22)
    .addFields(
      secondBatch.map((rule) => ({
        name: `${rule.emoji}  Rule ${rule.number} — ${rule.title}`,
        value: rule.description,
        inline: false,
      }))
    );

  embeds.push(rulesEmbed2);

  // Footer embed
  const footerEmbed = new EmbedBuilder()
    .setColor(0xfee75c) // yellow
    .setDescription(
      '> 📸 **Evidence required** for all complaints — screenshots, battle reports, or chat logs.\n> 🚨 **Report violations** directly to NAP leadership with evidence.\n\n*Thank you for upholding the NAP and keeping our Kingdom strong!* 🏰'
    );

  embeds.push(footerEmbed);

  return embeds;
}

// ─── Build the rules embeds ───────────────────────────────────────────────────
function buildRulesEmbeds() {
  const embeds = [];

  // Header embed
  const headerEmbed = new EmbedBuilder()
    .setColor(0x5865f2) // Discord blurple
    .setTitle('📜  Server Rules')
    .setDescription(
      '> Welcome! To keep this community **safe, friendly, and enjoyable** for everyone, please read and follow the rules below.\n> Breaking these rules may result in **warnings, mutes, kicks, or permanent bans**.'
    )
    .setThumbnail('https://cdn.discordapp.com/emojis/0.png')
    .setTimestamp()
    .setFooter({ text: 'Last updated' });

  embeds.push(headerEmbed);

  // Rules embed — all rules in one well-formatted embed
  const rulesEmbed = new EmbedBuilder()
    .setColor(0x57f287) // green accent
    .addFields(
      RULES.map((rule) => ({
        name: `${rule.emoji}  Rule ${rule.number} — ${rule.title}`,
        value: rule.description,
        inline: false,
      }))
    );

  embeds.push(rulesEmbed);

  // Footer embed
  const footerEmbed = new EmbedBuilder()
    .setColor(0xfee75c) // yellow
    .setDescription(
      '> 💡 **Questions?** Open a ticket or DM a staff member.\n> 🛡️ **Report rule-breaking** by right-clicking a message → **Apps → Report**.\n\n*Thank you for helping us keep this server a great place for everyone!* 🎉'
    );

  embeds.push(footerEmbed);

  return embeds;
}

// ─── Ready Event ──────────────────────────────────────────────────────────────
client.once('clientReady', () => {
  console.log(`✅  Logged in as ${client.user.tag}`);
  console.log(`📡  Serving ${client.guilds.cache.size} guild(s)`);
});

// ─── Interaction Handler ──────────────────────────────────────────────────────
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // ── /postrules ──────────────────────────────────────────────────────────────
  if (interaction.commandName === 'postrules') {
    // Only allow members who can manage the server / messages
    if (!interaction.memberPermissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({
        content: '❌ You need the **Manage Messages** permission to post the rules.',
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    try {
      const embeds = buildRulesEmbeds();

      // Post each embed as a separate message so they render cleanly
      for (const embed of embeds) {
        await interaction.channel.send({ embeds: [embed] });
      }

      await interaction.editReply({
        content: '✅ Rules posted successfully!',
      });
    } catch (err) {
      console.error('Error posting rules:', err);
      await interaction.editReply({
        content: '❌ Something went wrong while posting the rules. Check my permissions in this channel.',
      });
    }
  }

  // ── /announcement ───────────────────────────────────────────────────────────
  if (interaction.commandName === 'announcement') {
    // Only allow members with Administrator or Manage Guild
    if (!interaction.memberPermissions.has(PermissionFlagsBits.ManageGuild)) {
      return interaction.reply({
        content: '❌ You need the **Manage Server** permission to send announcements.',
        flags: MessageFlags.Ephemeral,
      });
    }

    const message = interaction.options.getString('message', true);

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    try {
      // Only ping the 5 specified roles — never the BOT role
      const TARGET_ROLE_NAMES = ['R5', 'R4', 'R3', 'R2', 'CHAOS CREW'];

      const roles = interaction.guild.roles.cache.filter((r) =>
        TARGET_ROLE_NAMES.includes(r.name)
      );

      if (roles.size === 0) {
        await interaction.editReply({
          content: '⚠️ Could not find any of the target roles (R5, R4, R3, R2, CHAOS CREW). Make sure they exist in the server.',
        });
        return;
      }

      const roleMentions = roles.map((r) => `<@&${r.id}>`).join(' ');

      // Build a premium announcement embed
      const announcementEmbed = new EmbedBuilder()
        .setColor(0xeb459e) // vibrant pink
        .setAuthor({
          name: `📣  Announcement from ${interaction.member.displayName}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(
          `> ${message.split('\n').join('\n> ')}`
        )
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name}  •  Staff Announcement` });

      // Send role pings as content (so they actually notify), embed as body
      await interaction.channel.send({
        content: roleMentions || '📣',
        embeds: [announcementEmbed],
        allowedMentions: { roles: roles.map((r) => r.id) },
      });

      await interaction.editReply({ content: '✅ Announcement sent!' });

      // ── Notify general chat ─────────────────────────────────────────────────
      try {
        const generalChannel = await client.channels.fetch(process.env.GENERAL_CHANNEL_ID);

        if (generalChannel && generalChannel.isTextBased()) {
          // Grab the last message sent (our announcement) for its URL
          const sent = await interaction.channel.messages
            .fetch({ limit: 1 })
            .then((msgs) => msgs.first())
            .catch(() => null);

          const notifyEmbed = new EmbedBuilder()
            .setColor(0xff9500) // vivid orange — grabs attention
            .setTitle('📣  New Announcement!')
            .setDescription(
              `A new announcement was just posted in <#${interaction.channelId}>!

→ **[Click here to read it](${sent?.url ?? `https://discord.com/channels/${interaction.guildId}/${interaction.channelId}`})**`
            )
            .setAuthor({
              name: interaction.member.displayName,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp()
            .setFooter({ text: `${interaction.guild.name}  •  Staff Announcement` });

          await generalChannel.send({ embeds: [notifyEmbed] });
          console.log(`📬  General chat notified about announcement from ${interaction.user.tag}`);
        } else {
          console.warn('⚠️  General channel not found or not text-based. Check GENERAL_CHANNEL_ID in .env');
        }
      } catch (notifyErr) {
        console.error('Error notifying general chat:', notifyErr);
      }

    } catch (err) {
      console.error('Error sending announcement:', err);
      await interaction.editReply({
        content: '❌ Something went wrong. Make sure I have permission to send messages and mention roles in this channel.',
      });
    }
  }

  // ── /postnap ─────────────────────────────────────────────────────────────────
  if (interaction.commandName === 'postnap') {
    // Only allow members who can manage the server / messages
    if (!interaction.memberPermissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({
        content: '❌ You need the **Manage Messages** permission to post the NAP rules.',
        flags: MessageFlags.Ephemeral,
      });
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    try {
      const embeds = buildNapRulesEmbeds();

      // Post each embed as a separate message so they render cleanly
      for (const embed of embeds) {
        await interaction.channel.send({ embeds: [embed] });
      }

      await interaction.editReply({
        content: '✅ NAP Rules posted successfully!',
      });
    } catch (err) {
      console.error('Error posting NAP rules:', err);
      await interaction.editReply({
        content: '❌ Something went wrong while posting the NAP rules. Check my permissions in this channel.',
      });
    }
  }
});

// ─── Login ────────────────────────────────────────────────────────────────────

client.login(process.env.DISCORD_TOKEN);
