import { Component, Watch, Prop, Vue } from 'vue-property-decorator'

import { BasicLayout } from '@/layout'

import { CallNumberPanel } from '@/components'

import { namespace } from "vuex-class";

const store = namespace("CallNumber");

@Component({
  components: {
    BasicLayout,
    CallNumberPanel
  }
})
class CallNumber extends Vue {
  @Prop({ default: null })
  private token!: string

  @Prop({ default: null })
  private userid!: string

  @store.Action("set_token")
  private setToken!: (val: string) => void;

  @store.Action("set_userid")
  private setUserid!: (val: string) => void;

  @Watch('token', { immediate: true, deep: true })
  private onTokenChanged(val: string, oldVal: string) {
    if (val) {
      this.setToken(val);
    }
  }

  @Watch('userid', { immediate: true, deep: true })
  private onUseridChanged(val: string, oldVal: string) {
    if (val) {
      this.setUserid(val);
    }
  }
}

export default CallNumber
