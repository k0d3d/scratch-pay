
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
  /**
   *  Run a RESTful fetch to get all the
   * latest active users.
   * @returns {} void
   */
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
    /**
     * Create a new user on the latest active users table
     * 
     * @param { Object } body An object with the required properties
     * and values to create a new user. 
     */
    addUser () {
      if (this.users.find(user => user.email === this.form.email)) return alert(`This user already exists`)
      let body = this.form
      return fetch('https://reqres.in/api/users', {
        method: 'POST',
        body
      })
        .then(resp => resp.json())
        .then(resp => {
          this.users.push({ id: resp.id, ...this.form })
        })
    },
    /**
     * Removes a user from the list of users
     * on the active users table.
     * @param {String} userId a valid user id
     */
    removeUser (userId) {
      this.users = this.users.filter(user => user.id !== userId)
    },
    /**
     * toggles showing the add user card feature
     */
    showAddUsers () {
      this.addUserIsShown = !this.addUserIsShown
    },
    /**
     * processes user login
     */
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
