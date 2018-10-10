const app = new Vue({
  el: '#banksy',
  data() {
    return {
      shredding: null,
      dropping: null
    }
  },
  methods: {
    shred() {
      this.shredding = anime({
        targets: '#original',
        height: 0,
        duration: 10000,
        easing: 'linear'
      })

      this.dropping = anime({
        targets: '#painting',
        translateY: '101%',
        duration: 10000,
        easing: 'linear'
      })
    },
    artSelected(e) {
      this.shredding.pause()
      this.dropping.pause()
      
      loadImage(
        e.target.files[0],
        canvas => {
          let url = canvas.toDataURL('image/jpeg')
          
          document.getElementById('original').style.backgroundImage = `url(${url})`
          
          let elements = Array.from(document.getElementsByClassName('shred'))
          
          elements.forEach(element => {
            element.style.backgroundImage = `url(${url})`
          })
          
          document.getElementById('original').style.height    = '100%'
          document.getElementById('painting').style.transform = 'translateY(0)'
          
          this.shred()
        }, {
          canvas: true,
          crop: true,
          maxHeight: 566,
          maxWidth: 392,
          orientation: true
        }
      )
    }
  },
  mounted() {
    this.shred()
  }
})