<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类" width="240"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope" width = "220">
        <el-button type="text" size="medium" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="text" size="medium" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default{
  data(){
    return {
      items:[]
    }
  },
  methods:{
    async fetch(){
      const res = await this.$http.get('rest/categories')
      this.items = res.data
    },
    async remove(row){
        this.$confirm(`是否删除分类 ${row.name}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          await this.$http.delete(`rest/categories/${row._id}`)
          this.fetch()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
  },
  created(){
    this.fetch()
  }
  
}
</script>
