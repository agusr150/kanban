<template>
<div class="app">
     <!--     Login FORM   -->
        <login @statusToken="changeLayout" v-if="!token_seen" ></login>

    <!--     Kanban Layout   -->
        <div v-if="token_seen" >
                <div class="tombol">
                    <button v-on:click="showModal" type="button" class="btn btn-primary" id="btn_add">Add Task</button>
                    <h1>Kanban</h1>
                    <button v-on:click="logout" type="button" class="btn btn-warning" id="btn_logout">Logout</button>
                </div>
               
                <backlogform :backlog="backlog"></backlogform>
                 
        </div>

    <!--     Modal   -->
                <b-modal ref="my-modal" hide-footer title="Using Component Methods">
                    <div class="d-block text-center">
                        <h3>Hello From My Modal!</h3>
                    </div>
                    <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
                </b-modal>


</div>

</template>

<script>
let local='http://localhost:3000'
import axios from 'axios'
import login from './components/LoginRegister.vue'
import backlogform from './components/Backlog.vue'
// import productform from './component/Product.vue'
// import developmentform from './component/Development.vue'
// import doneform from './component/Done.vue'
export default {
    name: 'app',
    components: {
        login, 
        backlogform
        },
    data(){
        return {
            modal_seen: false,
            token_seen: false,
            token: null,
            backlog: [],
            product: [],
            development: [],
            done: []
        }
    },

    created: function(){
        this.token = localStorage.getItem('token')
        if (this.token){
            this.token_seen = true
            this.getData()
        } else {
            this.token_seen = false
        }
    },
    methods: {
        changeLayout: function(){
            this.token_seen = true
        },
        
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        
        logout: function(){
            localStorage.clear()
            this.token_seen = false
        },
        getData: function(){
           let token= localStorage.getItem('token')
           console.log(token)
            axios({
                method: "get",
                url: `${local}/kanbans`,
                headers: {
                    token: token
                }
            })
            .then((hasil)=>{
                console.log("success")
                let result = hasil.data
                for (let i=0; i<result.length; i++){
                    if(result[i].category === 'Backlog'){
                        this.backlog.push(result[i])
                    } else if (result[i].category === 'Product'){
                        this.product.push(result[i])
                    } else if (result[i].category === 'Development'){
                        this.development.push(result[i])
                    } else if (result[i].category === 'Done'){
                        this.done.push(result[i])
                    }
                }
                console.log(this.backlog)
            })
            .catch(function(){
                console.log("fail")
                this.error = err.response
            })
        },
        cancelTask: function(){
            
        }
        
    }

}

</script>