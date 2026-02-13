const mineflayer = require('mineflayer')

const config = {
  host: process.env.MC_HOST || "your_server_ip",
  port: parseInt(process.env.MC_PORT) || 25565,
  username: process.env.MC_USERNAME || "BotName",
  version: process.env.MC_VERSION || false // set like "1.20.4" if needed
}

function createBot() {
  const bot = mineflayer.createBot(config)

  bot.on('login', () => {
    console.log("✅ Bot logged in")
  })

  bot.on('spawn', () => {
    console.log("🌍 Bot spawned")

    // Anti AFK movement every 10 seconds
    setInterval(() => {
      if (!bot.entity) return
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)

      bot.setControlState('forward', true)
      setTimeout(() => bot.setControlState('forward', false), 1000)
    }, 10000)
  })

  bot.on('kicked', (reason) => {
    console.log("❌ Kicked:", reason)
  })

  bot.on('error', (err) => {
    console.log("⚠️ Error:", err.message)
  })

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

