Vue.component('about-me', {
    props: ['user', 'article'],
    methods: {
        edit () {
            this.$emit('edit')
        }
    },
    template: `
    <div class="row ">
        <div class="card mt-5" style="width: 100%;">
            <div class="card-body col" style="width: 100%;">
                <div class="row article-title justify-content-center">
                    <h3 v-if="article"> {{ article.author.name }}</h3>
                    <div class="row" v-else>
                        <h3 class="col article-title " @click.prevent="edit" style=" cursor: pointer"> {{ user.name }} </h3>
                        <!-- <p class="col-2" > <i  class="fas fa-pencil-alt"></i> </p> -->
                    </div>
                </div>
                <div class="row ml-3 mr-3">
                    <img v-if="article" style="height: 100%; width: 100%; " :src="article.author.image" :alt="article.author.image" >
                    <img v-else style="height: 100%; width: 100%;" :src="user.image" :alt="user.image" >
                </div>

                <div class="row mx-4 mt-3">
                    <p v-if="article"> {{ article.author.aboutMe }} </p>
                    <p v-else> {{ user.aboutMe }} </p>
                </div>
            </div>
        </div>
    </div>
    `
})