<template> 
    <div>

         <card type="chart">

        <template slot="header">

            <h5 class="card-category pull-right">{{getTimeAgo((nowTime - time) / 1000)}} ago </h5>

          
            <h5 class="card-category">{{ config.selectedDevice.name }} - {{ config.variableFullName }} y {{config.variableFullName2}}</h5>

            <h3 class="card-title">
                <i class="fa " :class="[config.icon]" aria-hidden="true"
                    style="font-size: 30px;"></i>
                <span>{{value.toFixed(config.decimalPlaces)}} [{{config.unit}}] {{ "/" }} {{value2.toFixed(config.decimalPlaces)}} [{{config.unit2}}]</span>
            </h3>

        </template>

        <div class="chart-area" style="height: 300px">
            <highchart style="height: 100%" v-if="isMounted" :options="chartOptions"/>
        </div>

    </card>

    </div>


   


</template>


<script>
    export default {
        name: 'rtnumberchart',
        props: ['config'],
        data() {
            return {
                receivedTime: 0,
                value: 0,
                value2: 0,
                time: Date.now(),
                nowTime: Date.now(),
                isMounted: false,
                topic:"",

                chartOptions: {
                    credits: {
                        enabled: false
                    },
                    chart: {
                        renderTo: 'container',
                        defaultSeriesType: 'line',
                        backgroundColor: 'rgba(0,0,0,0)',
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            style: {
                                color: '#ffffff'
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            style: {
                                color: '#d4d2d2',
                                font: '11px Trebuchet MS, Verdana, sans-serif'
                            }
                        }
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false,
                            },
                            pointStart: 2010
                        }
                    },
                    series: [{
                        name: '',
                        data: [],
                        color: "#12db69"
                        },
                        {
                        name: '',
                        data: [],
                        color: "#ad5918"
                        },
                    ],
                    legend: {
                        itemStyle: {
                            color: '#d4d2d2'
                        }
                    },
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
                },

            };
        },
        watch: {
            config: {
                immediate: true,
                deep: true,
             handler() {
                    setTimeout(() => {
                        this.value = 0;
                        this.value2=0;
                        this.$nuxt.$off(this.topic + "/sdata");
                        this.topic = this.config.userId + '/' + this.config.selectedDevice.dId + '/' + this.config.variable;
                        this.$nuxt.$on(this.topic + "/sdata", this.procesReceivedData);
                        this.chartOptions.series[0].data = [];
                        this.getChartData();
                        this.chartOptions.series[0].name = this.config.variableFullName + " " + this.config.unit;
                        this.updateColorClass();
                        window.dispatchEvent(new Event('resize'));
                    }, 300);
                }
            }
        },
        mounted() {


            this.getNow();
            this.updateColorClass();
            this.topic = this.config.userId + '/' + this.config.selectedDevice.dId + '/' + this.config.variable;
            this.$nuxt.$on(this.topic + "/sdata", this.procesReceivedData);

        },
        beforeDestroy() {
            this.$nuxt.$off(this.topic + "/sdata");
        },
        methods: {

           

            getChartData() {

                if (this.config.demo) {
                    this.chartOptions.series[0].data = [[1606659071668, 22], [1606659072668, 27], [1606659073668, 32], [1606659074668, 7]];
                    this.chartOptions.series[1].data = [[1606659071668, 23], [1606659072668, 7], [1606659073668, 3], [1606659074668, 74]];
                    this.isMounted = true;
                    return;
                }

 
                const axiosHeaders = {
                    headers: {
                        token: $nuxt.$store.state.auth.token,
                    },
                    params: { dId: this.config.selectedDevice.dId, variable: this.config.variable, chartTimeAgo: this.config.chartTimeAgo }
                }

                this.$axios.get("/get-small-charts-data", axiosHeaders).then(res => {
                        
                        this.chartOptions.series[0].data = [];
                        this.chartOptions.series[1].data = [];
                        const data = res.data.data;
                        console.log(res.data);

                        data.forEach(element => {
                            var aux = [];
                            var aux2=[];
                            aux.push(element.time + (new Date().getTimezoneOffset() * 60 * 1000 * -1));
                            aux2.push(element.time + (new Date().getTimezoneOffset() * 60 * 1000 * -1));
                            aux.push(element.value);
                            aux2.push(element.value2);    
                            this.chartOptions.series[0].data.push(aux);
                            this.chartOptions.series[1].data.push(aux2);
                        });

                        this.isMounted = true;
                        

                        return data;

                    })
                    .catch(e => {

                        console.log(e)
                        return;

                    });

            },
            updateColorClass() {
                
                this.chartOptions.series[0].name = this.config.variableFullName + " " + this.config.unit;
                this.chartOptions.series[1].name = this.config.variableFullName2 + " " + this.config.unit2;
            },
           

            procesReceivedData(data) {
                try {
                    this.time = Date.now();
                this.value = data.value;
                this.value2 = data.value2;
                setTimeout(() => {
                    if(data.save==1){
                        this.getChartData();
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
<style></style>