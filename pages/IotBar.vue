<template>
<card padding="20px">
    <h4 font-size="30px" class="card-style">{{value}}[{{unit}}]</h4>
  <div padding="20px">
      <BaseProgress :value= value  ></BaseProgress>
  </div>

</card>
  
</template>

<script>

export default {
middleware: "authenticated",

    data(){
        return{
            value:30,
            unit:'Hp'

        }
    }

}
</script>

<style>


</style>