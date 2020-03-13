<template>

    <div class="app">
         <div class="error">{{error}}</div>
   
    <!--     Login FORM   -->
        <login v-if="login" ></login>
    
    <!--     Kanban LAYOUT   -->
        <div v-if="kanban_seen" class="kanban-layout" id="kanban_layout" >
            <div class="tombol">
                <button v-on:click="tomboladd" type="button" class="btn btn-primary" id="btn_add">Add Task</button>
                <button v-on:click="logout" type="button" class="btn btn-warning" id="btn_logout">Logout</button>
            </div>
            <backlogform :backlog="databacklog"></backlog>
            <productform :product="dataproduct"></product>
            <developmentform :development="datadevelopment"></development>
            <doneform :done="datadone"></done>   
        </div>

    <!-- Add -->
        <div v-if="add_task" id="modal">
        <form>
            <h2>Add Task</h2>
            <label >Title :</label>
            <input v-model="title" type="text" class="form-control" placeholder="input title">
            <label >Category :</label>
            <select v-model="category" class="custom-select">
            <option selected>Select category</option>
            <option>Backlog</option>
            <option>Product</option>
            <option>Development</option>
            <option>Done</option>
            </select>
            <label >Note:</label>
            <input v-model="note" type="text" class="form-control" placeholder="input notes if required">
            <button v-on:click="submitTask" type="submit" class="btn btn-primary">Add</button>
            <button v-on:click="cancelTask" type="button" class="btn btn-primary">Cancel</button>
        </form>
        </div>



    </div>
</template>

<script>
import axios from 'axios'
import login from './components/Login.vue'
import backlogform from './components/Backlog.vue'
import productform from './component/Product.vue'
import developmentform from './component/Development.vue'
import doneform from './component/Done.vue'
//import kanban from './components/Kanban.vue'

export default {
    name: 'app',
    components: {
        login,
        backlogform,
        productform,
        developmentform,
        doneform
    },
    data: function(){
        return  {
            login : false,
            kanban_layout :false,
            backlog : [],
            product : [],
            development : [],
            done : []
        }   
    },
    created() {
        let token= localStorage.getItem('token')
        if(token){
            console.log(token)
            this.login = true
        } else { 
            console.log(login)
            this.kanban_seen = true
        }
    },
    watch:{
        statusLogin: function(){
            if(kanban_seen === true){
                getData() 
            }
        }
    },
    methods: {
        getData: function(event){
            event.preventDefault()
            let token= localStorage.getItem('token')
            axios({
                method: "get",
                url: `${local}/kanbans`,
                headers: {
                    token: token
                }
            })
            .then(function(data){
                console.log(data.response)
                let result = data.response
                for (let i=0; i<result.length; i++){
                    if(result.category === 'backlog'){
                        this.backlog.push(result)
                    } else if (result.category === 'product'){
                        this.product.push(result)
                    } else if (result.category === 'development'){
                        this.development.push(result)
                    } else if (result.category === 'done'){
                        this.done.push(result)
                    }
                }
            })
            .catch(function(){
                console.log("fail")
                this.error = err.response.data
            })
        },

        tomboladd: function(){
            console.log('ok')
            this.add_task = true
            this.kanban_seen = false
        },

        cancelTask: function(){
            this.add_task = false
            this.kanban_seen = true
        },

        submitTask: function(event){
            event.preventDefault()
            let token = localStorage.getItem('token')
            console.log(token)
            this.add_task = false
            this.kanban_seen = true
            axios({
                method: "post",
                url: `${local}/kanbans`,
                headers: {
                    token: token
                },
                data: {
                    title: this.title,
                    category: this.category,
                    note: this.note
                }
            })
            .then(function(res){
                console.log("success")
                this.kanban_seen = true
            })
            .catch(function(err){
                console.log("fail")
                console.log(err.response.data)
                this.error = err.response.data
            })
        }
    }
}

</script>
