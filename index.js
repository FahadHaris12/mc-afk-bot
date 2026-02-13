const mineflayer = require('mineflayer');
const express = require("express");

//
// 🌐 Web server (Fly health check + optional monitor)
//
const app = express();

app.get("/", (req, res) => {
  res.send("AFK Bot is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

//
// 🤖 BOT CREATION FUNCTION
//
function createBot() {

  console.log("Creating bot...");

  const bot = mineflayer.createBot({
    host: "vnxace.aternos.me", // 🔁 CHANGE
    port: 61163,                  // 🔁 CHANGE if needed
    username: "AFK_Bot",          // 🔁 Bot name
    version: false
  });

  //
  // ✅ When bot joins
  //
  bot.on("spawn", () => {
    console.log("✅ Bot joined the server");

    startAntiAfk(bot);
  });

  //
  // 🔄 Auto reconnect after disconnect
  //
  bot.on("end", () => {
    console.log("❌ Disconnected. Rejoining in 15 sec...");
    setTimeout(createBot, 15000);
  });

  //
  // ⚠️ Error handler
  //
  bot.on("error", (err) => {
    console.log("⚠️ Bot error:", err.message);
  });

  //
  // 💬 Anti-kick chat (optional)
  //
  setInterval(() => {
    if (bot.player) {
      bot.chat("AFK but alive 👀");
    }
  }, 5 * 60 * 1000); // Every 5 min
}

createBot();

//
// 🕹️ HUMAN-LIKE MOVEMENT SYSTEM
//
function startAntiAfk(bot) {

  setInterval(() => {

    const actions = [
      "forward",
      "back",
      "left",
      "right"
    ];

    const action = actions[Math.floor(Math.random() * actions.length)];

    console.log("Moving:", action);

    bot.setControlState(action, true);

    // Random jump
    if (Math.random() > 0.6) {
      bot.setControlState("jump", true);

      setTimeout(() => {
        bot.setControlState("jump", false);
      }, 500);
    }

    // Random camera movement
    const yaw = Math.random() * Math.PI * 2;
    const pitch = (Math.random() - 0.5) * Math.PI / 2;

    bot.look(yaw, pitch, true);

    // Stop movement after random time
    setTimeout(() => {
      bot.setControlState(action, false);
    }, Math.floor(Math.random() * 3000) + 2000);

  }, 5000); // Every 5 sec
}

