Vue.component('recent-post', {
    props: ['articles'],
    data () {
        return {
            sortedArticle: []
        }
    },
    methods: {
        detail (val) {
            this.$emit('detail', val)
        },
        sort () {
            this.articles.sort(function(a, b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        }
    },
    template: `
    <div class="row">

        <div class="card mt-5">
            <div class="card-body col">
                <div class="row article-title justify-content-center">
                    <h2>Recent Post</h2>
                </div>

                <!-- RECENT POSTS ARTICLE -->
                <div @click.prevent="detail(article)" class="row" v-for="(article, i) in articles" v-if="i < 3">
                    <div class="col mt-2" style="padding-right: 10px; padding-left:1rem">
                        <img style="height: 100%; width: 100%; " :src="article.image" :alt="article.image" >
                    </div>
                    <div class="col mt-2" style="padding: 0">
                        <h5 class="article-title" style="color: black"> {{ article.title }}</h5>
                        <p class="crop"> {{ article.briefDesc }} </p>
                    </div>
                </div>

            </div>
        </div>

    </div>
    `
})