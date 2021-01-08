<template>
  <div id="app">
    <h1>裏垢リコメンダー</h1>
    <div>
      <p>あなたのアカウント名は？</p>
      <input type="text" name="name">
      <p>あなたのアカウントIDは？</p>
      <input type="text" name="id" value="@">
      <p></p>
      <input type="radio" name="gender" value="male" checked>男性
      <input type="radio" name="gender" value="female">女性
      <p></p>
      <button>診断</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
