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
      this.setData({
        classic: res
      })
    })
  },
  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext: function(event) {
    this._updateClassic('next')
  },
  onPrevious: function(event) {
    this._updateClassic('previous')
  },
  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  }
})