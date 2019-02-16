Vue.component('edit-user', {
    props: ['user'],
    data () {
        return {
            name: this.user.name,
            email: this.user.email,
            password: '',
            birthday: '',
            aboutMe: this.user.aboutMe,
            image: this.user.image,
            imageUrl: '',
        }
    },
    methods: {
        handleFileUpload(){
            this.imageUrl = URL.createObjectURL(this.$refs.file.files[0]);
            this.image = this.$refs.file.files[0];
        },
        parseDate () {
            var today = new Date(this.user.birthday);
            var dd = today.getDate()
            var mm = today.getMonth()+1
            var yyyy = today.getFullYear()
            
            if(dd < 10){
                dd ='0'+ dd
            } 
            if(mm < 10){
                mm ='0'+ mm
            } 
            
            today = yyyy+'-'+mm+'-'+dd;
            this.birthday = today
        },
        edit () {
            let data = new FormData()

            data.append('image', this.image);
            data.append('name', this.name);
            data.append('email', this.email);
            data.append('password', this.password);
            data.append('aboutMe', this.aboutMe);
            data.append('birthday', this.birthday);

            axios({
                method: 'put',
                url: `${url}/users`,
                data,
                headers: {
                    token: localStorage.token
                }
            })
            .then( ({ data }) => {
                alertify.message('Welcome')
                this.$emit('set-user', data)
            })
            .catch(err => {
                alertify.error('Something went wrong');
                console.error(err)
            })
        },
        close () {
            this.$emit('close-edit-user')
        }
    },

    template: 
    `
    <div class="card mt-3">
        <div class="card-body row">
            <form style="width: 100%" @submit.prevent="edit" class="ml-3 mr-3">
                <fieldset>
                    
                    <h1 class="article-title text-center" style="color: grey"> 
                        <i class="fas fa-genderless"></i>
                        Edit User
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

                    <div v-if="imageUrl" >
                        <img style="width: 100%; height: 100%" class="img-art" :src="imageUrl" :alt="imageUrl" >
                    </div>
                    <div v-else >
                        <img style="width: 100%; height: 100%" class="img-art" :src="image" :alt="image" >
                    </div>

                    <div class="row mt-3 justify-content-end">
                        <button type="submit" class="btn btn-primary ml-2">Submit</button>
                        <button type="button" @click="close" style="background-color: #e0e0e0" class="btn ml-2">Close</button>
                    </div>

                </fieldset>
            </form>

        </div>

    </div>
    `
})

