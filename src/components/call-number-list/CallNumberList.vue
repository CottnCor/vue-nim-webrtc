<template>
  <div v-if="this.callNumber && this.callNumber.length > 0" class="call-number-list">
    <el-table :data="callNumber" style="width: 100%;" :row-class-name="this.renderState">
      <el-table-column label="项目名称" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图斑编号" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="预约时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约人" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">呼叫</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { getFaceTimeList } from "@/api/call-number";

@Component({})
class CallNumberList extends Vue {
  @Prop({ default: null })
  private state!: number[];

  @Prop({ default: null })
  private taskid!: string;

  @Prop({ default: 1 })
  private pageSize!: number;

  private callNumber: any[] = [];

  public refresh(currentPage: number) {
    if (
      currentPage &&
      this.pageSize &&
      this.taskid &&
      this.state &&
      this.state.length > 0
    ) {
      this.callNumber = [];
      for (const state of this.state) {
        this.getFacatime(this.taskid, state, this.pageSize, currentPage);
      }
    }
  }

  private getFacatime(
    taskid: string,
    state: number,
    limit: number,
    page: number
  ) {
    getFaceTimeList({
      taskid: taskid,
      state: state,
      limit: limit,
      page: page
    })
      .then(result => {
        if (result && result.length > 0) {
          this.callNumber.push(...result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  private renderState({ row, rowIndex }) {
    if (row.state === 1) {
      return "warning-row";
    } else if (row.state === 3) {
      return "success-row";
    }
    return "";
  }

  private handleEdit(index, row) {
    console.log(index, row);
  }

  private handleDelete(index, row) {
    console.log(index, row);
  }
}

export default CallNumberList;
</script>

<style lang="scss" scoped>
.call-number-list {
  margin: auto;
  display: flex;
  .el-table {
    .warning-row {
      background: oldlace;
    }
    .success-row {
      background: #f0f9eb;
    }
  }
}
</style>
