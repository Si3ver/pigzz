import { HTTP } from '../util/http'

class LikeModel extends HTTP {
  like(behaviour, artID, catagory) {
    let url = behaviour === 'like' ? 'like' : 'like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artID,
        type: catagory
      }
    })
  }
  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }
}

export { LikeModel }
