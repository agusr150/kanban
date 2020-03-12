Vue.component('testcomponent',{
  template : `
  <div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem incidunt maxime accusantium, culpa numquam blanditiis ex impedit at excepturi maiores, officiis placeat reprehenderit laboriosam distinctio. Dolore mollitia accusantium exercitationem asperiores.
    <div class="button">
      <button class="btn">Edit <i class="fa fa-pencil"></i></button>
      <button class="btn">Remove <i class="fa fa-trash"></i></button>
    </div>
  </div>`
});
var backlog = new Vue({
  el: '#component_backlog'
});



<template>

</template>
<script>
  import myComponent from 'my-component'
  export default {
    components: {
      myComponent
    }
    data () {
      return {}
    }
    ...
  }
</script>