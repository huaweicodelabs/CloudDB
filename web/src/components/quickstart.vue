<template>
  <div class="quickstart">
    <div class="initDB">
      <button @click="initDB">initCloudDB</button>
    </div>
    <div class="optionDB">
      <button @click="queryAllBooks">queryAllBooks</button>
      <button @click="upsertBooks">upsertBooks</button>
      <button @click="deleteBook">deleteBook</button>
    </div>
  </div>
</template>

<script>
import {
  initCloudDB,
  executeQueryAllBooks,
  executeUpsertBooks,
  executeDeleteBooks
} from './clouddbcode'

export default {
  name: 'quickstart',
  methods: {
    initDB: function () {
      initCloudDB()
    },
    queryAllBooks: function () {
      executeQueryAllBooks()
    },
    upsertBooks: function () {
      executeUpsertBooks()
    },
    deleteBook: function () {
      executeDeleteBooks()
    }
  }
}
</script>

<style scoped>
.initDB button {
  margin: 20px;
}
.optionDB button {
  margin: 20px;
}
</style>
