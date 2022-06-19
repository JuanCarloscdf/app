<template>

    <card id="app">
    <div slot="header">
      <h4 class="card-title">
        {{ config.selectedDevice.name }} - {{ config.variableFullName }}
      </h4>
    </div>
    <h1 style="color:#0af2b8; text-align: center" class="card-title" > {{value}} {{config.unit}} </h1>
    
        
        <BaseProgress :value= fixedValue  :key="counter"></BaseProgress>
        
        
    
    
  </card>
  
  
</template>

<script>

export default {
  name:'iotbar',
  props: ['config'],
  data() {
    return {
      value: 0,
      fixedValue: 1,
      counter:0,  
    };
  },
  //////////////////
        
  mounted(){
    //userId/dId/uniquestr/sdata
    const topic = this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata";
    console.log(topic);
    this.$nuxt.$on(topic, this.processReceivedData)
    this.fixedValue = 0;
  },

  beforeDestroy(){
    this.$nuxt.$off(this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata")
  },
  methods: {

    processReceivedData(data){
      try{
        
        console.log("received");
        console.log(data);
        this.value =data.value;
        this.fixedValue = Math.trunc((data.value*100)/this.config.max);
        this.counter++;
      }catch (error){
        console.log(error);
      }
        
    },
      
  }
};


</script>


