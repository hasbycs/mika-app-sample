<template>
  <section>
    <div class="card border-0 h-100">
      <div class="card-body shadow-sm border rounded mt-1">
        <div class="row">
          <div class="col-3 col-md-4">
            <span v-if="isLoading" class="shimmer-loading shimmer-image"></span>
            <img
              v-else
              :src="defaultAvatar"
              :alt="defaultAvatar"
              class="img-profile"
              width="100px"
              height="100px"
            />
          </div>
          <div class="col-8 col-md-6">
            <div class="row">
              <div class="col-12">
                <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
                <span v-else class="font-weight-bold">{{ user.name }}</span>
              </div>
              <div class="col-12">
                <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
                <p v-else>{{ user.email }}</p>
              </div>
              <div class="col-12" >
                <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
                <p v-else>{{ user.phone }}</p>
              </div>
              <div class="col-12" >
                <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
                <p v-else>{{ user.gender }}</p>
              </div>
              <div class="col-12" >
                <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
                <p v-else>{{ user.address }}</p>
              </div>
            </div>
          </div>
          <div class="col-1">
            <span v-if="isLoading" class="shimmer-loading round-edge skeleton-loading"></span>
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
}
</script>

<style>

</style>