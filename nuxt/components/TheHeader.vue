<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <nuxt-link
        class="navbar-item subtitle is-4"
        to="/"
      >
        YouTube Player
      </nuxt-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="field has-addons">
            <form action="/search" method="get">
              <div class="field has-addons">
                <div class="control">
                  <input name="q" type="text" placeholder="Search" class="input" />
                </div>
                <div class="control">
                  <button class="button">🔍</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// nuxt-linkはページ遷移に使用する。
// Vueのrouter-linkを拡張したもので同じように使うことができる。
</script>