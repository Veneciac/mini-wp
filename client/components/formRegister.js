Vue.component('form-register', {
    data () {
        return {
            name: '',
            email: '',
            password: '',
            birthday: '',
            aboutMe: '',
            image: '',
        }
    },
    methods: {
        handleFileUpload(){
            this.image = this.$refs.file.files[0];
        },
        register () {
            let data = new FormData()

            data.append('image', this.image);
            data.append('name', this.name);
            data.append('email', this.email);
            data.append('password', this.password);
            data.append('aboutMe', this.aboutMe);
            data.append('birthday', this.birthday);

            axios({
                method: 'post',
                url: `${url}/users`,
                data
            })
            .then(({ data }) => {
                this.name = ''
                this.email = ''
                this.password = ''
                this.birthday = ''
                this.aboutMe = ''

                this.$emit('set-user', data)
                alertify.message('Welcome')
            })
            .catch(err => {
                alertify.error('Something went wrong');
                console.error(err)
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
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    aboutMe: data.aboutMe,
                    birthday: data.birthday,
                    image: data.image
                }
                app.state = 'home'
                alertify.message('Welcome')
            })
            .catch(err => {
                alertify.error('Something went wrong');
                console.error(err)
            })
        },
        close () {
            this.$emit('close-register')
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
    template: 
    `
    <div class="card mt-3">
        <div class="card-body row">
            <form style="width: 100%" @submit.prevent="register" class="ml-3 mr-3">
                <fieldset>
                    
                    <h1 class="article-title text-center" style="color: grey"> 
                        <i class="fas fa-genderless"></i>
                        Register
                        <i class="fas fa-genderless"></i>
                    </h1>
                    
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" class="form-control" v-model="name" placeholder="Enter your name">
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="text" class="form-control" v-model="email" placeholder="Enter email">
                        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" v-model="password" placeholder="Password">
                    </div>
                
                    <div class="form-group">
                        <label >Birthday</label>
                        <input type="date" class="form-control" v-model="birthday" >
                    </div>

                    <div class="form-group">
                        <label for="exampleTextarea">About me</label>
                        <textarea class="form-control" v-model="aboutMe" rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputFile">File input</label>
                        <input type="file" @change="handleFileUpload" class="mt-3" id="file" ref="file"></input>
                    </div>

                    <div class="row justify-content-end">
                        <div id="google-sign-in" class="g-signin2"></div>
                        <button type="submit" class="btn btn-primary ml-2">Submit</button>
                        <button type="button" @click="close" style="background-color: #e0e0e0" class="btn ml-2">Close</button>
                    </div>

                </fieldset>
            </form>

        </div>

    </div>
    `
})

