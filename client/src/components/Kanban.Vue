
<template>
    <div v-show="kanban_seen" class="kanban-layout" id="kanban_layout" >
        <div class="logout">
          <button v-on:click="logout" type="button" class="btn btn-warning" id="btn_logout">Logout</button>
        </div>
        <div class="kanban">
          <div class="box-container" style="background-color: green;">
            <header class="category">Backlog</header>
            <div class="box-task">
              <div class="card">
                <div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem incidunt maxime accusantium, culpa numquam blanditiis ex impedit at excepturi maiores, officiis placeat reprehenderit laboriosam distinctio. Dolore mollitia accusantium exercitationem asperiores.</div>
                <div class="button">
                  <button class="btn"><i class="fa fa-trash"></i></button>
                  <button class="btn"><i class="fa fa-pencil"></i></button>
                </div>
              </div>
            </div>
            <footer class="add">
              <button v-on:click="add_backlog" type="button" class="btn btn-outline-dark" id="add_backlog" data-toggle="modal" data-target="#modal-edit">
                +Add Card
              </button>
            </footer>
          </div>
          <div class="box-container" style="background-color: yellow;">
            <header class="category">Product</header>
            <div class="box-task">
            </div>
            <footer class="add">
              <button v-on:click="add_product" type="button" class="btn btn-outline-dark" id="add_product" data-toggle="modal" data-target="#modal-edit">
                +Add Card
              </button>
            </footer>
          </div>
          <div class="box-container" style="background-color: red;">
            <header class="category">Development</header>
            <div class="box-task">
              <div class="card" v-for="title in developments">
              {{title.text}}  
              </div>
            </div>
            <footer class="add">
              <button v-on:click="add_development"type="button" class="btn btn-outline-dark" id="add_development" data-toggle="modal" data-target="#modal-edit">
                +Add Card
              </button>
            </footer>
          </div>
          <div class="box-container">
            <header class="category">Done</header>
            <div class="box-task">
            </div>
            <footer class="add">
              <button v-on:click="add_done" type="button" class="btn btn-outline-dark" id="add_done" data-toggle="modal" data-target="#modal-edit">
                +Add Card
              </button>
            </footer>
          </div>
        </div>
    </div>
</template>

<script>


</script>