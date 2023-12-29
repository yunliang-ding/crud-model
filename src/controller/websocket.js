module.exports = class extends think.Controller {
  constructor(...arg) {
    super(...arg);
  }
  openAction() {
    this.emit('opend', 'This client opened successfully!')
  }
  addUserAction() {
    console.log('获取客户端 addUser 事件发送的数据', this.wsData);
    setTimeout(() => {
      this.broadcast('add', this.wsData)
    }, 2000)
    // console.log('获取当前 WebSocket 对象', this.websocket);
    // console.log('判断当前请求是否是 WebSocket 请求', this.isWebsocket);
  }
}