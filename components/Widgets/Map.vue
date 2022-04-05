<template>

    <card>

        <template slot="header">
           
            <h5 class="card-category"> {{ config.selectedDevice.name }} - {{ config.variableFullName }}</h5>

            <h3 class="card-title">
               
            </h3>

        </template>
        <div class="chart-area" style="height: 300px">
             <GmapMap style=" height: 100%;"
                        :zoom="10"
                        :center="position"
                        ref="map"
                     > 
                             <GmapMarker
                                v-for="(m, index) in markers"
                                :key="index"
                                :ref="`marker${index}`"
                                :position="m.position"
                                :clickable="true" 
                                :draggable="false"
                                :icon="markerOptions" 
                                 >
                            </GmapMarker> 
             </GmapMap>

        </div>

    </card>

</template>

<script>
const mapMarker = require('~/assets/images/icon.png');
export default{
   
    name:"mapa",
    props:["config"],
    data(){
        return{
            position:{lat:-13.519920, lng:-68.112460},

            auxPosition:{ position:{lat:-13.519920, lng:-68.112460}},
            markers:[
                {position:{lat:-13.519920, lng:-68.112460}},
                
            ],
            markerOptions: {
                url: mapMarker,
                size: {width: 10, height: 10, f: 'px', b: 'px',},
                scaledSize: {width: 10, height: 10, f: 'px', b: 'px',},
             },
        };
         
            
    },

mounted(){

    const topic = this.config.userId + "/" +this.config.selectedDevice.dId + "/" + this.config.variable+"/sdata";
    console.log(topic+"     este es el topico");
    this.$nuxt.$on(topic, this.processReceivedDatas);

},
beforeDestroy(){
    this.$nuxt.$off(this.config.userId + "/" +this.config.selectedDevice.dId + "/" + this.config.variable+"/sdata");
},
methods:{
    processReceivedDatas(data){
        
        try {
        console.log("recibiendo ubicacion");
        console.log(data);
        this.position=data;
        this.auxPosition.position=data;
        const { ...auxCopy} = this.auxPosition;
        this.markers.push(auxCopy);
        } catch (error) {
        console.log(error);    
        }
       
    }
},
}

</script>