<template>
  <div class="calendar-filter">
    <p class="primary strong left"><i class="el-icon-thumb success"></i></p>
    <p class="primary strong left">任务类型:</p>
    <el-select class="filter" v-if="this.taskType.length > 0" v-model="currentTask" size="small" placeholder="请选择">
      <el-option class="flex" v-for="item in this.taskType" :key="item.id" :label="item.name" :value="item.id">
        <p class="primary strong left"><i class="el-icon-finished success"></i></p>
        <p class="primary left">{{ item.name }}</p>
      </el-option>
    </el-select>
    <p class="primary strong left"><i class="el-icon-date success"></i></p>
    <p class="primary strong left">任务日期:</p>
    <p class="primary strong left primary-color motion">{{this.currentDate}}</p>
    <span style="flex: 1;" />
    <el-input class="filter input" size="small" placeholder="输入预约用户名进行搜索" suffix-icon="el-icon-search" v-model="this.filterText" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

import { getTaskType } from "@/api/call-number";

import { formatDate } from "@/utils/common";

@Component({})
class CalendarFilter extends Vue {
  private taskType = [];

  private currentTask = "";

  private filterText = "";

  private get currentDate(): string {
    return formatDate(new Date(), "yyyy-MM-dd");
  }

  @Emit()
  private taskChanged(val: string) {
    return val;
  }

  @Watch("currentTask", { immediate: true, deep: true })
  private onTaskChanged(val: string, oldVal: string) {
    if (val) {
      this.taskChanged(val);
    }
  }

  private mounted() {
    getTaskType()
      .then(result => {
        if (result && result.length > 0) {
          this.taskType = result;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default CalendarFilter;
</script>

<style lang="scss" scoped>
.calendar-filter {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  p {
    margin: auto 0.2rem;
  }
  .filter {
    margin: auto $size_12;
    &.input {
      width: $size_240;
    }
  }
}
</style>