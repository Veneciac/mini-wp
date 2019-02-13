Vue.component('form-login', {
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login () {
            let data = {
                email: this.email,
                password: this.password
            }
            axios({
                method: 'post',
                url: `${url}/users/login`,
                data
            })
            .then( ({ data }) => {
                this.email = ''
                this.password = ''
                this.$emit('set-user', data)
            })
            .catch(err => {
                console.error(err)
                console.log(err.response)
            })
        },
        onSignIn (googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            axios({
                method: 'post',
                url: `${url}/users/gooSign`,
                data: {
                    token: id_token
                }
            })
            .then(response => {
                localStorage.setItem('token', response.data.token)
                let data = response.data.data
                app.user = {
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    aboutMe: data.aboutMe,
                    birthday: data.birthday,
                    image: data.image
                }
                app.state = 'home'
            })
            .catch(err => {
                console.error(err)
            })
        },
        close () {
            this.$emit('close-login')
        }
    },
    mounted () {
        gapi.signin2.render('google-sign-in', {
            scope: 'email profile',
            width: 200,
            height: 50,
            longtitle: true,
            onsuccess: this.onSignIn,
        })
    },
    template: `
    <div class="card mt-3">
        <div class="card-body row">
            <form style="width: 100%" @submit.prevent="login" class="ml-3 mr-3">
                <fieldset>
                    <h1 class="article-title text-center" style="color: grey"> 
                        <i class="fas fa-genderless"></i>
                        Login
                        <i class="fas fa-genderless"></i>
                    </h1>

                    <div class="form-group">
                        <label>Email address</label>
                        <input required type="email" class="form-control" v-model="email" placeholder="Enter email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input required type="password" class="form-control" v-model="password" placeholder="Password">
                    </div>

                    <div class="row justify-content-end">
                        <div class="g-signin2" id="google-sign-in"></div>
                        <button type="submit"  class="btn btn-primary ml-2">Submit</button>
                        <button type="button" @click="close" style="background-color: #e0e0e0" class="btn ml-2">Close</button>
                    </div>

                </fieldset>
            </form>
        </div>
    </div>
    `
})