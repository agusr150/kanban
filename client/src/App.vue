<template>
<div class="app">
     <!--     Login FORM   -->
        <login @statusToken="changeLayout" v-if="!token_seen" ></login>

    <!--     Kanban Layout   -->
        <div v-if="token_seen" class="kanban-layout">
                <div class="tombol">
                    <button v-on:click="showModal" type="button" class="btn btn-primary" id="btn_add">Add Task</button>
                    <h1 style="color: white">Kanban</h1>
                    <button v-on:click="logout" type="button" class="btn btn-warning" id="btn_logout">Logout</button>
                </div>
               
               <div class="kanban">
                <backlogform :backlog="backlog" @fromChild="refreshKanban"></backlogform>
                 

               </div>
        </div>

    <!--     Modal   -->
        <b-modal ref="my-modal" hide-footer hide-header no-close-on-backdrop>
        <div class="error">{{error}}</div>
        <h2>Add Task</h2>
        <form>
            <div class="el-form">
                Title :
                <input v-model="form.title" type="text" class="form-control" placeholder="input title">
            </div>
            <div class="el-form">
                Category :
                <select v-model="form.category" class="custom-select">
                    <option selected>Select category</option>
                    <option>Backlog</option>
                    <option>Product</option>
                    <option>Development</option>
                    <option>Done</option>
                </select>
            </div>
            <div class="el-form">
                Note:
                <textarea v-model="form.note" type="text" class="form-control" rows="3" placeholder="input notes if required"></textarea>
            <div>
            <div>
                <b-button class="mt-3" variant="outline-primary" block @click="submitModal">Submit Task</b-button>
                <b-button class="mt-2" variant="outline-warning" block @click="hideModal">Cancel</b-button>
            </div>
         </form>
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
            error: '',
            modal_seen: false,
            token_seen: false,
            token: null,
            backlog: [],
            product: [],
            development: [],
            done: [],
            form: {
                title:'',
                category: null,
                note:''
            }
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
        refreshKanban(){
            this.initial()
            this.getData()
        },
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.error=''
            this.$refs['my-modal'].hide()
        },
        initial() {
            this.backlog= [],
            this.product= [],
            this.development= [],
            this.done= []
        },
        submitModal(event){
            event.preventDefault();
            console.log(this.form)
            let token= localStorage.getItem('token')
            axios({
                method: "post",
                url: `${local}/kanbans`,
                headers: {
                    token: token
                },
                data: this.form
            })
            .then(data=>{
                console.log("success")
                this.initial()
                this.getData()
                this.hideModal()
            })
            .catch(err=>{
                console.log("fail")
                this.error = err.response.data
            })
        },
        logout(){
            localStorage.clear()
            this.token_seen = false
        },
        getData(){
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
            })
            .catch(function(){
                console.log("fail")
                this.error = err.response.data
            })
        }   
    }

}

</script>