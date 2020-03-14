<template>
        <div>
            <div class="box-container" style="background-color: green" >
                <header class="category">Backlog</header>
                <div id="backlog" class="box-task">  
                    <div v-for="list in backlog" :key="list.id" class="card" style="background: lightgreen">
                        <div class="content">{{list.title}}</div>
                        <div class="subcontent">note: {{list.note}}</div>
                        <div class="button">
                            <button v-on:click="editTask(list.id, list.title, list.category, list.note)"  class="btn btn-success" >Edit <i class="fa fa-pencil"></i></button>
                            <button v-on:click="deleteTask(list.id)" class="btn btn-success">Remove <i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>

<!--     Modal  Edit -->
        <b-modal ref="my-modal" hide-footer hide-header no-close-on-backdrop>
        <div class="error">{{error}}</div>
        <h2>Edit Task</h2>
        <form>
            <div class="el-form">
                Title :
                <input v-model="form.title" type="text" class="form-control">
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
                <b-button class="mt-3" variant="outline-primary" block @click="submitEdit">Submit Update</b-button>
                <b-button class="mt-2" variant="outline-warning" block @click="hideModal">Cancel</b-button>
            </div>
         </form>
        </b-modal>

    <!--     Modal  Delete -->
        <b-modal ref="del-modal" hide-footer hide-header no-close-on-backdrop>
         <div class="error">{{error}}</div>
        <div>Are you sure to delete this task? </div>
         <div>
                <b-button class="mt-3" variant="outline-danger" block @click="submitDelete">Confirm Delete</b-button>
                <b-button class="mt-2" variant="outline-warning" block @click="hideModal">Cancel</b-button>
        </div>

    
        </div>

</template>

<script>
import axios from 'axios'
let local='http://localhost:3000'
export default {
    props: ["backlog"],
    data(){
        return{
            error: '',
            form: {
                id: '',
                title: '',
                category: null,
                note: ''
            }
        }
    },
    methods: {
        deleteTask(id){
            this.$refs['del-modal'].show()
            this.form.id=id
        },
        submitDelete(event){
            event.preventDefault();
            console.log(this.form.id)
            let token= localStorage.getItem('token')
            axios({
                method: "delete",
                url: `${local}/kanbans/`+this.form.id,
                headers: {
                    token: token
                },
            })
            .then(data=>{
                console.log('succes delete')
                this.hideModal()
                this.$emit('fromChild')
            })
            .catch(err=>{
                console.log('fail')
                this.error = err.response.data
            })
        },
        editTask(id, title, category, note){
            this.$refs['my-modal'].show()
            this.form.id = id
            this.form.title = title
            this.form.category = category
            this.form.note = note
        },
        hideModal() {
            this.error=''
            this.$refs['my-modal'].hide()
            this.$refs['del-modal'].hide()
        },
        submitEdit(event){
            event.preventDefault()
            let token= localStorage.getItem('token')
            axios({
                method: "put",
                url: `${local}/kanbans/`+this.form.id,
                headers: {
                    token: token
                },
                data: this.form
            })
            .then(data=>{
                this.hideModal()
                this.$emit('fromChild')
            })
             .catch(err=>{
                console.log('fail')
                this.error = err.response.data
            })
        }
    }
}

</script>