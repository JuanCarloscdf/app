<template>

    <card>

        <template slot="header">
           
            <h5 class="card-category"> {{ config.selectedDevice.name }} - {{ config.variableFullName }}</h5>

            <h3 class="card-title">
               
            </h3>

                     <GmapMap style="width: 100%; height: 400px;"
                        :zoom="10"
                        :center="position"
                        ref="map"
                     > 
                             <GmapMarker
                                :position= "position"
                                :clickable="true" 
                                :draggable="false"
                                 >
                           
                            </GmapMarker> 
                    </GmapMap>
                    

        </template>

    </card>

</template>

<script>
export default{
    name:"mapa",
    props:["config"],
    data(){
        return{
            position:{lat:-12.516811, lng:-68.112460},
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
        } catch (error) {
        console.log(error);    
        }
       
    }
},
}

</script>