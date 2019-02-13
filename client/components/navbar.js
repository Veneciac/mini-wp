Vue.component('my-navbar', {
    template: `
    <nav class="navbar navbar-expand-lg sticky-top">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"><i class="fas fa-list"></i></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav m-auto">
                <li class="nav-item active">
                    <a style="color: black; cursor: pointer" class="nav-link" @click.prevent="home">Home</a>
                </li>
                <li class="nav-item" v-if="user">
                    <a style="color: black; cursor: pointer" class="nav-link" @click.prevent="add">Write</a>
                </li>
                <li class="nav-item" v-if="!user">
                    <a style="color: black; cursor: pointer" class="nav-link" @click.prevent="openSignUp">Sign Up</a>
                </li>
                <li class="nav-item" v-if="!user" >
                    <a style="color: black; cursor: pointer" class="nav-link" @click.prevent="login">Login</a>
                </li>
                <li class="nav-item" v-if="user" >
                    <a style="color: black; cursor: pointer" class="nav-link" @click.prevent="logout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
    `,
    props: ['user'],
    methods: {
        openSignUp () {
            this.$emit('open-sign-up')
        },
        home () {
            this.$emit('open-home')
        },
        add () {
            this.$emit('add-article')
        },
        login () {
            this.$emit('open-login')
        },
        logout () {
            this.$emit('logout')
        }
    },
    data () {
        return {
        }
    },

})