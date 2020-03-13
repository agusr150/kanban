<template>
            <div class="box-container" style="background-color: red" v-bind:task="development">
                <header class="category">Development</header>
                <div id="development" class="box-task">
                    <div v-for="list in development">
                        <div class="content">{{list.title}}</div>
                        <div class="button">
                            <button class="btn">Edit <i class="fa fa-pencil"></i></button>
                            <button class="btn">Remove <i class="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>

</template>

<script>
import axios from 'axios'

export default{
    props: ['datadevlopment'],
    data: function(){
        return {
            development : this.datadevelopment
        }
    },
    
    

    
}

</script>