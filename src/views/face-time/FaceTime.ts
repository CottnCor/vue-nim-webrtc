import { Component, Vue } from 'vue-property-decorator'

import { SketchLayout } from '@/layout'

import { MapPanel, UssdPanel, CoreBusinessPanel } from '@/components'

@Component({
  components: {
    SketchLayout,
    MapPanel,
    UssdPanel,
    CoreBusinessPanel
  }
})
class FaceTime extends Vue {}

export default FaceTime
