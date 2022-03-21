<template>
  <div>
      <GmapMap style="width: 500px; height: 300px;"
        :zoom="4"
        :center="{lat:7.15, lng:-74.56}"
         ref="map"
      > 
      </GmapMap>

  </div>
</template>

<script>
  export default{
    middleware: "authenticated",
  }
</script>

