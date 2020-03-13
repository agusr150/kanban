
<template>
            <div class="box-container" style="background-color: grey" v-bind:task="done">
                <header class="category">Done</header>
                <div id="done" class="box-task">
                    <div v-for="list in done">
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
     props: ['datadone']
    data: function(){
        return {
            done : this.datadone
        }
    },
   

    
}

</script>