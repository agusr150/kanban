
<template>
            <div class="box-container" style="background-color: yellow">
                <header class="category">Product</header>
                <div id="product" class="box-task">
                    <div v-for="list in product">
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
    props: ['dataproduct'],
    data: function(){
        return {
            product : this.dataproduct
        }
    },
     
}

</script>