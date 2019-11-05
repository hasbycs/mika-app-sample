<template>
  <section>
    <div class="card border-0 h-100">
      <div class="card-body shadow-sm border rounded mt-1">
        <div class="row">
          <div class="col-md-8 col-sm-6">
            <div class="row">
              <div class="col-12 mb-3">
                <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
                <span v-else class="font-weight-bold">{{ user.name }}</span>
              </div>
              <div class="col-12">
                <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
                <p v-else><span class="text-secondary">email : </span>{{ user.email }}</p>
              </div>
              <div class="col-12" >
                <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
                <p v-else><span class="text-secondary">Phone : </span>{{ user.phone }}</p>
              </div>
              <div class="col-12" >
                <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
                <p v-else><span class="text-secondary">Gender : </span>{{ user.gender }}</p>
              </div>
              <div class="col-12" >
                <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
                <p v-else><span class="text-secondary">Address : </span>{{ user.address }}</p>
              </div>
              <div class="col-12" >
                <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
                <p v-else><span class="text-secondary">is Active : </span>
                  <span v-if="user.is_active" class="text-success">yes</span>
                  <span v-else class="text-danger">No</span>
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
            <span v-else class="float-right"> 
              <b-btn variant="info" size="sm" @click="openModalEdit(user)">Edit </b-btn>
              <b-btn variant="danger" size="sm" @click="deleteUser(user)">Delete </b-btn>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      defaultAvatar: "/assets/images/default-profile.png"
    };
  },
  created() {
    console.log('def', this.defaultAvatar)
  },
  computed: {
    isLoading() {
      return this.user == null;
    }
  },
  methods: {
    openModalEdit(item) {
      this.$emit("change:edit", item);
    },
    deleteUser(item) {
      this.$emit("change:delete", item);
    }
  }
}
</script>