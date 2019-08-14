<template>
  <div class="people-filter flex">
    <div class="flex-column flex-full">
      <infinite-tree class="flex-full" :loading="this.loading" :content="this.organizations" @node-changed="this.organizationChanged" />
      <!-- <el-input class="flex-full filter" size="small" placeholder="输入关键字进行过滤" prefix-icon="el-icon-search" :clearable="true" v-model="filter" @change="handleFilterChanged"></el-input> -->
    </div>
    <a @click="refresh" class="button motion"><i class="primary-color el-icon-refresh"></i></a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { getUserInfo } from "@/api/face-time";
import { InfiniteTree } from "@/components";
import { namespace } from "vuex-class";
const faceTimeStore = namespace("FaceTime");
@Component({ components: { InfiniteTree } })
class PeopleFilter extends Vue {
  @Prop({ default: null })
  private token!: string;
  @faceTimeStore.Getter("organizationid")
  private organizationid!: string;
  @faceTimeStore.Action("set_organizationid")
  private setOrganizationid!: (val: string) => void;
  private organizations: any[] = [];
  private loading = true;
  private filter = "";
  @Emit()
  private filterChanged(val: any) {
    return val;
  }
  private refresh() {
    if (this.organizationid) {
      let organizationid = this.organizationid;
      this.setOrganizationid("");
      this.setOrganizationid(organizationid);
    }
  }
  private handleFilterChanged(value) {
    this.filterChanged(value);
  }
  private organizationChanged(param: any) {
    if (param && this.organizationid != param.id) {
      this.organizationid = param.id;
      this.setOrganizationid(param.id);
    }
  }
  private mounted() {
    if (this.token) {
      this.loading = true;
      getUserInfo({ token: this.token })
        .then(result => {
          if (
            result &&
            result.organizations &&
            result.organizations.length > 0
          ) {
            this.loading = false;
            this.organizations = result.organizations;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
interface Organizations {
  id: string;
  name: string;
  children: Children[];
}
interface Children {
  id: string;
  name: string;
}
export default PeopleFilter;
</script>

<style lang="scss" scoped>
.people-filter {
  height: 100%;
  width: 100%;
  .filter {
    margin-top: $size_10;
  }
  .button {
    padding: 0;
    border: none;
    background: none;
    border-radius: 0;
    &:hover {
      background: none;
      box-shadow: none;
    }
  }
}
</style>
