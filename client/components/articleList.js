Vue.component('article-list', {
    props: ['articles'],
    template: `
    <div>
        <!-- LOOPINGANYA DISINI -->
        <div  class="card mt-3" v-for="(article, i) in articles.slice().reverse()">

            <div @click="detail(article)" style="cursor: pointer" class="card-body row">

                <div class="col-5">
                    <img style="height: 100%; width: 100%; " :src="article.image" :alt="article.image" >
                </div>

                <div class="col">
                    <div class="row article-title">
                        <h2 >{{ article.title }}</h2>
                    </div>

                    <div class="row">
                        <small>{{ new Date(article.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }}</small>
                    </div>

                    <div class="row mt-2">
                        {{ article.briefDesc }}
                    </div>

                    <div class="row mt-3left: 0" v-if="tag != ''" v-for="tag in article.tag">
                        <button type="button" class="badge badge-pill badge-secondary text-white article-caps m-2" style="background-color: lightgrey; font-size: 10px; ">{{ tag }}</button>
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