<template>
        <div>
            <div class="box-container" style="background-color: green" >
                <header class="category">Backlog</header>
                <div id="backlog" class="box-task">  
                    <div v-for="list in backlog" :key="list.id">
                        <div class="content">{{list.title}}</div>
                        <div class="button">
                            <button v-on:click="editTask(list.id, list.title, list.note)"  class="btn">Edit <i class="fa fa-pencil"></i></button>
                            <button v-on:click="deleteTask(list.id)" class="btn">Remove <i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <!--    Edit Form   -->
            <div v-if="add_backlog" id="modal">
                <form>
                    <h2>Edit Task</h2>
                    <label >Title :</label>
                    <input v-model="title" type="text" class="form-control" >
                    <label >Category :</label>
                    <select v-model="category" class="custom-select">
                        <option selected>Select category</option>
                        <option>Backlog</option>
                        <option>Product</option>
                        <option>Development</option>
                        <option>Done</option>
                    </select>
                    <label >Note:</label>
                    <input v-model="note" type="text" class="form-control">
                    <button v-on:click="submitEdit" type="submit" class="btn btn-primary">Submit</button>
                    <button v-on:click="cancelEdit" type="button" class="btn btn-primary">Cancel</button>
                </form>
            </div>
        </div>
</template>

<script>
import axios from 'axios'

let local='http://localhost:3000'
export default { 
    props: ['databacklog'],
    data: function(){
        return {
            backlog : this.databacklog,
            add_backlog : false
        }
    },

    method: {
        deleteTask: function(id){
            axios({
                method: "delete",
                url: `${local}/kanbans/${id}`,
                headers: {
                    token: token
                }
            })
            .then(function(res){
                console.log("delete success")
            })
            .catch(function(err){
                console.log("fail")
                this.error = err.response.data
            })
        },

        editTask: function(){
              this.add_backlog = true
        },

        submitEdit: function(){
            let token = localStorage.getItem('token')
            axios({
                method: "post",
                url: `${local}/kanbans/`,
                headers: {
                    token: token
                },
                data: {
                    title: this.title,
                    category: this.category,
                    note: this.note
                }
            })
        }
    }
    
   
}

</script>