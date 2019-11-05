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
          <UserItem 
            :user="item"
            @change:edit="openFormEdit"
            @change:delete="deleteData"
          />
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
            <input type="radio" id="male" name="gender" v-model="gender" value="Male" class="custom-control-input">
              <label class="custom-control-label" for="male">Male</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="female" name="gender" v-model="gender" value="Female" class="custom-control-input">
              <label class="custom-control-label" for="female">Female</label>
            </div>
            <small v-show="errors.has('user.gender')" class="text-danger">{{ errors.first('user.gender') }}</small>
          </div>

          <div class="form-group col-md-6">
            <label>Is Active</label>
            <div class="custom-control custom-radio">
              <input type="radio" id="yes" name="isactive" value="1" v-model="isActive" class="custom-control-input">
              <label class="custom-control-label" for="yes">Yes</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="no" name="isactive" value="2" v-model="isActive" class="custom-control-input">
              <label class="custom-control-label" for="no">No</label>
            </div>
            <small v-show="errors.has('user.isactive')" class="text-danger">{{ errors.first('user.isactive') }}</small>
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
      edit: false,
      isActive: 1,
      gender: 'Male',
      id: null
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
      this.gender = "Male",
      this.isActive = '1'
      this.$validator.reset("user");
    },
    storeUser() {
      this.id ? this.updateUser(this.id) : this.createUser();
    },
    createUser() {
      this.$validator.validateAll("user").then(async result => {
        if (!result) return;
        this.$axios
          .post(`users`, {
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            gender: this.gender,
            is_active: this.isActive,
            address: this.address
          })
          .then(response => {
            if (response.status == 201) {
              this.$swal.fire(response.data.meta.message, "", "success");
              this.closeFormModal();
              this.getUsers();
            }
          })
          .catch(error => {
            let errObj = Object.assign({}, error)
            this.$swal.fire(errObj.response.data.meta.message, "", "warning");
          });
        });
      },
    updateUser(id) {
      this.$validator.validateAll('user').then(async result => {
        if (!result) return;
        this.$axios.put(`users/${id}`, {
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            gender: this.gender,
            is_active: this.isActive,
            address: this.address
          })
          .then(response => {
            this.getUsers();
            this.closeFormModal();
            this.$swal(
              'Saved!',
              'Successfully updated.',
              'success'
            )
          })
          .catch(e => {
            console.log(e);
          });
      });
    },
    openFormEdit(item) {
      this.edit = true;
      this.$refs['modal-user'].show();
      this.getDataEdit(item.id);
    },
    async getDataEdit(id) {
      let user = await this.users.find(item => item.id == id);
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.password = user.password;
      this.gender = user.gender;
      this.isActive = user.is_active;
      this.address = user.address;
      this.phone = user.phone;
    },
    deleteData(item) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$axios
            .delete(`users/${item.id}`)
            .then(response => {
              this.$swal("Deleted!", response.data.message, "success");
            })
            .catch(e => {
              console.log(e);
            })
            .then(() => {
              this.getUsers();
            });
        }
      });
    },
  }
}
</script>

<style>

</style>