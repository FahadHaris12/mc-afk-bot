const mineflayer = require("mineflayer");

// =================== CONFIG ===================
const config = {
  host: "vnxace.aternos.me",
  port: 61163,
  username: "AFKBot_04",
  version: false,          // auto-detect
  jumpInterval: 3000,      // jump every 3s
  moveInterval: 2000,      // random move every 2s
  rejoinInterval: 10000    // reconnect after 10s if disconnected
};
// ===============================================

let bot;
let jumpLoop, moveLoop;

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
    stopAFK(); // stop previous intervals
    setTimeout(createBot, config.rejoinInterval);
  });

  bot.on("kicked", reason => console.log("[bot] Kicked:", reason));
  bot.on("error", err => console.log("[bot] Error:", err));
}

function startAFK() {
  if (!bot || !bot.entity) return;

  // Stop old intervals if any
  stopAFK();

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
