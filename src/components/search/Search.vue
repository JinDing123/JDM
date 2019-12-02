<template>
  <div class="search-wrapper">
    <div class="form-inline">
      <div class="form-group">
        <select v-model="searchType" class="form-control">
          <option
            v-for="op in selectOptions"
            :value="op"
            :key="op"
          >{{op}}</option>
        </select>
      </div>
      <div class="form-group">
        <input 
            type="text" 
            class="form-control" 
            placeholder="关键词"
            v-model="searchKeyWords"
            @keyup.enter="searchList"
         />
      </div>
      <button class="btn btn-default" @click="searchList">查询</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  props: {
    selectOptions: Array
  },
  data () {
      return {
          searchKeyWords: '',
          searchType: this.selectOptions[0]
      }
  },
  methods: {
      searchList() {
          this.$emit('searchLists', {
              searchKeyWords: this.searchKeyWords,
              searchType: this.searchType
          })
      }
  },
};
</script>

<style lang="stylus" scoped>
.search-wrapper
    margin-bottom: 15px

</style>
