<script>
/* import { defineComponent } from '@vue/composition-api' */

import {Bar, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Bar,
    mixins:[reactiveProp],
    props:["chartData", "options"],
    mounted(){
        this.renderChart(this.chartData, this.options);

    },

    
};
</script>
