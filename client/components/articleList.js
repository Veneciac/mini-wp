Vue.component('article-list', {
    props: ['articles'],
    template: `
    <div>
        <!-- LOOPINGANYA DISINI -->
        <div v-if="articles.length > 0" class="card mt-3" v-for="(article, i) in articles">

            <div @click="detail(article)" style="cursor: pointer" class="card-body row">

                <div class="col-5">
                    <img style="height: 100%; width: 100%; " :src="article.image" :alt="article.image" >
                </div>

                <div class="col">
                    <div class="row article-title">
                        <h2 class="col" >{{ article.title }}</h2>
                        <p class="col-1" > {{ article.like.length }} </p>
                    </div>

                    <div class="row">
                        <small>{{ new Date(article.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }}</small>
                    </div>

                    <div class="row mt-2">
                        {{ article.briefDesc }}
                    </div>

                    <div class="row mt-3left: 0" >
                        <button v-for="tag in article.tag" v-if="tag != ''" type="button" class="badge badge-pill badge-secondary text-white article-caps m-2" style="background-color: lightgrey; font-size: 10px; ">{{ tag }}</button>
                    </div>

                    <div class="row author-info">
                        {{ article.author.name }}
                    </div>
                </div>
            </div>

        </div>

    </div>
    `,
    methods: {
        detail (val) {
            this.$emit('detail', val)
        }
    }
})