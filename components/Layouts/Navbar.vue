<template>
  <section>
    <b-navbar id="header" class="header bg-primary mb-0 mdk-header--shadow-show mdk-header--shadow"
      data-effects="waterfall blend-background" data-fixed data-condenses>
      <div class="head">
        <div class="navbar navbar-expand-sm navbar-primary bg-primary pr-0 pr-md-16pt" id="navbar" data-primary>
          <nuxt-link to='/' class="navbar-brand">
            <span class="d-none d-md-block text-white">Mika-App</span>
          </nuxt-link>
          <ul class="nav navbar-nav ml-auto d-none d-sm-flex">
            <li class="nav-item">
              <nuxt-link to="/users" class="nav-link text-white"><h4>Users List</h4></nuxt-link>
            </li>
            <li class="nav-item float-right" @click="logout">
              <nuxt-link to="/login" class="nav-link">Logout</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </b-navbar>
  </section>
</template>

<script>
  export default {
    components: {
      // MenuLayar
    },
    data() {
      return {
        password:null,
        cpassword:null,
        changePassword: false
      }
    },
    methods: {
      async logout() {
        await this.$auth.logout();
        this.$router.push('/login')
      }
    }
  }

</script>