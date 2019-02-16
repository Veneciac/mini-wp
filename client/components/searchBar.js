Vue.component('search-bar', {
    data () {
        return {
            query: '',
            tag: ''
        }
    },
    methods: {
        search () {
            this.$emit('search', this.query)
        },
        searchTag () {
            this.$emit('search-tag', this.tag)
        }
    },
    template: `
    <div class="row">
        <div class="col mt-3" style="right: 0;">
            <form class="form-inline my-2 my-lg-0">
                <input @keyup="search" v-model="query" class="form-control" 
                style="
                background-color: white; 
                width: 100%;
                border-color: transparent;
                box-shadow: 0px 0px 0px lightgrey;
                -webkit-transition:  box-shadow .3s ease-out;
                   box-shadow: .8px .9px 3px lightgrey;"
                type="text" placeholder="Search By Title / Author">
            </form>
        </div>
        <div class="col mt-3" style="right: 0;">
            <form class="form-inline my-2 my-lg-0">
                <input @keyup="searchTag" v-model="tag" class="form-control" 
                style="
                background-color: white; 
                width: 100%;
                border-color: transparent;
                box-shadow: 0px 0px 0px lightgrey;
                -webkit-transition:  box-shadow .3s ease-out;
                   box-shadow: .8px .9px 3px lightgrey;"
                type="text" placeholder="Search By Tag">
            </form>
        </div>
    </div>
    `
})