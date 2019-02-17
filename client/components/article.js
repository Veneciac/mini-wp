Vue.component('article-detail', {
    props: ['article', 'user'],
    data () {
        return {
            likes: this.article.like
        }
    },
    methods: {
        edit () {
            this.$emit('edit-article', this.article)
        },
        deleteArticle () {
            this.$emit('delete-article', this.article)
        },
        searchTag (tag) {
            this.$emit('search-tag', tag)
        }, 
        like () {
            axios({
                method: 'put',
                url: `${url}/articles/${this.article._id}/like`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(data => {
                this.likes = data.data.like
            })
            .catch(err => {
                alertify.error('OOoppss, Something went wrong!');
            })
        }
    },
    mounted () {
        if (!this.user) {
            alertify.message('Sign up to write your own article');
        } 
        if (this.article.music) {
            alertify.message('Please put on headphone to enjoy full experience');
        }
        this.likes = this.article.like
    },
    template: `
    <div class="mt-3" style="background-color: white; border: 1px solid #eaeaea">

        <div class="card-body col">

            <!-- SLOT IMAGE & TITLE -->
            <div class="col mt-5"  style="background-color: rgb(247, 247, 247)">

                <!-- ARTICLE CATEGORY -->
                <div class="row justify-content-center">
                    <p class="article-caps mt-4 put-border">
                        <i class="fas fa-genderless"></i>
                        {{ article.category }}
                        <i class="fas fa-genderless"></i>
                    </p>
                </div>

                <!-- ARTICLE TITLE -->
                <div class="row justify-content-center article-title">
                    <p style="color: black; font-size: 50px">
                        {{ article.title }}
                    </p>
                </div>

                <!-- ARTICLE IMAGE -->
                <div class="row">
                    <img style="height: 100%; width: 100%; " :src="article.image" :alt="article.image" >
                </div>

                <!-- ARTICLE DATE -->
                <div class="row justify-content-end">
                    <div class="col">

                        <div class="row mt-3" v-if="user" >

                            <h3 class="ml-2 mr-2"> 
                                <i style="cursor: pointer" @click.prevent="like" v-if="likes.indexOf(String(user._id)) == -1" class="far fa-heart"></i> 
                                <i style="cursor: pointer" @click.prevent="like" v-else class="fas fa-heart"></i>
                                {{ likes.length }}
                            </h3>
                            
                        </div>

                    </div>

                    <div class="col-3">
                        <p class="mt-3 article-caps">
                            {{ new Date(article.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }}
                        </p>
                    </div>
                </div>

            </div>

            <!-- ARTICLE CONTENT -->
            <div class="row mx-auto mt-5">
                <p v-html="article.content">  </p>
            </div>

            <div class="row justify-content-end" v-if="user">
                    
                <div v-if="String(user._id) == String(article.author._id)">

                    <!-- EDIT ARTICLE BUTTON-->
                    <button @click="edit" class=" text-white article-caps mb-1" style="background-color: lightgrey; font-size: 18px;"> Edit </button>
                    
                    <!-- DELETE ARTICLE BUTTON-->
                    <button @click="deleteArticle" class=" text-white article-caps mb-1" style="background-color: lightgrey; font-size: 18px;"> Delete </button>

                </div>

            </div>

            <!-- ARTICLE TAG -->
            <hr style="margin-top: 0">
            <div class="row mx-auto">
                <button @click="searchTag(tag)" v-if="tag" v-for="tag in article.tag" type="button" class="btn-sm text-white article-caps m-2" style="background-color: lightgrey; font-size: 15px">{{ tag }}</button>
            </div>

        </div>


        <!-- AUDIO -->
        <div v-if="article.music">
            <audio autoplay>
                <source :src="article.music" type="audio/mpeg">
            </audio> 
        </div>

    </div>
    `
})