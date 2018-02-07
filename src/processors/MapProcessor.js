export default class MapProcessor {
  constructor(collector) {
    this.usernames = {}
    this.channels = collector.guild.channels.reduce((c, {id, name}) => (c[id] = name, c), {})
    this.allowedProperties = ['usernames', 'channels']
    
    collector.on('message', msg => this.onMessage(msg))
  }

  onMessage({ author }) {
    this.usernames[author.id] = author.username
  }
}