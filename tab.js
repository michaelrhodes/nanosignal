module.exports = tab

function tab (key) {
  var tab

  addEventListener('storage', onstorage)

  return tab = {
    send: send,
    close: close,
    onmessage: noop
  }

  function send (data) {
    localStorage[key] = (
      typeof data === 'string' ?
      data : JSON.stringify(data)
    )
  }

  function close () {
    removeEventListener('storage', onstorage)
  }

  function onstorage (item) {
    if (item.key === key && item.newValue) {
      localStorage.removeItem(key)
      tab.onmessage(item.newValue)
    }
  }
}

function noop () {}
