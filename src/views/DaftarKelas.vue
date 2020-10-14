<template>
<table>
  <tr>
    <th>Nama Matakuliah</th>
    <th>Detail Kelas</th> 

  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
  </tr>
</table>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "daftar-kelas",
        // components: {
        //   HelloWorld
        // }
        methods: {},
        computed: {
            ...mapState({
            errors: state => state.auth.errors
            })
        }
    }
</script> 
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 80%;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;

}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>>