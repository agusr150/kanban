
let local='http://localhost:3000'

var app = new Vue({
    el: '#app',
    data: {
        message: 'example: hello vue',
        error:'',
        email_login: '',
        password_login: '',
        email_register: '',
        password_register: '',
        password_register2: '',
        title:'',
        category:'',
        note:'',
        developments: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue.js' },
            { text: 'Build Something Awesome' }
        ],
        login_seen: false,
        register_seen: false,
        kanban_seen: false,
        add_form: false,
        add_task: false,
    },
    created() {
        let token= localStorage.getItem('token')
        if(token){
            console.log(token)
            this.kanban_seen= true
        } else { 
            console.log(login)
            this.login_seen = true
        }
    },

    methods: {
        backLogin: function(){
            this.error=''
            this.register_seen = false
            this.login_seen = true
        },
        backRegister: function(){
            this.error=''
            this.register_seen = true
            this.login_seen = false
        },
        logout: function(){
            localStorage.removeItem("token")
            this.kanban_seen = false
            this.login_seen = true
        },

        submitRegister: function(event){
            event.preventDefault()
            if (this.password_register !== this.password_register2){
                this.error="password must be same"
            } else {
                axios.post(`${local}/user/register`, {
                    email: this.email_register,
                    password: this.password_register
                })
                .then(function(res){
                    console.log("success")
                    this.error=''
                    this.register_seen = false
                    console.log(this.register_seen)
                    this.login_seen = true
                })
                .catch(function(err){
                    console.log(err)
                    this.error = err
                })
            }   
        },

        submitLogin: function(event){
            event.preventDefault()
            axios.post(`${local}/user/login`, {
                email: this.email_login,
                password: this.password_login
            })
            .then (function(res){
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                this.login_seen = false
                this.kanban_seen = true
            })
            .catch (function(err){
                this.error = err
            })
        },

        add: function(){
            console.log('ok')
            this.add_task = true
            this.kanban_seen = false 
        },

        cancelTask: function(){
            this.add_task = false
            this.kanban_seen = true
        },


        submitTask: function(event){
            event.preventDefault()
            let token = localStorage.getItem('token')
            console.log(token)
            this.add_task = false
            this.kanban_seen = true
            axios({
                method: "post",
                url: `${local}/kanbans`,
                headers: {
                    token: token
                },
                data: {
                    title: this.title,
                    category: this.category,
                    note: this.note
                }
            })
            .then(function(res){
                console.log("success")
            })
            .catch(function(err){
                console.log("fail")
                console.log(err.response.data)
                this.error = err.response.data
            })
            
        },


        //addtask



    },

  



})