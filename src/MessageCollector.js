import { TextChannel } from 'discord.js'
import EventEmitter from 'events'

export default class MessageCollector extends EventEmitter {
  constructor (guild) {
    super()
    this.guild = guild;
  }

  async fetch() {
    for (const channel of this.guild.channels.values()) {
      if (channel instanceof TextChannel) {
        this.emit('channelStart', channel)
        await this.fetchChannel(channel)
        this.emit('channelEnd', channel)
      }
    }
  }

  async fetchChannel(channel, before) {
    console.log('Fetching more messages in', channel.name)
    const messages = await channel.fetchMessages({ before })
    messages.forEach(msg => this.emit('message', msg))
    if (messages.size) await this.fetchChannel(channel, messages.last().id)
  }
}