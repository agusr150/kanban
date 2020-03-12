
<template>
<div>
    <div v-if="mauLogin" id="login" class="login" >
        <form id="login-form">
            <h1>Login Form</h1>
            <div class="form-group">
              <label for="email-login">Email address</label>
              <input v-model="email_login" type="email" class="form-control" id="email-login" placeholder="input your email">
            </div>
            <div class="form-group">
              <label for="password-login">Password</label>
              <input v-model="password_login" type="password" class="form-control" id="password-login" placeholder="input your password">
            </div>
            <button v-on:click="submitLogin" type="submit" class="btn btn-primary mb-3">Login</button><br>
            Please register if you have never been registered yet or using Google Sign In!
            <button v-on:click="backRegister" type="button" class="btn btn-primary" id="btn-register">Register</button>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
          </form>
    </div>

    <div v-else id="register" class="register">
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
</div>
</template>

<script>
import axios from 'axios'
export default {
    data:{
        mauLogin:true
    },
    methods: {
        backLogin: function(){
            this.error=''
            this.mauLogin = false
        }
    }
}

</script>