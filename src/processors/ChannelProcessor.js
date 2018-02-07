export default class ChannelProcessor {
  constructor(collector) {
    this.byDate = {}
    this.byAuthor = new Map()
    this.allowedProperties = ['byDate', 'byAuthor']

    collector.on('message', msg => this.onMessage(msg))
  }

  onMessage({ author: { id: author }, channel: { id: channel }, createdAt }) {
    const date = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;

    if (!(date in this.byDate)) this.byDate[date] = {}
    if (!(author in this.byAuthor)) this.byAuthor[author] = {}
  
    const maps = [this.byDate[date], this.byAuthor[author]]
    for (const map of maps)
      map[channel] = (map[channel] || 0) + 1
  }
}