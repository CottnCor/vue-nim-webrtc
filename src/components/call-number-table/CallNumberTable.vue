<template>
  <div class="call-number-table">
    <el-table v-if="this.callNumber && this.callNumber.length > 0" :data="callNumber" size="small" :row-style="this.renderRow" :cell-style="this.renderCell">
      <el-table-column align="center" width="150" v-if="this.state.includes(0) || this.state.includes(3)">
        <template slot="header">
          <i class="el-icon-message-solid title warning"></i>
        </template>
        <template v-slot="scope">
          <count-down :startTime="new Date().getTime()" :endTime="new Date(scope.row.createtime).getTime()" alert-seconds="300" />
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="160" align="center">
        <template v-slot="scope">
          <span class="no-wrap">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图斑编号" width="120" align="center">
        <template v-slot="scope">
          <div slot="reference">
            <el-tag size="small"><span class="no-wrap">{{ scope.row.tbbh }}</span></el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="预约时间" width="210" align="center" v-if="this.state.includes(0) || this.state.includes(3) || this.state.includes(4)">
        <template v-slot="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约人" align="center">
        <template v-slot="scope">
          <span class="no-wrap left">{{ scope.row.username }}</span>
          <el-tag size="small" :type="scope.row.online === 1 ? 'success' : 'danger'">{{ scope.row.online === 1 ? '在线' : '离线' }}</span></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="调度人" align="center" v-if="this.state.includes(5)">
        <template v-slot="scope">
          <span class="no-wrap">{{ scope.row.staffname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="视频开始时间" width="210" align="center" v-if="this.state.includes(5)">
        <template v-slot="scope">
          <span>{{ scope.row.begintime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="视频结束时间" width="210" align="center" v-if="this.state.includes(5)">
        <template v-slot="scope">
          <span>{{ scope.row.endtime }}</span>
        </template>
      </el-table-column>
      <el-table-column v-slot="scope" label="状态" width="72" align="center" v-if="this.state.includes(0) || this.state.includes(3)">
        <span v-if="scope.row.state === 0" class="success">排队中</span>
        <span v-else-if="scope.row.state === 3" class="highlight">未应答</span>
      </el-table-column>
      <el-table-column label="操作" align="center" v-if="this.state.includes(0)">
        <template v-slot="scope">
          <el-button type="primary" :disabled="scope.row.online === 1 ? false:true" size="mini" icon="el-icon-phone-outline" @click="handleCall(scope.$index, scope.row)">呼叫</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" v-else>
        <template v-slot="scope">
          <el-button type="primary" :disabled="scope.row.online === 1 ? false:true" size="mini" icon="el-icon-phone-outline" @click="handleCall(scope.$index, scope.row)">重新呼叫</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button v-if="this.callNumber && this.callNumber.length > 0" type="primary" icon="el-icon-refresh" @click="refresh(currentPage)" />
    <content-none v-else slot="main" :tips="`无${this.tips}任务`" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { getFaceTimeList } from "@/api/call-number";

import { formatDate } from "@/utils/common";

import { ROOT_PATH, ROOT_ROUTER } from "@/config";

import { ContentNone, CountDown } from "@/components";

import { namespace } from "vuex-class";

const callNumberStore = namespace("CallNumber");

@Component({ components: { ContentNone, CountDown } })
class CallNumberTable extends Vue {
  @callNumberStore.Getter("token")
  public token!: string;

  @callNumberStore.Getter("userid")
  public userid!: number;

  @Prop({ default: "" })
  private tips!: string;

  @Prop({ default: null })
  private state!: number[];

  @Prop({ default: null })
  private taskid!: string;

  @Prop({ default: 1 })
  private pageSize!: number;

  private currentPage!: number;

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

  public refresh(page: number, taskid?: string) {
    if (
      page &&
      this.pageSize &&
      (this.taskid || taskid) &&
      this.state &&
      this.state.length > 0
    ) {
      this.currentPage = page;
      let param = JSON.stringify({
        taskid: this.taskid || taskid,
        state: this.state,
        limit: this.pageSize,
        page: this.currentPage
      });
      getFaceTimeList({ filter: encodeURI(param) })
        .then(result => {
          if (result) {
            this.callNumber = [];
            this.callNumber.push(
              ...result.map(item => {
                if (item.createtime) {
                  item.createtime = formatDate(
                    new Date(item.createtime),
                    "yyyy/MM/dd HH:mm:ss"
                  );
                }
                if (item.begintime) {
                  item.begintime = formatDate(
                    new Date(item.begintime),
                    "yyyy/MM/dd HH:mm:ss"
                  );
                }
                if (item.endtime) {
                  item.endtime = formatDate(
                    new Date(item.endtime),
                    "yyyy-MM-dd HH:mm:ss"
                  );
                }
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

  private renderRow(row, rowIndex) {
    return {
      "background-color": "transparent"
    };
  }

  private renderCell(row, rowIndex) {
    return {
      "background-color": "transparent"
    };
  }
}

export default CallNumberTable;
</script>

<style lang="scss" scoped>
.call-number-table {
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
}
</style>
