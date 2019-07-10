import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { namespace } from 'vuex-class'

const store = namespace('Common')

import { SketchLayout } from '@/layout'

import {
  BaiscMap,
  UssdPanel,
  PeopleListPanel,
  SpotListPanel,
  ClusterMarkers,
  SpinMarker
} from '@/components'

import { getPeopleCoords } from '@/api/_mock-data'

@Component({
  components: {
    SketchLayout,
    UssdPanel,
    PeopleListPanel,
    SpotListPanel,
    BaiscMap,
    ClusterMarkers,
    SpinMarker
  }
})
class FaceTime extends Vue {
  private mockMarkers!: any[]

  private currentLatLng = []

  private currentAngle = 135

  @Prop({ default: null })
  private appkey!: string

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
    getPeopleCoords({
      level: 2,
      bounds: {
        maxLat: 76.44490733708945,
        maxLng: 116.67480468750001,
        minLat: 72.54790992192898,
        minLng: 86.66015625000001
      }
    })
      .then(result => {
        this.mockMarkers = result
      })
      .catch(err => {
        console.log(err)
      })
  }

  private beforeDestroy() {}
}

export default FaceTime
