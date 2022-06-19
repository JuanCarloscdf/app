<template>
    <div>
    <!-- NEW ALARM FORM -->
    <div class="row">
      <div class="col-sm-12">
        <card v-if="$store.state.devices.length > 0">
          <div slot="header">
            <h4 class="card-title">
              Exportar Datos 
            </h4>
          </div>

          <div class="row">
            <div class="col-3">
              <el-select
                required
                class="select-success"
                placeholder="Variable"
                v-model="selectedWidgetIndex"
                style="margin-top: 25px;"
                title="sadasdas"
              >
                <el-option
                  v-for="(widget, index) in $store.state.selectedDevice.template.widgets"
                  :key="index"
                  class="text-dark"
                  :value="index"
                  :label="widget.variableFullName"
                ></el-option>
              </el-select>
            </div>
           
            <div class="col-3" >
            
            <base-input
            required 
            type="number"
            v-model="chartTimeAgo"

            label="Periodo en minutos"
            
             ></base-input>  
            </div>
          </div>

          <br /><br />

          <div class="row pull-right">
            <div class="col-12">
              <base-button
                @click="getData()"
                native-type="submit"
                type="primary-dark-color"
                class="mb-3"
                
                size="lg"
                :disabled="selectedWidgetIndex == null"
              >
                Cargar Datos
              </base-button>
              <ExportExcel
                :sheetData="data"
                :columns="columns"
                :filename="filename"
                :sheetname="sheetname"
                
                >
                Guardar Excel
              </ExportExcel>
            </div>
          </div>
        </card>
        <card v-else>
          debe crear una alarma
        </card>
      </div>
      
      <div>
          {{data}}
      </div>
    </div>

    <!-- ALARMS TABLE -->

   <!--  <Json :value="$store.state.selectedDevice"></Json> -->
  </div>
   
</template>

<script>
import ExportExcel from '~/components/ExportExcel.vue';
import Vue from "vue"
Vue.use(ExportExcel);

import { Select, Option } from "element-ui";
import { Table, TableColumn } from "element-ui";

export default {
middleware: "authenticated",
components: {
    [Option.name]: Option,
    [Select.name]: Select,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
data(){
    return{
        selectedWidgetIndex: null,
        data:[],
        chartTimeAgo:12000,
        filename:"filename",
        sheetname:"sheetname",
        
        auxData:{
          value:'',
          time:''
        },
        columns : [
                       {
                        label: "chart data",
                        field: "value",
                    },
                    {
                        label: "data time",
                        field: "time",
                    },
                ],
    }
},
mounted(){

},
methods:{
    getData() { 
                console.log(this.$store.state.selectedDevice.dId);
                console.log(this.$store.state.selectedDevice.template.widgets[this.selectedWidgetIndex].variable);
                this.filename=this.$store.state.selectedDevice.template.widgets[this.selectedWidgetIndex].variableFullName
                console.log(this.chartTimeAgo);      
                const axiosHeaders = {
                    headers: {
                        token: $nuxt.$store.state.auth.token,
                    },
                    params: { dId: this.$store.state.selectedDevice.dId, variable: this.$store.state.selectedDevice.template.widgets[this.selectedWidgetIndex].variable, chartTimeAgo: this.chartTimeAgo }
                }

                this.$axios.get("/get-small-charts-data", axiosHeaders).then(res => {
                        
                        this.data = [];
                        const data = res.data.data;
                        console.log(res.data);

                        data.forEach(element => {
                          this.auxData={
                            value:'',
                            time:''
                          }
                          this.auxData.value=element.value;
                          this.auxData.time=element.time;  
                          const { ...auxCopy} = this.auxData;
                          this.data.push(auxCopy);  
                        });

                        this.isMounted = true;
                        

                        return data;

                    })
                    .catch(e => {

                        console.log(e)
                        return;

                    });

            },

}
}
</script>

<style>

</style>