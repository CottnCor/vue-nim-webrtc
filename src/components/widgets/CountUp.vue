<template>
  <div class="count-up">
    <span v-if="this.msTime.day > 0">{{(this.msTime.day < 10 ? "0":"") + this.msTime.day + "天-"}}</span>
    <span>{{(this.msTime.hour < 10 ? "0":"") + this.msTime.hour + ":"}}</span>
    <span>{{(this.msTime.minutes < 10 ? "0":"") + this.msTime.minutes + ":"}}</span>
    <span>{{(this.msTime.seconds < 10 ? "0":"") + this.msTime.seconds}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";

@Component({})
class CountUp extends Vue {
  @Prop({ default: 0 })
  private startTime!: number;

  private dayConst = 86400000;
  private hourConst = 3600000;
  private minutesConst = 60000;
  private secondsConst = 1000;

  private interval!: number;

  private msTime: MsTime = {
    day: 0,
    hour: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: () => {
      return (
        (this.msTime.day * this.dayConst +
          this.msTime.hour * this.hourConst +
          this.msTime.minutes * this.minutesConst +
          this.msTime.seconds * this.secondsConst) /
        this.secondsConst
      );
    }
  };

  private mounted() {
    this.interval = setInterval(() => {
      let currentTime = new Date().getTime();
      let timeInterval = currentTime - this.startTime;
      if (timeInterval > 0) {
        this.runTime(this.startTime, currentTime);
      }
    }, this.secondsConst);
  }

  private beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private runTime(startTime: number, endTime: number) {
    let timeInterval = endTime - startTime;
    if (timeInterval > 0) {
      let ms = 0;
      this.msTime.day = Math.floor(timeInterval / this.dayConst);
      ms = this.msTime.day * this.dayConst;
      this.msTime.hour = Math.floor((timeInterval - ms) / this.hourConst);
      ms += this.msTime.hour * this.hourConst;
      this.msTime.minutes = Math.floor((timeInterval - ms) / this.minutesConst);
      ms += this.msTime.minutes * this.minutesConst;
      this.msTime.seconds = Math.floor((timeInterval - ms) / this.secondsConst);
    } else {
      clearInterval(this.interval);
    }
  }
}

interface MsTime {
  day: number;
  hour: number;
  minutes: number;
  seconds: number;
  totalSeconds: () => number;
}

export default CountUp;
</script>

<style lang="scss" scoped>
.count-up {
  margin: auto;
}
</style>