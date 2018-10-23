new Vue({
  el: '#app',
  data: {
    textInput: ''
  },
  computed: { //Turn data into viewable vales
    identicon: function() {
       return jdenticon.toSvg(this.textInput, 200);
    }
  },
  methods: { //Use these functions to change data
    onInput: function(event) {
      this.textInput = event.target.value;
    }
  }
});
