Vue.component('form-add-article', {
    components: {
        wysiwyg: vueWysiwyg.default.component
    },
    data () {
        return {
            title: '',
            category: '',
            briefDesc: '',
            content: '',
            temp: '',
            tag: [],
            image: '',
            imageUrl: '',
        }
    },
    methods: {
        close () {
            this.$emit('close-add-article')
        },
        addArticle () {
            let data = new FormData();

            data.append('image', this.image);
            data.append('title', this.title);
            data.append('category', this.category);
            data.append('briefDesc', this.briefDesc);
            data.append('content', this.content);
            data.append('tag', this.tag);


            axios({
                method: 'post',
                url: `${url}/articles`,
                data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.token
                }
            })
            .then( ({ data }) => {
                this.$emit('push-article', data)
            })
            .catch(err => {
                console.error(err)
            })
  
        },
        pushTag() {
            this.tag.push(this.temp)
            this.temp = ''
        },
        removeTag (name) {
            this.tag = this.tag.filter(el => el !== name )
        },
        handleFileUpload(){
            this.imageUrl = URL.createObjectURL(this.$refs.file.files[0]);
            this.image = this.$refs.file.files[0];
        },
    },
    template: `
        <div class="card mt-3">
            <div class="card-body row">
                <form style="width: 100%" @submit.prevent="addArticle" method="post" class="ml-3 mr-3">
                    <fieldset>
                        <h1 class="article-title text-center" style="color: grey"> 
                            <i class="fas fa-genderless"></i>
                            Write
                            <i class="fas fa-genderless"></i>
                        </h1>

                        <div class="form-group">
                            <label>Title</label>
                            <input required type="text" class="form-control" v-model="title" placeholder="Enter article title">
                        </div>

                        <div class="form-group">
                            <label>Category</label>
                            <input required type="text" class="form-control" v-model="category" placeholder="Enter article category">
                        </div>

                        <div class="form-group">
                            <label>Brief Description</label>
                            <input type="text" class="form-control" v-model="briefDesc" placeholder="Enter brief description about the article">
                        </div>

                        <wysiwyg v-model="content"></wysiwyg>
                        <small> please input image down below </small>

                        <div class="form-group mt-2">
                            <label >Tag</label>
                            <div class="row">
                            <input style="width: 350px" type="text" class="form-control ml-3 mr-2" v-model="temp" placeholder="tag">
                            <button @click.prevent="pushTag" style="background-color: #f4f4f4" type="button" class="btn-sm btn-secondary"> <h6 >Add tag</h6></button>
                            </div>
                        </div>

                        <br>

                        <div v-if="tag">
                            <h4> My Tag :</h4>
                            <span @click.prevent="removeTag(i)" class=" m-1 p-2 badge badge-pill badge-primary" v-for="i in tag" > {{ i }}</span>
                        </div>
                        <br>

                        <div class="form-group">
                            <label for="exampleInputFile">File input</label>
                            <input type="file" @change.prevent="handleFileUpload" class="mt-3" id="file" ref="file"></input>
                        </div>

                        <div v-if="imageUrl" >
                            <img class="img-art" :src="imageUrl" alt="image" >
                        </div>

                        <div class="row justify-content-end">
                            <button type="submit" class="btn btn-primary ml-2">Submit</button>
                            <button @click="close" type="button" style="background-color: #e0e0e0" class="btn ml-2">Close</button>
                        </div>

                    </fieldset>
                </form>
            </div>
        </div>`
})