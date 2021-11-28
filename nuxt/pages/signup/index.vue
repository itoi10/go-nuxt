<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">
        <div class="box">

          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-model="email"
                placeholder="Email"
                type="email"
                class="input is-info"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                v-model="password"
                placeholder="Password"
                type="password"
                class="input is-info"
              />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button
                class="button is-link"
                @click="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: "",
        password: "",
      }
    },
    methods: {
      signUp() {
        let user = {
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('signUp', user)
      }
    }
  }
</script>

<style>
</style>