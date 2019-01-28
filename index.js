module.exports = NanoSignal

function NanoSignal (url) {
  if (!(this instanceof NanoSignal))
    return new NanoSignal(url)

  this.url = url
  this.onmessage = noop
  this.onerror = noop

  this.id = Math.random().toString(36).substr(2)
  this.es = new EventSource(this.url)
  this.es.addEventListener('error', this)
  this.es.addEventListener('message', this)
}

NanoSignal.prototype = {
  handleEvent: handleEvent,
  close: close,
  send: send,
}

function handleEvent (e) {
  if (e.type === 'error')
    return this.onerror(e.message)

  var json = JSON.parse(e.data)
  if (json.id !== this.id)
    this.onmessage(json.data)
}

function send (data, cb) {
  cb = cb || noop
  var xhr = new XMLHttpRequest
  xhr.open('POST', this.url, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return
    var code = xhr.status
    var err = code === 0 || code >= 400
    cb.call(xhr, err ? code : null)
  }
  xhr.send(JSON.stringify({
    id: this.id,
    data: data
  }))
}

function close () {
  this.es.close()
}

function noop () {}
