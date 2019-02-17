let url = 'http://35.186.159.35'

var app = new Vue({
    el: '#app',
    name: 'Share box',
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data: {
        articleList: [],
        recent: [],
        state: 'home',
        user: null,
        article: null
    },
    methods: {
        getArticle () {
            axios({
                method: 'get',
                url: `${url}/articles`
            })
            .then( ({ data }) => {
                //   kalo g pake ini referencenya masih sama jadi kek this.recent = this.articlelist => TO DIFFERENTIATE THE SOURCE DATA (?) 
                // => SPREAD OPERATOR
                this.articleList = [...data]
                this.recent = [...data]
                
                // kalo g reverse nth kenapa datanya beda" => REVERSE LANGSUNG DARI SERVER
                // this.articleList = data
            })
            .catch( (err) => {
                alertify.error('Something went wrong');
            })
        },
        pushArticleList (data) {
            this.articleList.push(data)
            this.state = 'home'
        },
        openSignUp () {
            this.state = 'signUp'
        },
        logout () {
            gapi.load('auth2', function() { 
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut()
                .then( () => {
                    status = true
                    localStorage.removeItem('token')
                    this.user = null
                    this.state = 'home'
                });
            });

            alertify.message('Bye...')
            localStorage.removeItem('token')
            this.user = null
            this.state = 'home'
        },
        setUser (data) {
            if (data.token) {
                localStorage.setItem('token', data.token)
                this.user = data.data
            } else {
                this.user = data
            }
            this.state = 'home'
        },
        getUser () {
            axios({
                method: 'get',
                url: `${url}/users/me`,
                headers: {
                    token: localStorage.token
                }
            })
            .then( ({ data }) => {
                this.user = data
            })
            .catch(err => {
                alertify.error('Something went wrong');
            })
        },
        sendDetail (val) {
            this.article = val
            this.getArticle()
            this.state = 'articleDetail'
        },
        filter (query) {
            let q = new RegExp(query.toLowerCase())
            
            if (query) {
                this.articleList = this.articleList.filter(function (el) {
                    return el.title.toLowerCase().match(q) || el.author.name.toLowerCase().match(q)
                })
            } else {
                this.getArticle()
            }

        },
        deleteArticle (article) {
            axios({
                method: 'delete',
                url: `${url}/articles/${article._id}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then( ({ data }) => {
                this.getArticle()
                this.state = 'home'
                alertify.message('Success delete')
            })
            .catch(err => {
                alertify.error('Something went wrong');
            })
        },
        filterByTag (tag) {
            this.article = null
            let q = new RegExp(tag.toLowerCase())

            if (tag) {
                this.articleList = this.articleList.filter(art => {
                    return art.tag.join(' ').toLowerCase().match(q)
                })
            } else {
                this.getArticle()
            }

            this.state = 'home'
        },
        random () {
            this.articleList.sort(() => Math.random() - 0.5)
            this.state = 'home'
        },
    },
    created () {
        this.getArticle()
        if (localStorage.token) {
            this.getUser()
        } else {
            this.user = null
        }
    },
    mounted() {
        gapi.load('auth2', function(){
            auth2 = gapi.auth2.init({
              client_id: '509823842473-g6q5etmumnabjjat1fkb8h0u2fpit4fm.apps.googleusercontent.com',
              cookiepolicy: 'single_host_origin',
            });
        });
    },
})
