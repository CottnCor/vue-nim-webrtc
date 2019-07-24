import { Component, Watch, Prop, Vue } from 'vue-property-decorator'

import { MapSketchLayout } from '@/layout'

import { MapPanel, UssdPanel, CoreBusinessPanel } from '@/components'

import { getYxInfo } from "@/api/face-time";

import { namespace } from "vuex-class";

const store = namespace("FaceTime");

@Component({
  components: {
    MapSketchLayout,
    MapPanel,
    UssdPanel,
    CoreBusinessPanel
  }
})
class FaceTime extends Vue {
  @Prop({ default: null })
  private token!: string

  @Prop({ default: null })
  private userid!: string

  @Prop({ default: null })
  private username!: string

  @store.Action("set_token")
  private setToken!: (val: string) => void;

  @store.Action("set_from")
  private setFrom!: (val: any) => void;

  @Watch('token', { immediate: true, deep: true })
  private onTokenChanged(val: string, oldVal: string) {
    if (val) {
      this.setToken(val);
    }
  }

  @Watch('username', { immediate: true, deep: true })
  private onUsernamechanged(val: string, oldVal: string) {
    if (val) {
      getYxInfo({username: val}).then((result) => {
        if(result){
          this.setFrom({
            userid: this.userid,
            username: val,
            account: result.account,
            token: result.token,
          });
        } else {
          this.$notify.error({
            title: "初始化失败",
            message: "用户未进行审核",
            duration: 0
            })
        }
      }).catch((err) => {
        console.log(err);
        this.$notify.error({
          title: "初始化失败",
          message: "用户未进行审核",
          duration: 0
          })
      });
    }
  }
}

export default FaceTime
