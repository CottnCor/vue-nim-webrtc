<template>
  <div class="people-filter">
    <el-select class="filter" v-if="this.organizations.length > 0" v-model="currentOrganization" size="mini" placeholder="请选择" @change="organizationChanged">
      <el-option class="flex" v-for="item in this.organizations" :key="item.id" :label="item.name" :value="item.id">
        <p class="primary strong left"><i class="el-icon-more success"></i></p>
        <p class="primary left">{{ item.name }}<span class="strong strong-color">{{' (' + item.id + ')'}}</span></p>
      </el-option>
    </el-select>
    <el-select class="filter" v-model="currentSubOrganization" size="mini" placeholder="请选择" @change="subOrganizationChanged">
      <el-option class="flex" v-for="item in this.subOrganizations" :key="item.id" :label="item.name" :value="item.id">
        <p class="primary strong left"><i class="el-icon-more success"></i></p>
        <p class="primary left">{{ item.name }}<span class="strong strong-color">{{' (' + item.id + ')'}}</span></p>
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getUserInfo } from "@/api/face-time";
import { namespace } from "vuex-class";
const faceTimeStore = namespace("FaceTime");
@Component({})
class PeopleFilter extends Vue {
  @Prop({ default: null })
  private token!: string;
  @faceTimeStore.Action("set_organizationid")
  private setOrganizationid!: (val: string) => void;
  private currentOrganization = "";
  private currentSubOrganization = "";
  private organizations: Organizations[] = [];
  private subOrganizations: Organizations[] = [];
  private organizationChanged(id: string) {
    if (id) {
      this.setOrganizationid(id);
      this.subOrganizations = [];
      this.currentSubOrganization = "";
      for (const item of this.organizations) {
        if (item.id === id) {
          this.subOrganizations = item.children.map(item => {
            return {
              id: item.id,
              name: item.name,
              children: []
            };
          });
        }
      }
    }
  }
  private subOrganizationChanged(id: string) {
    if (id) {
      this.setOrganizationid(id);
    }
  }
  private mounted() {
    if (this.token) {
      getUserInfo({ token: this.token })
        .then(result => {
          if (
            result &&
            result.organizations &&
            result.organizations.length > 0
          ) {
            let organization = result.organizations[0];
            let children = organization.children;
            if (organization.level === 2) {
              let children = organization.children;
              this.organizations = children.map(item => {
                return {
                  id: item.id,
                  name: item.name,
                  children:
                    item.children && item.children.length > 0
                      ? item.children.map(item => {
                          return {
                            id: item.id,
                            name: item.name
                          };
                        })
                      : []
                };
              });
              this.currentOrganization = this.organizations[0].name;
              this.organizationChanged(this.organizations[0].id);
            } else if (organization.level > 2) {
              let data = organization.level === 3 ? children : [organization];
              this.subOrganizations = data.map(item => {
                return {
                  id: item.id,
                  name: item.name,
                  children: []
                };
              });
              this.currentSubOrganization = this.subOrganizations[0].name;
              this.subOrganizationChanged(this.subOrganizations[0].id);
            }
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
  name: any;
  children: Children[];
}
interface Children {
  id: string;
  name: any;
}
export default PeopleFilter;
</script>

<style lang="scss" scoped>
.people-filter {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  .filter {
    flex: 1;
    margin: auto $size_12 auto 0;
  }
}
</style>
