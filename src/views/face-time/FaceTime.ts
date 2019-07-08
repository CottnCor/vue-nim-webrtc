import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { namespace } from 'vuex-class'

const store = namespace('Common')

import { SketchLayout } from '@/layout'

import {} from '@/api/face-time'

@Component({
  components: { SketchLayout }
})
class FaceTime extends Vue {
  private interval?: any

  private intervalGap = 3000

  @Prop({ default: null })
  private appkey!: string

  @Prop({ default: null })
  private sign!: string

  @Prop({ default: null })
  private timestamp!: string

  @Prop({ default: null })
  private userId!: number

  @store.Getter('status')
  private status!: number

  @store.Action('set_status')
  private setStatus!: (val: number) => void

  @Watch('status', { immediate: true, deep: true })
  private onStatusChanged(val: number, oldVal: number) {
    if (val === 0) {
      parent.postMessage('500', '*')
    } else if (val === 1) {
      parent.postMessage('200', '*')
    } else if (val === 2) {
      parent.postMessage('200', '*')
    } else {
      parent.postMessage('403', '*')
    }
  }

  private activated() {}

  private mounted() {
    this.setStatus(2)
  }

  private beforeDestroy() {}
}

export default FaceTime
