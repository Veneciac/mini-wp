Vue.component('article-detail', {
    props: ['article', 'user'],
    methods: {
        edit () {
            this.$emit('edit-article', this.article)
        },
        deleteArticle () {
            this.$emit('delete-article', this.article)
        },
        searchTag (tag) {
            this.$emit('search-tag', tag)
        }
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
                    <p class="mt-4 article-caps">
                        {{ new Date(article.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }}
                    </p>
                </div>

            </div>

            <!-- ARTICLE CONTENT -->
            <div class="row mx-auto mt-5">
                <p v-html="article.content">  </p>
            </div>

            <div class="row justify-content-end">

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

    </div>
    `
})