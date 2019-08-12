import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({
  data: {
    classic: null,
    latest: true,
    first: false
  },

  onLoad: function (options) {
    classicModel.getLatest((res) => {
      console.log(res)
      this.setData({
        classic: res
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },

  onLike: function (event) {
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext: function(event) {
    console.log(event)
  },
  onPrevious: function(event) {
    console.log(event)
  }
})