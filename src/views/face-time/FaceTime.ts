import { Component, Watch, Prop, Vue } from 'vue-property-decorator'

import { FaceTimeLayout } from '@/layout'

import {
  FlowControlBar,
  SpotInfoAssistBar,
  NavBar,
  UssdPanel,
  CoreBusinessPanel
} from '@/components'

import { getYxInfo } from '@/api/face-time'

import { namespace } from 'vuex-class'

const store = namespace('FaceTime')

@Component({
  components: {
    FaceTimeLayout,
    UssdPanel,
    CoreBusinessPanel,
    FlowControlBar,
    SpotInfoAssistBar,
    NavBar
  }
})
class FaceTime extends Vue {
  @Prop({ default: null })
  private token!: string

  @Prop({ default: null })
  private userid!: number

  @Prop({ default: null })
  private callnumer!: string

  @Prop({ default: null })
  private staffuser!: number

  @store.Action('set_token')
  private setToken!: (val: string) => void

  @store.Action('set_callnumber')
  private setCallnumber!: (val: string) => void

  @store.Action('set_from')
  private setFrom!: (val: any) => void

  @store.Action('set_to')
  private setTo!: (val: any) => void

  private mounted() {
    if (this.token) {
      this.setToken(this.token)
    }

    if (this.callnumer) {
      this.setCallnumber(this.callnumer)
    }

    if (this.userid) {
      getYxInfo({ userid: this.userid })
        .then(result => {
          if (result) {
            this.setTo({
              userid: result.userid,
              username: result.username,
              account: result.account,
              status: result.status,
              timestamp: new Date()
            })
            this.updateFrom()
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  private updateFrom() {
    if (this.staffuser) {
      getYxInfo({ userid: this.staffuser })
        .then(result => {
          if (result) {
            this.setFrom({
              userid: result.userid,
              account: result.account,
              token: result.token,
              status: result.status,
              timestamp: new Date()
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

export default FaceTime
