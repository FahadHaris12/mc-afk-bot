// Required packages
const mineflayer = require("mineflayer");
const express = require("express");

// =================== CONFIG ===================
const config = {
  host: "vnxace.aternos.me", // your Aternos server
  port: 61163,                     // Minecraft server port
  username: "AFKBot_04",           // bot username
  version: false,                   // auto-detect Minecraft version
  jumpInterval: 3000,               // jump every 3 seconds
  moveInterval: 2000,               // random movement every 2 seconds
  rejoinInterval: 15000             // reconnect after 10 seconds
};
// ===============================================

let bot;
let jumpLoop, moveLoop;

// =================== MINEFLAYER BOT ===================
function createBot() {
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version
  });

  bot.once("spawn", () => {
    console.log(`[bot] Spawned as ${bot.username}`);
    startAFK();
  });

  bot.on("end", () => {
    console.log("[bot] Disconnected. Reconnecting...");
    stopAFK();
    setTimeout(createBot, config.rejoinInterval);
  });

  bot.on("kicked", reason => console.log("[bot] Kicked:", reason));
  bot.on("error", err => console.log("[bot] Error:", err));
}

function startAFK() {
  if (!bot || !bot.entity) return;

  stopAFK(); // stop previous loops if any

  // Jump loop
  jumpLoop = setInterval(() => {
    if (!bot || !bot.entity) return;
    bot.setControlState("jump", true);
    setTimeout(() => bot.setControlState("jump", false), 200);
  }, config.jumpInterval);

  // Random move loop
  moveLoop = setInterval(() => {
    if (!bot || !bot.entity) return;
    const directions = ["forward", "back", "left", "right"];
    directions.forEach(dir => bot.setControlState(dir, false));
    const randomDir = directions[Math.floor(Math.random() * directions.length)];
    bot.setControlState(randomDir, true);
  }, config.moveInterval);
}

function stopAFK() {
  if (jumpLoop) clearInterval(jumpLoop);
  if (moveLoop) clearInterval(moveLoop);
}

// Start the Mineflayer bot
createBot();

// =================== EXPRESS SERVER (FOR RAILWAY) ===================
const app = express();

// Simple route to satisfy Railway
app.get("/", (req, res) => res.send("Bot is alive!"));

const PORT = process.env.PORT || 3000; // Railway will assign this
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));  stopAFK();

  // Jump loop
  jumpLoop = setInterval(() => {
    if (!bot || !bot.entity) return;
    bot.setControlState("jump", true);
    setTimeout(() => bot.setControlState("jump", false), 200);
  }, config.jumpInterval);

  // Random move loop
  moveLoop = setInterval(() => {
    if (!bot || !bot.entity) return;
    const directions = ["forward", "back", "left", "right"];
    directions.forEach(dir => bot.setControlState(dir, false));
    const randomDir = directions[Math.floor(Math.random() * directions.length)];
    bot.setControlState(randomDir, true);
  }, config.moveInterval);
}

function stopAFK() {
  if (jumpLoop) clearInterval(jumpLoop);
  if (moveLoop) clearInterval(moveLoop);
}

// Start the bot
createBot();
