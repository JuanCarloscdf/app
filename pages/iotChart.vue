<template>

    <card  type="chart" class="col-6">
        
        <div class="chart-area" style="height: 300px">
            <LineChart
            :key="counter" 
            style="height: 100%"
            :chartData="chartData" 
            :options="charOptions" 
            />
            
        </div>  
        <button @click="add()"></button>    
    </card>
    

  
</template>

<script>

export default {
    
    middleware: "authenticated",
    data(){
        return{
            counter:0,
            chartData:{
                labels:["jan","feb","mar","apr","may"],
                datasets:[
                    {
                    label:"numbers",
                    borderColor: "#edeef5",
                    backgroundColor: "#db6018",
                    borderWidth:  2,
                    pointBackgroundColor:"#dbd386",
                    pointRadius:2,
                    pointHoverBorderColor:"#53d468",
                    inflateAmount: 2,
                    pointHoverBackgroundColor:3, 
                    fill: true,

                    data:[100, 150, 300, 200, 150]
                    },
                    {
                    label:"trap",
                    borderColor: "#edbece",
                    backgroundColor: "#5de383",
                    borderWidth:  2, 
                    pointBackgroundColor:"#ba6413",
                    pointRadius:2,
                    pointHoverBorderColor:"#16693e",
                    pointHoverBackgroundColor:3, 
                    fill: false,

                    data:[110,30,150,40,180]
                    }
                 ],   
             },
            charOptions:{
              maintainAspectRatio:false,
              responsive: true,
              resizeDelay:0,
              tooltips:{
                  backgroundColor:"#e6bfaa",
                  titleFontColor:"#070a0a",
                  bodyFontColor:"#000000",
                  position: "nearest",
                  mode:"nearest",
                  intersect:0,
                  bodySpacing:4,
                  xPadding:20,
                  
              },
             },
        }
    },
    methods:{
        add(){
            var aux = Math.random()*100;
            var aux2 = Math.random()*100;
            this.chartData.labels.push(aux);
            this.chartData.datasets[0].data.push(aux);
            this.chartData.datasets[1].data.push(aux2);
            this.counter++;
        }    
    }  
}
</script>

<style>
    .title{
        color: "white",

    }
    .line-chart{
        width:90vw;
        height: 50vw;
    }

</style>