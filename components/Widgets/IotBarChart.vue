<template>

    <card type="chart">

        <template slot="header">

            <h5 class="card-category pull-right">{{getTimeAgo((nowTime - time) / 1000)}} ago </h5>
  
            <h5 class="card-category">{{ config.selectedDevice.name }} - {{ config.variableFullName }}</h5>

        </template>

       <div class="chart-area" style="height: 300px">
            <LineChart
            :key="counter" 
            style="height: 100%"
            :chartData="chartData" 
            :options="charOptions" 
            />
            
        </div>  
        

    </card>


</template>


<script>
    export default {
        name: 'barchart',
        props: ['config'],
        data() {
            return {
                receivedTime: 0,
                time: Date.now(),
                nowTime: Date.now(),
                isMounted: false,
                counter:0,
                    topic:"",

                chartData:{
                    labels:[],
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

                        data:[]
                        },
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

            };
        },
        
        mounted() {
        this.topic = this.config.userId + '/' + this.config.selectedDevice.dId + '/' + this.config.variable;
        this.$nuxt.$on(this.topic + "/sdata", this.procesReceivedData);       
        this.getChartData()
        this.getNow();
        this.chartData.datasets[0].label = this.config.variableFullName;

        },
        beforeDestroy() {
            this.$nuxt.$off(this.topic + "/sdata");
        },
        methods: {
         
            getChartData() {

                if (this.config.demo) {
                    this.chartData.labels= ['pantalones','camisas','medias','corbatas'];
                    this.chartData.datasets[0].data= [10,15,20,5];
                    this.isMounted = true;
                    this.counter++;
                    return;
                }

 
                const axiosHeaders = {
                    headers: {
                        token: $nuxt.$store.state.auth.token,
                    },
                    params: { dId: this.config.selectedDevice.dId, variable: this.config.variable, chartTimeAgo: this.config.chartTimeAgo }
                }

                this.$axios.get("/get-small-charts-data", axiosHeaders).then(res => {
                        
                        this.chartData.datasets[0].data = [];
                        this.chartData.labels = [];
                        const data = res.data.data;
                        console.log(res.data);

                        data.forEach(element => {
                            this.chartData.labels.push(element.inmsg);
                            this.chartData.datasets[0].data.push(element.value);
                        });

                        this.isMounted = true;

                        return data;

                    })
                    .catch(e => {

                        console.log(e)
                        return;

                    });

            },

            procesReceivedData(data) {
                try {
                this.chartData.labels=[];
                this.chartData.datasets[0].data=[];
                this.time = Date.now();
                this.chartData.labels=data.inmsg;
                this.chartData.datasets[0].data=data.values; 
                
                this.counter++;
                setTimeout(() => {
                    if(data.save==1){
                        this.getChartData();
                        this.counter++;
                    }  
                }, 1000); 
                    
                } catch (error) {
                   console.log(error); 
                }
               
            },

            getNow() {
                this.nowTime = Date.now();
                setTimeout(() => {
                    this.getNow();
                }, 1000);
            },

            getTimeAgo(seconds) {

                if (seconds < 0) {
                    seconds = 0;
                }

                if (seconds < 59) {
                    return seconds.toFixed() + " secs";
                }

                if (seconds > 59 && seconds <= 3600) {
                    seconds = seconds / 60;
                    return seconds.toFixed() + " min";
                }

                if (seconds > 3600 && seconds <= 86400) {
                    seconds = seconds / 3600;
                    return seconds.toFixed() + " hour";
                }

                if (seconds > 86400) {
                    seconds = seconds / 86400;
                    return seconds.toFixed() + " day";
                }


            },
        }
    };
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