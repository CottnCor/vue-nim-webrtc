<template>
  <div class="call-number-panel radius">
    <div class="visible-controller">
      <div v-for="item in this.visiblePanelTab" :key="item.tag" :class="[item.state ? 'active' : '', 'motion']" @click="activatePanel(item.tag)">
        <p class="primary pure">{{item.label}}</p>
      </div>
      <div v-if="this.panelState.length > this.panelMax" class="motion" @click="activatePanel(-1)">
        <p class="primary pure">
          <i v-if="this.panelSurplus" class="el-icon-d-arrow-left"></i>
          <i v-else class="el-icon-more-outline"></i>
        </p>
      </div>
    </div>
    <div class="content radius">
      <call-number-layout>
        <calendar-filter slot="top" @task-changed="this.taskChanged" :state="this.visiblePanel.param" />
        <call-number-table ref="callNumberTable" slot="main" :state="this.visiblePanel.param" :taskid="this.taskid" :page-size="this.pageSize" :tips="this.visiblePanel.label" />
        <pagination slot="buttom" @page-changed="this.pageChanged" :total="this.totalCount" :page-size="this.pageSize" />
      </call-number-layout>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Getter, Action, namespace } from "vuex-class";

import { CallNumberLayout } from "@/layout";

import { getFaceTimeOverview } from "@/api/call-number";

import { Pagination, CalendarFilter, CallNumberTable } from "@/components";

@Component({
  components: { Pagination, CalendarFilter, CallNumberLayout, CallNumberTable }
})
class CallNumberPanel extends Vue {
  public $refs!: {
    callNumberTable: CallNumberTable;
  };

  private panelMax = 3;

  private panelSurplus = false;

  private panelState = [
    {
      tag: 0,
      param: [0, 3],
      state: true,
      label: "待呼叫",
      component: "CallNumberWaiting"
    },
    {
      tag: 1,
      param: [5],
      state: false,
      label: "已呼叫",
      component: "CallNumberUnderway"
    },
    {
      tag: 2,
      param: [4],
      state: false,
      label: "已过期",
      component: "CallNumberExpired"
    }
  ];

  private taskid = "";

  private pageSize = 5;

  private totalCount = 0;

  private get visiblePanelTab(): any {
    let tabs: any = null;
    if (this.panelSurplus) {
      tabs = this.panelState.filter((item, index) => index > this.panelMax - 1);
    } else {
      tabs = this.panelState.filter((item, index) => index < this.panelMax);
    }
    return tabs.map((item, index) => {
      if (index === 0) {
        item.state = true;
      }
      return item;
    });
  }

  private get visiblePanel(): any {
    for (const item of this.panelState) {
      if (item.state) {
        return item;
      }
    }
  }

  @Watch("visiblePanel", { immediate: true, deep: true })
  private onVisiblePanelChanged(val: any, oldVal: any) {
    if (val) {
      this.refreshOverview();
      this.pageChanged(1);
    }
  }

  private taskChanged(val: string) {
    if (val) {
      this.taskid = val;
      this.refreshOverview();
      this.pageChanged(1, this.taskid);
    }
  }

  private pageChanged(page: number, taskid?: string) {
    if (page && this.$refs.callNumberTable) {
      this.$refs.callNumberTable.refresh(page, taskid);
    }
  }

  private activatePanel(tag: number) {
    for (const item of this.panelState) {
      if (tag === item.tag) {
        item.state = true;
      } else {
        item.state = false;
      }
      if (tag < 0) {
        this.panelSurplus = !this.panelSurplus;
      }
    }
  }

  private refreshOverview() {
    if (
      this.taskid &&
      this.visiblePanel &&
      this.visiblePanel.param.length > 0
    ) {
      let param = JSON.stringify({
        taskid: this.taskid,
        state: this.visiblePanel.param
      });
      getFaceTimeOverview({ filter: encodeURI(param) })
        .then(result => {
          if (result) {
            this.totalCount = 0;
            for (const item of result) {
              this.totalCount += item.count;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
export default CallNumberPanel;
</script>

<style lang='scss' scoped>
.call-number-panel {
  height: 100%;
  width: 100%;
  padding: $size_24;
  display: flex;
  flex-direction: column;

  & > div {
    width: 100%;
  }

  .content {
    height: calc(100% - #{($size_32)});
  }

  .visible-controller {
    display: flex;
    height: $size_32;

    & > div {
      display: flex;
      margin: 0 $size_1;
      padding: 0 $size_12;
      border-radius: $size_12 $size_12 0 0;
      background-color: map-get($default, primary_light_2);

      p {
        margin: auto;
      }

      &:hover {
        background-image: map-get($default, linear_background);
        box-shadow: $shadow_strong;
      }

      &.active {
        background-color: map-get($default, primary);
        box-shadow: $shadow_strong;
      }
    }
  }
}
</style>