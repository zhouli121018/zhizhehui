/**
 * @description 时间戳获取年月日时分秒
 * @author lijiaxi
 * @export fn
 * @param {*} time 可转为时间对象的参数
 * @param {*} [format='-'] 时间格式连接符
 * @returns String
 */
export function parseTime(time, format = '-,:') {
  if (!time) {
    return 0
  }
  time = time.toString().length === 13 ? time : time * 1000
  let sep = format.split(',')
  return `${getYMD(time, sep[0])} ${getHMS(time, sep[1])}`
}

/**
 * @description 时间戳获取年月日
 * @author lijiaxi
 * @export fn
 * @param {*} o 可转为时间对象的参数
 * @param {string} [format='-'] 时间格式连接符
 * @returns String
 */
export function getYMD(o, format = '-') {
  o = o.toString().length === 13 ? o : o * 1000
  let date = new Date(o),
      Y = date.getFullYear(),
      M = date.getMonth() + 1,
      D = date.getDate() + ' ';
  M = M < 10 ? '0' + M : M
  D = D < 10 ? '0' + D : D
  return [Y, M, D].join(format)
}

/**
 * @description 获取时分秒
 * @author lijiaxi
 * @export fn
 * @param {*} o 可转为时间对象的参数
 * @param {string} [format=':'] 时间格式连接符
 * @returns String
 */
export function getHMS(o, format = ':') {
  o = o.toString().length === 13 ? o : o * 1000
  let date = new Date(o),
      h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return [h, m, s].join(format)
}

/**
 * @description 把时间转换成已使用的时间
 * @author lijiaxi
 * @export fn
 * @param {*} startTime 开始时间
 * @param {*} endTime 结束时间
 * @returns object | String
 */
export function getdTimes(startTime, endTime) {
  let val
  if (startTime > endTime) {
    return '1分钟'
  }
  let argsLen = arguments.length
  if (argsLen === 2) {
    val = (endTime - startTime) / 1000;
  } else {
    val = startTime / 1000;
  }
  let d = Math.floor(val / 86400);
  d = "" + d
  val = val % 86400
  let h = Math.floor(val / 3600);
  h = h < 10 ? '0' + h : '' + h
  val = val % 3600
  let m = Math.floor(val / 60);
  m = m < 10 ? '0' + m : '' + m
  let s = Math.floor(val % 60);
  s = s < 10 ? '0' + s : '' + s
  return {d, h, m, s}
}

export function getdTime(startTime, endTime) {
  let val
  if (startTime > endTime) {
    return '1分钟'
  }
  let argsLen = arguments.length
  if (argsLen === 2) {
    val = (endTime - startTime) / 1000;
  } else {
    val = startTime / 1000;
  }
  let d = Math.floor(val / 86400);
  val = val % 86400
  let h = Math.floor(val / 3600);
  val = val % 3600
  let m = Math.floor(val / 60);
  let s = Math.floor(val % 60);
  d = {
    k: d,
    v: `${d}天`
  }
  h = {
    k: h,
    v: h >= 10 ? `${h}小时` : `0${h}小时`
  }
  m = {
    k: m,
    v: m >= 10 ? `${m}分钟` : `0${m}分钟`
  }
  s = {
    k: s,
    v: s >= 10 ? `${s}秒` : `0${s}秒`
  }
  return [d, h, m, s].filter(item => item.k).map(item => item.v).join('')
}

/**
 * @description 格式化url参数,小程序跳转
 * @author lijiaxi
 * @export fn
 * @param {*} [{url = '', ...other}={}] url为页面路径，other为其他参数
 * @returns String | Object
 */
export function queryStringify({url = '', ...other} = {}) {
  let res = []
  for (let key in other) {
    let value = other[key]
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    res.push(`${key}=${value}`)
  }
  res = res.join('&')
  if (url) {
    res = {
      url: `${url}?${res}`
    }
  }
  return res
}

/**
 * @description 截取url参数
 * @author lijiaxi
 * @export fn
 * @param {string} [url='']
 * @returns Object
 */
export function urlParse(url = '') {
  

  url = url.split('?')[1] ? url.split('?')[1] : url
  let res = {}
  let kv = url.split('&')
  for (let i = 0; i < kv.length; i++) {
    let qs = kv[i].split('=')
    res[decodeURIComponent(qs[0])] = decodeURIComponent(qs[1])
  }
  return res
}

/**
 * @param {*} type  图片压缩后的类型
 * @param {*} img  需要压缩的图片
 * @param {*} size  图片要压缩到的尺寸
 * @param {*} cb  图片压缩成功后的回调
 */
export function compressImg({
                              img = null, cb = function () {
  }, type = 'blob', size = {w: 120, h: 120}
                            } = {}) {

  let reader = new FileReader()
  reader.onload = function () {
    let image = new Image()
    image.src = this.result
    image.onload = function () {
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      let originWidth = this.width;
      let originHeight = this.height;
      let maxWidth = size.w, maxHeight = size.h;
      let targetWidth = originWidth, targetHeight = originHeight;
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      context.clearRect(0, 0, targetWidth, targetHeight);
      context.drawImage(this, 0, 0, targetWidth, targetHeight);
      if (type === 'base64') {
        let resultUrl = canvas.toDataURL()
        cb && cb(resultUrl)
      } else {
        canvas.toBlob(blob => {
          cb && cb(blob)
        })
      }
    }
  }
  reader.readAsDataURL(img)
}

/**
 *
 *  获取倒计时
 * @export
 * @param {*} time 时间戳
 */
export function cutDown(time) {
  // 小时
  const hour = getRD(time, 60 * 60 * 1000)
  // 分
  const minutes = getRD(hour.b, 60 * 1000)
  // 秒
  const seconds = getRD(minutes.b, 1000)
  return [hour, minutes, seconds].map(item => {
    return item.a >= 10 ? item.a : `0${item.a}`
  }).join(':')
}

function getRD(number, divisor) {
  return {
    a: Math.floor(number / divisor),
    b: number % divisor
  }
}

