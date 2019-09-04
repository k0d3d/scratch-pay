var app = new Vue({
  el: '#wrapper',
  data: {
    message: 'Hello Vue!'
  },
  mounted: function () {
    this.getSomeUsers()
      .then(console.log)
  },
  methods: {
    /** get some users from a dummmy api */
    getSomeUsers () {
      return fetch('https://reqres.in/api/users')
    }
  }
})
