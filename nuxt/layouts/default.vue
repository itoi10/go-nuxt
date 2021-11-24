<template>
  <div id="app">
    <!-- <TheHeader /> -->

    <div class="column">
      <!-- <TheSidebar /> -->

      <div class="column content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
  // Nuxtではlayoutsディレクトリは以下に設置したファイルを画面レイアウトとして利用できる

</script>

<style scoped>
  /* scoped 現在のコンポーネントの要素にのみ適用  */

  #app {
    min-height: 100vh;
    background: #FAFAFA;
  }

  .columns {
    min-height: 100vh;
  }
</style>