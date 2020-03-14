<template>
        <div>
            <div class="box-container" style="background-color: green" >
                <header class="category">Backlog</header>
                <div id="backlog" class="box-task">  
                    <div v-for="list in backlog" :key="list.id" class="card" style="background: lightgreen">
                        <div class="content">{{list.title}}</div>
                        <div class="subcontent">note: {{list.note}}</div>
                        <div class="button">
                            <button v-on:click="editTask(list.id, list.title, list.note)"  class="btn btn-success" >Edit <i class="fa fa-pencil"></i></button>
                            <button v-on:click="deleteTask(list.id)" class="btn btn-success">Remove <i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>

    
        </div>

</template>

<script>
import axios from 'axios'
let local='http://localhost:3000'
export default {
    props: ["backlog"],
    methods: {
        editTask: function(id, title, note){
            
        },

        submitTask: function(event){
            event.preventDefault();
            axios({
                method: "put",
                url: `${local}/kanbans/`+id,
                headers: {
                    token: token
                }
            })
        }
    }
}

</script>