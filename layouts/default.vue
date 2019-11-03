<template>
    <div class="mdk-header-layout js-mdk-header-layout">
        <div class="mdk-header-layout__content page-content ">
          <Navbar />
          <nuxt />
          <!-- <Footer/> -->
        </div>
    </div>
</template>

<script>
import Navbar from '@@/components/Layouts/Navbar'
import Footer from '@@/components/Layouts/Footer'

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
      return {

      }
  },
}
</script>
