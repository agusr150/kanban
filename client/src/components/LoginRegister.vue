<template>
    <div>
        <!--     Login FORM   -->
        <div v-if="login_seen" id="login" class="login-form">
            <form id="login-form">
            <div class="error">{{error}}</div>
                <h1>Login Form</h1>
                <div class="form-group">
                    <label for="email-login">Email address</label>
                    <input v-model="email_login" type="email" class="form-control" id="email-login" placeholder="input your email">
                </div>
                <div class="form-group">
                    <label for="password-login">Password</label>
                    <input v-model="password_login" type="password" class="form-control" id="password-login" placeholder="input your password">
                </div>
                <div>
                    <button v-on:click="submitLogin" type="submit" class="btn btn-primary mb-3">Login</button><br>
                    Please register if you have never been registered yet or using Google Sign In!
                    <button v-on:click="backRegister" type="button" class="btn btn-primary" id="btn-register">Register</button>
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                </div>
            </form>
        </div> 

        <!--     Register FORM   -->
        <div v-if="register_seen" id="register" class="register-form">
            <form id="register-form">
            <div class="error">{{error}}</div>
                <h1>Register Form</h1>
                <div class="form-group">
                    <label for="email-reg">Email address</label>
                    <input v-model="email_register" type="email" class="form-control" id="email-reg" placeholder="register your email"></input>
                    <small  id="email" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="password-reg">Password</label>
                    <input v-model="password_register" type="password" class="form-control" id="password-reg" placeholder="register your new password">
                </div>
                <div class="form-group">
                    <label for="repassword-reg">Re-enter Your Password</label>
                    <input v-model="password_register2" type="password" class="form-control" id="repassword-reg" placeholder="re-type your password">
                </div>
                <div>
                    <button v-on:click="submitRegister" type="submit" class="btn btn-primary">Submit</button>
                    <button v-on:click="backLogin" type="button" class="btn btn-primary" id="btn-login">Back To Login</button>
                </div>
            </form>
        </div>

    </div>
</template>


<script>
import axios from 'axios'
let local='http://localhost:3000'
export default {
    data: function(){
        return {
            error:'',
            email_login: '',
            password_login: '',
            email_register: '',
            password_register: '',
            password_register2: '',
            login_seen: true,
            register_seen: false
        }
    },
  
    methods: {
        backRegister(event){
            event.preventDefault();
            this.error=''
            this.login_seen = false
            this.register_seen = true
        },
        backLogin(event){
            event.preventDefault();
            this.error=''
            this.register_seen = false
            this.login_seen = true
        },
        submitRegister(event){
            event.preventDefault()
            if (this.password_register !== this.password_register2){
                this.error="password must be same"
            } else {
                axios.post(`${local}/user/register`, {
                    email: this.email_register,
                    password: this.password_register
                })
                .then((res)=>{
                    console.log("success")
                    this.error=''
                    this.email_register='',
                    this.password_register='',
                    this.password_register2='',
                    this.register_seen = false
                    this.login_seen = true
                })
                .catch((err)=>{
                    console.log(err.response)
                    this.error = err.response.data
                })
            }   
        },
        submitLogin(event){
            event.preventDefault()
            axios.post(`${local}/user/login`, {
                email: this.email_login,
                password: this.password_login
            })
            .then ((res)=>{
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                this.$emit('statusToken', true)
            })
            .catch ((err)=>{
                console.log(err.response)
                this.error = err.response.data
            })
        },
    }


}

</script>
