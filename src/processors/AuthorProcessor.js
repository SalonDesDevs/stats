export default class AuthorProcessor {
  constructor(collector) {
    this.byDate = {}
    this.byChannel = {}
    this.allowedProperties = ['byDate', 'byChannel']
    
    collector.on('message', msg => this.onMessage(msg))
  }

  onMessage({ author: { id: author }, channel: { id: channel }, createdAt }) {
    const date = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;

    if (!(date in this.byDate)) this.byDate[date] = {}
    if (!(channel in this.byChannel)) this.byChannel[channel] = {}

    const maps = [this.byDate[date], this.byChannel[channel]]
    for (const map of maps)
      map[author] = (map[author] || 0) + 1
  }
}