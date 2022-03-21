<template>
    <div>
        <el-table :data="$store.state.notifications">
            <el-table-column label="#" min-width="50" align="center">
            <div slot-scope="{ row, $index }">
              {{ $index + 1 }}
            </div>
          </el-table-column>


          <el-table-column prop="dId" label="Device Id"></el-table-column>

          <el-table-column prop="variableFullName" label="Variable"></el-table-column>

          <el-table-column prop="condition" label="Cond" min-width="60"></el-table-column>

          <el-table-column prop="value" label="Umbral"></el-table-column>

          <el-table-column prop="payload.value" label="valor"></el-table-column>
 
          <el-table-column prop="time" label="fecha y hora" min-width="100" align="center">
                <template slot-scope="scope">
                    <span >{{unixToDate(scope.row.time)}}</span>
                </template>
          </el-table-column>

        </el-table>
        <Json :value="$store.state.notifications"></Json> 
    </div>  
</template>
<script>
import { Table, TableColumn } from "element-ui";
import { Select, Option } from "element-ui";

export default{
    
    middleware: "authenticated",
    components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select
  },
    mounted(){
        this.$store.dispatch("getNotifications");
        this.$store.dispatch("getDevices");
        const notif = this.$store.state.notifications[0];
        console.log("dasdasda");
        console.log(notif);
    },
    methods:{

      unixToDate(ms) {
        var d = new Date(parseInt(ms)), 
          yyyy = d.getFullYear(),
          mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
          dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
          hh = d.getHours(),
          h = hh,
          min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
          ampm = 'AM',
          time;

        if (hh > 12) {
          h = hh - 12;
          ampm = 'PM';
        } else if (hh === 12) {
          h = 12;
          ampm = 'PM';
        } else if (hh == 0) {
          h = 12;
        }

        // ie: 2013-02-18, 8:35 AM	
        time = dd + '/' + mm + '/' + yyyy + ', ' + h + ':' + min + ' ' + ampm;

        return time;
      },
    },
    
}
</script>
