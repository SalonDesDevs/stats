import MessageCollector from './src/MessageCollector'
import processors from './src/processors'
import { Client } from 'discord.js'
import express from 'express'

const { DISCORD_TOKEN, DISCORD_GUILD } = process.env

const client = new Client()
const app = express()

const procs = {}

client.on('ready', () => {
  console.log('I am ready!');
  const collector = new MessageCollector(client.guilds.get(DISCORD_GUILD))

  for (const proc in processors)
    procs[proc] = new processors[proc](collector)
  
  collector.fetch().then(_ => {
    console.log('End')
  })
});

app.get('/:processor/:property', ({ params: { processor, property }}, res) => {
  if (procs[processor] && procs[processor].allowedProperties.includes(property)) {
    res.json(procs[processor][property])
  } else
    res.status(404).end()
})


client.login(DISCORD_TOKEN)
app.listen(5004, _ => console.log('Stats server listening at 5004'))


process.on('unhandledRejection', error => console.error('unhandledRejection', error))

