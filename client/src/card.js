Vue.component('card',{
    template : `
    <div class="card">
        <div class="content">${this.title}
            <div class="button">
            <button class="btn">Edit <i class="fa fa-pencil"></i></button>
            <button class="btn">Remove <i class="fa fa-trash"></i></button>
            </div>
        </div>
    </div>`,
    data: function(){
        return{
        title: []
        }
    },
    methods:{
        getData: function(){
            let token = localStorage.getItem('token')
            console.log(token)
            axios({
                method: "get",
                url: `${local}/kanbans`,
                headers: {
                    token: token
                },
            })
            .then(function(data){
                console.log("success")
                let tasks = data.response
                for (let i=0; i<tasks.length; i++){
                    this.title = tasks[i]
                }
               
            })
            .catch(function(err){
                console.log("fail")
                console.log(err.response.data)
                this.error = err.response.data
            })
        }
    }
});

var backlog = new Vue({
    el: '#backlog'
});

var product = new Vue({
    el: `#product`
})

var development = new Vue({
    el: `#development`
})

var done = new Vue({
    el: `#done`
})



