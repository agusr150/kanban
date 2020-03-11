
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
        developments: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue.js' },
            { text: 'Build Something Awesome' }
        ],
        login_seen: false,
        register_seen: false,
        kanban_seen: false,
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


        add_done: function(event){

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
                this.login_seen = false
                this.kaban_seen = true
                console.log(res.data.token)
                localStorage.setItem('token', res.data.token)
                this.login_seen = false
                this.kanban_seen = true
            })
            .catch (function(err){
                this.error = err
            })
        }



    },

    // created(){
    //     axios.post(`${local}/register`)

    // } 



})