<template>
  <section class="">
    <div class="container mt-4">
      <div class="row mb-3">
        <h2>List Users</h2>
      </div>
      <div class="card border-0 h-100 mb-3">
        <div class="card-body border shadow-sm">
          <div class="col">
            <Pagination
              :per-page="limit"
              :per-page-options="perPageOptions"
              :current-page="currentPage"
              :total-items="totalItem"
              :total-page="totalPage"
              @change:page="(val) => currentPage = val"
              @change:per-page="(val) => limit = val"
            />
          </div>
        </div>
      </div>
      <div class="d-flex flex-row-reverse bd-highlight mb-3">
        <b-btn variant="info" @click="openFormModal()">Add User</b-btn>
      </div>
      <div class="row">
        <div class="col-lg-6 mb-2"
            v-for="(item, i) in listToShow"
            :key="isLoadingUsers ? i : item.id">
          <UserItem :user="item"/>
        </div>
      </div>
    </div>

    <b-modal ref="modal-user" size="lg" hide-footer no-close-on-backdrop :title="editorTitle" @hide="closeFormModal">
      <div class="modal-body">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Name</label>
            <input
              type="text"
              class="form-control"
              v-model="name"
              name="name"
              data-vv-scope="user"
              v-bind:class="{ 'border border-danger': errors.has('user.name')}"
              v-validate="'required'"
              placeholder="name..."
            />
            <small v-show="errors.has('user.name')" class="text-danger">{{ errors.first('user.name') }}</small>
          </div>
          <div class="form-group col-md-6">
            <label>Email</label>
            <input
              type="text"
              class="form-control"
              v-model="email"
              name="email"
              data-vv-scope="user"
              v-bind:class="{ 'border border-danger': errors.has('user.email')}"
              v-validate="'required'"
              placeholder="email..."
            />
            <small v-show="errors.has('user.email')" class="text-danger">{{ errors.first('user.email') }}</small>
          </div>
          <div class="form-group col-md-6">
            <label>Phone</label>
            <input
              type="text"
              class="form-control"
              v-model="phone"
              name="phone"
              data-vv-scope="user"
              v-bind:class="{ 'border border-danger': errors.has('user.phone')}"
              v-validate="'required'"
              placeholder="phone..."
            />
            <small v-show="errors.has('user.phone')" class="text-danger">{{ errors.first('user.phone') }}</small>
          </div>
          <div class="form-group col-md-6">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              name="password"
              data-vv-scope="user"
              v-bind:class="{ 'border border-danger': errors.has('user.password')}"
              v-validate="'required'"
              placeholder="password..."
            />
            <small v-show="errors.has('user.password')" class="text-danger">{{ errors.first('user.password') }}</small>
          </div>
          <div class="form-group col-md-6">
            <label>Gender</label>
            <div class="custom-control custom-radio">
            <input type="radio" id="male" name="gender" value="Male" class="custom-control-input">
              <label class="custom-control-label" for="male">Male</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="female" name="gender" class="custom-control-input">
              <label class="custom-control-label" for="female">Female</label>
            </div>
            <small v-show="errors.has('user.password')" class="text-danger">{{ errors.first('user.password') }}</small>
          </div>

          <div class="form-group col-md-6">
            <label>Is Active</label>
            <div class="custom-control custom-radio">
            <input type="radio" id="yes" name="isactive" class="custom-control-input">
              <label class="custom-control-label" for="yes">Yes</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="no" name="isactive" class="custom-control-input">
              <label class="custom-control-label" for="no">No</label>
            </div>
            <small v-show="errors.has('user.password')" class="text-danger">{{ errors.first('user.password') }}</small>
          </div>

          <div class="form-group col-md-12">
            <label>Address</label>
            <textarea
              type="text"
              class="form-control"
              v-model="address"
              name="address"
              data-vv-scope="user"
              v-bind:class="{ 'border border-danger': errors.has('user.address')}"
              v-validate="'required'"
              placeholder="address..."
            />
            <small v-show="errors.has('user.address')" class="text-danger">{{ errors.first('user.address') }}</small>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <b-button class="form-btn secondary" @click="closeFormModal()">Cancel</b-button>
        <b-button class="btn form-btn" variant="success" @click="storeUser()">Save</b-button>
      </div>
    </b-modal>

  </section>
</template>

<script>
export default {
  components: {
    UserItem: () => import("@@/components/Users/UserItem"),
    Pagination: () => import("@@/components/Pagination"),
  },
  data() {
    return {
      isLoadingUsers: true,
      limit: 10,
      totalPage: 0,
      users: [],
      totalItem: 0,
      perPageOptions: [10, 20, 30, 40],
      currentPage: 1,
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      edit: false
    }
  },
  created() {
    this.getUsers();
  },
  computed: {
    listToShow() {
      return this.isLoadingUsers
        ? new Array(this.limit).fill(null)
        : this.users;
    },
    editorTitle() {
      if (!this.edit) {
        return "Add User";
      } else {
        return `Edit User`;
      }
    },
  },
  watch: {
    limit: function(val) {
      this.totalPage = 0;
      this.getUsers();
    },
    currentPage: function(val) {
      this.getUsers({
        page: val
      });
    }
  },
  methods: {
    getUsers({ page = 1 } = {}) {
      this.isLoadingUsers = true
      return new Promise((resolve, reject) => {
        const promises = []
        this.$axios.get(`/users?page=${page}&limit=${this.limit}`)
          .then(r => {
            if (Array.isArray(r.data.data)) {
              promises.push(...r.data.data);
              this.users = promises;
              this.totalItem = r.data.meta.total
              this.totalPage = r.data.meta.lastPage
            }
          })
          .catch(e => {})
          .finally(() => {
            resolve(promises);
            this.isLoadingUsers = false
          })
        })
    },
    openFormModal() {
      this.$refs['modal-user'].show();
      this.edit = false;
    },
    closeFormModal() {
      this.$refs['modal-user'].hide();
      this.edit = false;
      this.name = "",
      this.email = "",
      this.phone = "",
      this.address = "",
      this.$validator.reset("user");
    },
  }
}
</script>

<style>

</style>