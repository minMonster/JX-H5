(function (win) {
  function resize () {
    var domWidth = domEle.getBoundingClientRect().width
    // if(domWidth / v > 1080){
    //   domWidth = 1080 * v
    // }
    win.rem = domWidth / 7.5
    domEle.style.fontSize = win.rem + 'px'
  }
  var v
  var initialScale
  var timeCode
  var dom = win.document
  var domEle = dom.documentElement
  var viewport = dom.querySelector('meta[name="viewport"]')

  if (viewport) {
    var o = viewport.getAttribute('content').match(/initial-scale=(["']?)([\d.]+)\1?/)
    if (o) {
      initialScale = parseFloat(o[2])
      v = parseInt(1 / initialScale)
    }
  }

  if (!v && !initialScale) {
    var n = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi))
    v = win.devicePixelRatio
    v = n ? (v >= 3 ? 3 : v) : 1
    initialScale = 1 / v
  }
  // 没有viewport标签的情况下
  domEle.setAttribute('data-dpr', v)
  if (!viewport) {
    viewport = dom.createElement('meta')
    viewport.setAttribute('name', 'viewport')
    viewport.setAttribute('content', 'initial-scale=' + initialScale + ', maximum-scale=' + initialScale + ', minimum-scale=' + initialScale + ', user-scalable=no')
    if (domEle.firstElementChild) {
      domEle.firstElementChild.appendChild(viewport)
    } else {
      var m = dom.createElement('div')
      m.appendChild(viewport)
      dom.write(m.innerHTML)
    }
  }
  win.dpr = v
  win.addEventListener('resize', function () {
    clearTimeout(timeCode)
    timeCode = setTimeout(resize, 300)
  }, false)
  win.addEventListener('pageshow', function (b) {
    if (b.persisted) {
      clearTimeout(timeCode)
      timeCode = setTimeout(resize, 300)
    }
  }, false)

  // 设置body的字体
  dom.readyState === 'complete' ? dom.body.style.fontSize = 12 * v + 'px' : dom.addEventListener('DOMContentLoaded', function () {
    dom.body.style.fontSize = 12 * v + 'px'
  }, false)

  resize()
})(window)
