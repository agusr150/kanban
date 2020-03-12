<template>

    <div class="app">
         <div class="error">{{error}}</div>
   
    <!--     Login FORM   -->
        <login></login>
    
    <!--     Kanban LAYOUT   -->
 

    </div>
</template>

<script>
import axios from 'axios'

//import register from './components/Register.vue'
import login from './components/Login.vue'
//import kanban from './components/Kanban.vue'

export default {
    name: 'app',
    components: {
        login
        //kanban
    }
   
    
}

</script>
