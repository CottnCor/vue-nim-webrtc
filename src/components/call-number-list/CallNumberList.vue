<template>
  <div v-if="this.callNumber && this.callNumber.length > 0 && this.stateDefine" class="call-number-list">
    <el-table :data="callNumber" empty-text="sm" style="width: 100%;">
      <el-table-column label="项目名称" class="center">
        <template v-slot="scope">
          <i :class="[ scope.row.online === 0 ? 'error' : 'success', 'el-icon-s-flag', 'left']"></i>
          <span class="right">{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="图斑编号">
        <template v-slot="scope">
          <div slot="reference">
            <el-tag size="small">{{ scope.row.tbbh }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="预约时间">
        <template v-slot="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约人">
        <template v-slot="scope">
          <el-tag size="small">{{ scope.row.username }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="this.stateDefine.underway.indexOf(scope.row.state) !== -1" label="预约时间">
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.tbbh }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="this.stateDefine.underway.indexOf(scope.row.state) !== -1" label="预约时间">
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.tbbh }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="this.stateDefine.underway.indexOf(scope.row.state) !== -1" label="调度人">
        <template v-slot="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.tbbh }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column v-slot="scope" v-if="this.stateDefine.waiting.indexOf(scope.row.state) !== -1" label="状态">
        <i class="el-icon-time"></i>
        <span>{{ scope.row.tbbh }}</span>
      </el-table-column> -->
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="small" @click="handleCall(scope.$index, scope.row)">{{ true ? '呼叫' : '重新呼叫' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { getFaceTimeList } from "@/api/call-number";

import { formatDate } from "@/utils/common";

import { ROOT_PATH, ROOT_ROUTER } from "@/config";

import { namespace } from "vuex-class";

const callNumberStore = namespace("CallNumber");

@Component({})
class CallNumberList extends Vue {
  @callNumberStore.Getter("token")
  public token!: string;

  @callNumberStore.Getter("userid")
  public userid!: number;

  @Prop({ default: null })
  private state!: number[];

  @Prop({ default: null })
  private taskid!: string;

  @Prop({ default: 1 })
  private pageSize!: number;

  private callNumber: any[] = [];

  private stateDefine = {
    waiting: {
      tag: 0,
      value: [0, 3],
      label: "待呼叫"
    },
    underway: {
      tag: 1,
      value: [5],
      label: "已呼叫"
    },
    expired: {
      tag: 2,
      value: [4],
      label: "已过期"
    }
  };

  public refresh(currentPage: number, taskid?: string) {
    if (
      currentPage &&
      this.pageSize &&
      (this.taskid || taskid) &&
      this.state &&
      this.state.length > 0
    ) {
      let param = JSON.stringify({
        taskid: this.taskid || taskid,
        state: this.state,
        limit: this.pageSize,
        page: currentPage
      });
      getFaceTimeList({ filter: encodeURI(param) })
        .then(result => {
          if (result) {
            this.callNumber = [];
            this.callNumber.push(
              ...result.map(item => {
                item.createtime = formatDate(
                  new Date(item.createtime),
                  "yyyy-MM-dd HH:mm:ss"
                );
                return item;
              })
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  private handleCall(index, row) {
    this.$confirm("即将发起视频呼叫, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    }).then(() => {
      if (row) {
        this.$router.push({
          name: ROOT_ROUTER.faceTime.name,
          query: {
            token: this.token,
            staffuser: this.userid.toString(),
            callnumer: row.id,
            userid: row.userid
          }
        });
      }
    });
  }
}

export default CallNumberList;
</script>

<style lang="scss" scoped>
.call-number-list {
  margin: auto;
  display: flex;
}
</style>
