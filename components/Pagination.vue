<template>
  <section>
    <div class="row">
      <div class="float-left mr-5 mt-2">
        <div class="input-group">
          <div class="input-group-prepend">
            <label class="input-group-text">Showing</label>
          </div>
          <div class="input-group-prepend">
            <label
              class="input-group-text"
              style="background-color:#1C00ff00"
            >{{ startIndex || '...'}} to {{lastIndex || '...' }}</label>
          </div>
          <div class="input-group-prepend">
            <label class="input-group-text">of</label>
          </div>
          <div class="input-group-prepend">
            <label
              class="input-group-text"
              style="background-color:#1C00ff00"
            >{{ totalItems >= 0 ? totalItems : '...' }}</label>
          </div>
        </div>
      </div>
      <div v-if="showPerPage" class="float-left mt-2">
        <div class="input-group">
          <div class="input-group-prepend">
            <label class="input-group-text">Item Per Page</label>
          </div>
          <select class="form-control" :value="perPage" @change="onChangePerPage">
            <option
              v-for="opt in perPageOptions"
              :key="opt"
              :value="opt"
              :selected="opt == perPage"
            >{{ opt }}</option>
          </select>
        </div>
      </div>
      <div class="col float-right mt-2">
        <nav class="row float-right">
          <ul class="pagination">
            <li class="page-item">
              <a
                class="page-link"
                :class="{'bg-light' : currentPage === 1}"
                @click="onClickPrevious"
                href="#"
                tabindex="-1"
              >Previous</a>
            </li>
            <li class="page-item" v-for="(page, i) in paginationToShow" :key="i">
              <a
                v-if="typeof page === 'number'"
                :disabled="totalItems == 0"
                :class="{'page-link': true, 'bg-primary': page === currentPage && totalItems > 0}"
                @click="onClickPage(page)"
              >
                {{ page }}
                <span class="sr-only">(current)</span>
              </a>

              <a v-else-if="page === 'ellipsis'" class="page-link">&hellip;</a>
            </li>
            <li class="page-item">
              <a
                :class="{'bg-light' : currentPage === totalPage}"
                @click="onClickNext"
                class="page-link"
                href="#"
              >Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    perPage: {
      type: [String, Number],
      default: 4
    },
    perPageOptions: {
      type: Array,
      default: () => [4, 8, 12]
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 1
    },
    pageCount: {
      type: Number,
      default: 5
    },
    totalItems: {
      type: Number,
      default: 0
    },
    showPerPage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    startIndex() {
      if (this.totalItems >= 0) {
        return `${Math.min(
          1 + (this.currentPage - 1) * this.perPage,
          this.totalItems
        )}`;
      }
      return null;
    },
    lastIndex() {
      if (this.totalItems >= 0) {
        return `${
          this.currentPage == this.totalPage
            ? this.totalItems
            : this.currentPage * this.perPage
        }`;
      }
      return null;
    },
    paginationToShow() {
      if (this.currentPage && this.totalPage && this.pageCount) {
        const pages = [];
        const offset = Math.floor(this.pageCount / 2);
        let i = 1;
        while (i <= this.currentPage + offset || i <= this.pageCount) {
          if (i < this.totalPage) {
            pages.push(i);
          }
          if (pages.length > this.pageCount) {
            pages.shift();
          }
          i++;
        }
        if (pages.length && pages[0] != 1) {
          pages.shift();
          pages.unshift(1);
        }
        pages.push(this.totalPage);
        pages.forEach((num, j, arr) => {
          const next = arr[j + 1];
          const prev = arr[j];
          if (
            typeof next === "number" &&
            typeof prev === "number" &&
            next - prev > 1
          ) {
            arr.splice(j + 1, 0, "ellipsis");
          }
        });
        return pages;
      } else {
      }
      return ["ellipsis"];
    }
  },
  methods: {
    onChangePerPage(e) {
      this.$emit("change:per-page", e.target.value);
    },
    onClickPrevious() {
      if (this.currentPage > 1) {
        this.$emit("change:page", this.currentPage - 1);
      }
    },
    onClickNext() {
      if (this.currentPage < this.totalPage) {
        this.$emit("change:page", this.currentPage + 1);
      }
    },
    onClickPage(page) {
      this.$emit("change:page", page);
    }
  }
};
</script>

<style scopes>
</style> 