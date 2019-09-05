
var app = new Vue({
  el: '#vue-app',
  data: () => ({
    isEditable: false,
    addUserIsShown: false,
    users: [],
    user: {},
    email_address: '',
    form: {
      first_name: '',
      last_name: '',
      email: '',
      role: ''
    }
  }),
  mounted: function () {
    let self = this
    this.getSomeUsers()
      .then(res => res.json())
      .then(({ data }) => {
        self.users = [...data, ...self.users]
      },
      err => console.log(err))
  },
  methods: {
    /** get some users from a dummmy api */
    getSomeUsers () {
      return fetch('https://reqres.in/api/users')
    },
    addUser (body) {
      return fetch('https://reqres.in/api/users', {
        method: 'POST',
        body
      })
        .then(resp => resp.json())
        .then(resp => {
          this.users.push(resp)
        })
    },
    removeUser (userId) {
      this.users = this.users.filter(user => user.id !== userId)
    },
    showAddUsers () {
      this.addUserIsShown = !this.addUserIsShown
    },
    login () {
      this.user = {
        'username': this.email_address
      }
    }
  }
})

// var users = new Vue({
//   el: '#user-table',
//   data: {

//   }
// })
