<template>
  <section>
    <div class="div navbar"> </div>
    <b-navbar fixed="top" id="header" class="header bg-primary mb-0 mdk-header--shadow-show mdk-header--shadow"
      data-effects="waterfall blend-background" data-fixed data-condenses>
      <div class="head">
        <div class="navbar navbar-expand-sm navbar-primary bg-primary pr-0 pr-md-16pt" id="navbar" data-primary>
          <nuxt-link to='/' class="navbar-brand">
            <span class="d-none d-md-block">Transnet</span>
          </nuxt-link>
          <nav class="nav navbar-nav ml-auto flex-nowrap">
            <div class="nav-item dropdown d-sm-flex ml-16pt">
              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <h6 style="cursor:pointer;" class="dropdown-header" @click="change_password()">Change Password</h6>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" @click.prevent="logout">Logout</a>
              </div>
            </div>
            <div class="nav-item dropdown dropdown-notifications dropdown-full-xs">
              <div class="dropdown-menu dropdown-menu-right">
                <div class="list-group list-group-flush">
                  <a href="#" class="list-group-item list-group-item-action">
                    <small class="text-muted list-group-item-meta">3 min ago</small>
                    <div class="media">
                      <div class="media-left align-self-center">
                        <i class="material-icons md-2 icon--left text-danger">account_circle</i>
                      </div>
                      <div class="media-body align-self-center">
                        <p class="mb-1 lh-1">Your profile information has not been synced
                          correctly.</p>
                      </div>
                    </div>
                  </a>
                  <div class="list-group-item list-group-item-action">
                    <small class="text-muted list-group-item-meta">5 hrs ago</small>
                    <div class="media">
                      <div class="media-left align-self-center">
                        <i class="material-icons md-2 icon--left text-success">group_add</i>
                      </div>
                      <div class="media-body align-self-center">
                        <p class="mb-1 lh-1"><a href="#" class="flex-inline">Adrian. D</a> wants
                          to join you.</p>
                      </div>
                    </div>
                  </div>
                  <a href="#" class="list-group-item list-group-item-action">
                    <small class="text-muted list-group-item-meta">1 day ago</small>
                    <div class="media">
                      <div class="media-left align-self-center">
                        <i class="material-icons md-2 icon--left text-warning">storage</i>
                      </div>
                      <div class="media-body align-self-center">
                        <p class="mb-1 lh-1">Your deploy was successful.</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <ul class="nav navbar-nav ml-auto d-none d-sm-flex">
            <li class="nav-item">
              <nuxt-link to="/login" class="nav-link">Login</nuxt-link>
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