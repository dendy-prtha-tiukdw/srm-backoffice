<template>
<div>
  <form class="form-inline well inputs" >
      <div class="form-group">
          <label class="control-label">Tahun Ajaran: </label>
          <input v-model="tahunAjaran" type="text" class="form-control" placeholder="2020/2021">
      </div>
      <div class="form-group">
          <select v-model="selectedSemester" class="form-control">
              <option value="" selected disabled>Semester</option>
              <option value="Gasal" selected="selected">Gasal</option>
              <option value="Genap">Genap</option>
          </select>
      </div>
      <br>
      <button class="btn btn-primary"
      @click="submitInput">
            Submit
      </button>
  </form>

  <table>
    <tr>
      <th>Nama Matakuliah</th>
      <th>Grup</th>
      <th>Detail Matakuliah</th> 
    </tr>
    <tr>
    <!-- <tr v-for="(,idx) in " :key="idx"> -->
      <td>Desain Game</td>
      <td>C</td>
      <td><a href="#">Detail Matakuliah</a></td>
    </tr>
    <tr>
    <!-- <tr v-for="(,idx) in " :key="idx"> -->
      <td>Desain Game</td>
      <td>C</td>
      <td><a href="#">Detail Matakuliah</a></td>
    </tr>
  </table>
</div>
</template>

<script>
    import { mapState } from "vuex";
    import { DAFTAR_KELAS } from "@/store/actions.type";
    import JwtService from "@/common/jwt.service";
    export default {
        name: "daftar-kelas",
            data () {
                return {
                    tahunAjaran: '' ,
                    selectedSemester: '',
                }
            },
        // components: {
        //   HelloWorld
        // }
        methods: {
          submitInput(){
            // console.log({ tahunAjaran: this.tahunAjaran, selectedSemester: this.selectedSemester });          
            this.$gAuth
              .geta
              .then(authCode => {
                console.log(authCode);
                this.$store
                  .dispatch(DAFTAR_KELAS, this.selectedSemester, this.tahunAjaran);
              })
              .catch(error => {
                console.log(error);
              });
                }
         },
        computed: {
          ...mapState({
            errors: state => state.auth.errors
          })
        }
    };
</script>
 
<style>

.inputs{
  display: inline-block;
  margin-top: 40px;
  margin-left: 40%;
  margin-bottom: 20px;
}

.inputs>button{
  width: 100%;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 80%;
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
</style>