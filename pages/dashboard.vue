<template>


    
  <div class="row" v-if="$store.state.devices.length > 0">

    <div
      v-for="(widget, index) in $store.state.selectedDevice.template.widgets"
      :key="index"
      :class="[widget.column]"
      
    >

      <Rtnumberchart
        v-if="widget.widget == 'numberchart'"
        :config="fixWidget(widget)"
      ></Rtnumberchart>

      <Iotswitch
        v-if="widget.widget == 'switch'"
        :config="fixWidget(widget)"
      ></Iotswitch>

      <Iotbutton
        v-if="widget.widget == 'button'"
        :config="fixWidget(widget)"
      ></Iotbutton>

      <Iotindicator
        v-if="widget.widget == 'indicator'"
        :config="fixWidget(widget)"
      ></Iotindicator>
       <Map
        v-if="widget.widget == 'mapa'"
        :config="fixWidget(widget)"
      ></Map>
      <ChartJs
        v-if="widget.widget == 'chartjs'"
        :config="fixWidget(widget)"
      ></ChartJs>
      <ActBool
        v-if="widget.widget == 'actbool'"
        :config="fixWidget(widget)"
      ></ActBool>
      <IotBar
        v-if="widget.widget == 'iotbar'"
        :config="fixWidget(widget)"
      ></IotBar>
      <IotBarChart
        v-if="widget.widget == 'iotbarchart'"
        :config="fixWidget(widget)"
      ></IotBarChart>
    </div>
  </div>

  <div v-else>
      Seleccione un dispositivo
  </div>

</template>
<script>

export default {
  middleware: 'authenticated',
  name: 'Dashboard',
  data() {
    return {


    } 
  },

  mounted() {
  

  },

  methods: {

    fixWidget(widget){
      var widgetCopy = JSON.parse(JSON.stringify(widget));
      widgetCopy.selectedDevice.dId = this.$store.state.selectedDevice.dId;
      widgetCopy.selectedDevice.name = this.$store.state.selectedDevice.name;
      widgetCopy.userId = this.$store.state.selectedDevice.userId;

      if (widget.widget =="numberchart"){
        widgetCopy.demo = false;
      }
      if (widget.widget =="chartjs"){
        widgetCopy.demo = false;
      }
      if (widget.widget =="iotbarchart"){
        widgetCopy.demo = false;
      }
      
      return widgetCopy;
    }

  }

};
</script>