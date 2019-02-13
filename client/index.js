let url = 'http://localhost:3000'

var app = new Vue({
    el: '#app',
    name: 'Share box',
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data: {
        articleList: [],
        state: 'home',
        user: null,
        article: null
    },
    methods: {
      getArticle () {
        //   console.log('---- get article')
          axios({
            method: 'get',
            url: `${url}/articles`
          })
          .then( ({ data }) => {
            this.articleList = data
          })
          .catch( (err) => {
              console.error(err)
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
                localStorage.removeItem('token')
                this.user = null
                this.state = 'home'
            });
        });
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
              console.error(err.response)
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
                return el.title.toLowerCase().match(q)
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
          })
          .catch(err => {
              console.error(err)
          })
      },
      filterByTag (tag) {
          this.article = null
        console.log(tag)
        let q = new RegExp(tag.toLowerCase())

        if (tag) {
            this.articleList = this.articleList.filter(art => {
                return art.tag.join(' ').toLowerCase().match(q)
            })
        } else {
            this.getArticle()
        }

        this.state = 'home'
      }
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
              client_id: '509823842473-s1ourln1e4vc9o2cnl271p773ms4faep.apps.googleusercontent.com',
              cookiepolicy: 'single_host_origin',
            });
        });
    },
})
