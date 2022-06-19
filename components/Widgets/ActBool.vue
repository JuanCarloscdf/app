<template>
  <card>
    <div slot="header" :key="counter">
      <h4 class="card-title">
        {{ config.selectedDevice.name }} - {{ config.variableFullName }}
      </h4>
      <h4 style="color:#0af2b8; text-align: center" class="card-title" >Limite : {{umbral}}  </h4>
      <h4 style="color:#e38024; text-align: center" class="card-title" >Condiciòn : {{config.condition}} </h4>
      <h4 style="color:#4d93e3; text-align: center" class="card-title" >Fecha : {{fecha}} </h4>
      <h4 style="color:#4d93e3; text-align: center" class="card-title" >Hora : {{hora}} </h4>
      <h4 style="color:#c24e3a; text-align: center" class="card-title" >Dato : {{value}} </h4>
      <base-input type=number v-model="umbral"></base-input>
    
    </div>
        
        <i
            class="fa "
            :class="[config.icon, getIconColorClass()]"
            style="font-size: 80px"
            
        ></i>
  </card>
</template>

<script>
export default {
  props: ['config'],
  data() {
      
    return {
      umbral:0,
      value: 0,
      lastValue: 0,
      fecha: "fecha",
      hora:"",
      sending: false,
      topic:"",
      counter:0,

    };
  },
  //////////////////
          
  mounted(){
    //userId/dId/uniquestr/sdata
    const topic = this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata";
    console.log(topic);
    this.$nuxt.$on(topic, this.processReceivedData)
    this.getIconColorClass();
    this.umbral=this.config.umbral; 
  },
  beforeDestroy(){
    this.$nuxt.$off(this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata")
  },
  methods: {

    processReceivedData(data){
      try{
        console.log("received");
        console.log(data);
        this.value = data.value;
        var hoy = new Date();
        this.fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        this.hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        this.counter++;
        console.log(this.config.condition);
        this.getIconColorClass()
        if ( this.config.condition == "igual"){
            if(data.value == this.umbral){this.sendValue(); this.sending=true;}else{this.sending=false;}
        }
        if ( this.config.condition == "mayor"){
            if(data.value > this.umbral){this.sendValue();this.sending=true;}else{this.sending=false;}
        }
        if ( this.config.condition == "mayorigual"){
            if(data.value >= this.umbral){this.sendValue();this.sending=true; }else{this.sending=false;}
        }
        if ( this.config.condition == "menor"){
            if(data.value < this.umbral){ this.sendValue();this.sending=true;}else{this.sending=false;}
        }
        if ( this.config.condition == "menorigual"){
            if(data.value <= this.umbral){this.sendValue();this.sending=true; }else{this.sending=false;}
        }
        if ( this.config.condition == "distinto"){
            
        if(data.value != this.umbral){this.sendValue();this.sending=true; }else{this.sending=false;}
        }

      }catch (error){
        console.log(error);
      }
        
    },

    sendValue() {

    

        const toSend = {
            topic: this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/actdata",
            msg: {
                value: this.config.message
            }
        };

        console.log(toSend);
        this.$nuxt.$emit('mqtt-sender', toSend);
    },
      
    getIconColorClass() {
      if (!this.sending) {
        return "text-dark";
      }

      if (this.config.class == "success") {
        return "text-success";
      }
      if (this.config.class == "primary") {
        return "text-primary";
      }
      if (this.config.class == "warning") {
        return "text-warning";
      }
      if (this.config.class == "danger") {
        return "text-danger";
      }
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
<style >
    .textalg{
       text-align: center;
    }
    .icon {
    display: table-cell;
    vertical-align: middle;
    border: 1px solid pink;
}
</style>