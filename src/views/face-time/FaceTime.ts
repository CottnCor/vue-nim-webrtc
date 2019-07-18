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
  private userid!: number

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

  @Watch('userid', { immediate: true, deep: true })
  private onUseridChanged(val: number, oldVal: number) {
    if (val) {
      getYxInfo({userid: val}).then((result) => {
        if(result){
          this.setFrom({
            userid: result.userid,
            account: result.account,
            token: result.token,
            status: result.status,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}

export default FaceTime
