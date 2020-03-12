
<template>
<div v-show="register_seen" id="register" class="register">
        <h1>Register Form</h1>
        <form id="register-form">
            <div class="form-group">
              <label for="email-reg">Email address</label>
              <email-input v-model="email_register" type="email" class="form-control" id="email-reg" placeholder="register your email"></email-input>
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
            <button v-on:click="submitRegister" type="submit" class="btn btn-primary">Submit</button>
            <button v-on:click="backLogin" type="button" class="btn btn-primary" id="btn-login">Back To Login</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: {
        email_register: '',
        password_register: '',
        password_register2: '',
        register_seen: true,
        login_seen: false
    },
    methods: {
        backLogin: function(){
            this.error=''
            this.register_seen = false
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

}


</script>