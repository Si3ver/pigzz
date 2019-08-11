Component({
  properties: {
    like: {
      type: Boolean,
      Observer: function() {}
    },
    count: {
      type: Number
    },
  },

  data: {
    yes_url: 'images/like.png',
    no_url: 'images/like@dis.png'
  },

  methods: {
    onLike: function(e) {
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      like = !like
      this.setData({
        count,
        like
      })
      // 激活自定义事件 like
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior
      }, {})
    }
  }
})