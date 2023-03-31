<template>
  <client-only>
      <BarChart :data="chartData"></BarChart>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        datasets: [{
          data: [45, 55, 48, 35, 12]
        }]
      }
    };
  }
}
</script>