import { HTTP } from '../util/http'

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        // 最大期刊号写入缓存
        this._setLatestIndex(res.index)
        // 写入缓存`classic-${index}`
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  getClassic(index, nextOrPrevious, sCallback) {
    // 先在缓存中寻找 -> 提升性能，减少请求数
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if(!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          // 写入缓存`classic-${index}`
          wx.setStorageSync(
            this._getKey(res.index), res
          )
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
  }
  isFirst(index) {
    return index === 1 ? true : false
  }
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex === index
  }
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }
  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}

export { ClassicModel }
