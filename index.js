const mineflayer = require("mineflayer");

// =================== CONFIG ===================
const config = {
  host: "vnxace.aternos.me", // your Aternos server address
  port: 61163,                     // your server port
  username: "AFKBot_04",           // change if duplicate login
  version: false,                   // auto-detect Minecraft version

  jumpInterval: 3000,               // jump every 3 seconds
  moveInterval: 2000,               // change random direction every 2 seconds
  rejoinInterval: 30000             // reconnect after 30 seconds if disconnected
};
// ===============================================

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version
  });

  bot.on("login", () => {
    console.log(`[bot] Logged in as ${bot.username} on ${config.host}:${config.port}`);
    startAFK();
  });

  bot.on("end", () => {
    console.log("[bot] Disconnected. Reconnecting in 30s...");
    setTimeout(createBot, config.rejoinInterval);
  });

  bot.on("kicked", reason => console.log("[bot] Kicked:", reason));
  bot.on("error", err => console.log("[bot] Error:", err));
}

function startAFK() {
  if (!bot) return;

  // Jump loop
  setInterval(() => {
    if (!bot || !bot.entity) return;
    bot.setControlState("jump", true);
    setTimeout(() => bot.setControlState("jump", false), 200);
  }, config.jumpInterval);

  // Random movement loop
  setInterval(() => {
    if (!bot || !bot.entity) return;
    const directions = ["forward", "back", "left", "right"];
    directions.forEach(dir => bot.setControlState(dir, false));
    const randomDir = directions[Math.floor(Math.random() * directions.length)];
    bot.setControlState(randomDir, true);
  }, config.moveInterval);
}

// Start the bot
createBot();  // Random movement loop
  setInterval(() => {
    if (!bot || !bot.entity) return;
    const directions = ["forward", "back", "left", "right"];
    directions.forEach(dir => bot.setControlState(dir, false));
    const randomDir = directions[Math.floor(Math.random() * directions.length)];
    bot.setControlState(randomDir, true);
  }, config.moveInterval);
}

// Start the bot
createBot();  })

  bot.on('end', () => {
    console.log("🔄 Disconnected. Reconnecting in 5 seconds...")
    setTimeout(createBot, 5000)
  })
}

createBot()

// Prevent Railway from sleeping (basic web server)
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Bot is running!')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`)
})  }, 5000); // Every 5 sec
}

