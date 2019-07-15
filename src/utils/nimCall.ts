import { NIM_CONFIG } from '@/config'

import { guid } from '@/utils/common'

export default class NimCall {
  private static instance = new NimCall()
  public static getInstance(): NimCall {
    if (!NimCall.instance) {
      NimCall.instance = new NimCall()
    }
    return this.instance
  }

  private nim: any
  private netcall: any

  private callback!: Function

  private callbackType = {
    status: 0,
    track: 1
  }

  private WebRTC: any = WebRTC
  private NIM: any = SDK.NIM

  private deviceList: any = {
    audio: [],
    video: []
  }

  private nimCallStatusCode = {
    unLogged: 0,
    initing: 1,
    waiting: 2,
    calling: 3,
    working: 4,
    failure: 5,
    hangup: 6
  }

  private nimCallStatus = [
    {
      tag: 0,
      state: true,
      tips: 'unLogged'
    },
    {
      tag: 1,
      state: false,
      tips: 'initing'
    },
    {
      tag: 2,
      state: false,
      tips: 'waiting'
    },
    {
      tag: 3,
      state: false,
      tips: 'calling'
    },
    {
      tag: 4,
      state: false,
      tips: 'working'
    },
    {
      tag: 5,
      state: false,
      tips: 'failure'
    },
    {
      tag: 6,
      state: false,
      tips: 'hangup'
    }
  ]

  private constructor() {}

  /**
   *  登陆
   * @param appkey
   * @param account
   * @param token
   */
  public login(
    callback: Function,
    account: string,
    token: string,
    appkey?: string
  ): any {
    if (!this.nim) {
      this.setStatus(this.nimCallStatusCode.initing)
      this.callback = callback
      this.nim = this.NIM.getInstance({
        debug: true,
        promise: true,
        account,
        token,
        appKey: appkey || NIM_CONFIG.appkey,
        syncTeamMembers: false,
        onconnect: () => {
          console.log('im连接认证成功')
        },
        onsyncdone: () => {
          this.initNetcall()
          this.setStatus(this.nimCallStatusCode.waiting)
          console.log('同步完成')
        },
        onmsg: (msg: any) => {
          this.emit(this.callbackType.track, msg.text)
          console.log(msg.text)
        },
        oncustomsysmsg: (msg: any) => {},
        onroamingmsgs: (msg: any) => {},
        onofflinemsgs: (msg: any) => {},
        ondisconnect: (error: any) => {
          this.nim = null
          this.setStatus(this.nimCallStatusCode.unLogged)
        }
      })
      console.log(this.nim)
    } else console.log('已经登录，无需再登录')
  }

  /**
   * emit
   */
  private emit(type: number, content: any): any {
    if (this.callback) this.callback(type, content)
  }

  /**
   * setStatus
   */
  private setStatus(tag: number): any {
    for (const item of this.nimCallStatus) {
      if (item.tag === tag) {
        item.state = true
        this.emit(this.callbackType.status, item.tag)
      } else {
        item.state = false
      }
    }
  }

  /**
   * 初始化音视频sdk
   */
  private initNetcall(): any {
    if (!this.netcall) {
      this.NIM.use(this.WebRTC)
      this.netcall = WebRTC.getInstance({
        container: null,
        remoteContainer: null,
        chromeId: null,
        debug: true,
        nim: this.nim
      })
      this.netcall.on('remoteTrack', param => {
        this.remoteTrackEventHandler(param)
      })
      this.netcall.on('beCalling', () => {
        this.beCallingEventHandler()
      })
      this.netcall.on('callRejected', () => {
        this.callRejectedEventHandler()
      })
      this.netcall.on('callAccepted', () => {
        this.callAcceptedEventHandler()
      })
      this.netcall.on('hangup', () => {
        this.hangupEventHandler()
      })
      this.netcall.on('joinChannel', () => {
        this.joinChannelEventHandler()
      })
      this.netcall.on('leaveChannel', () => {
        this.leaveChannelEventHandler()
      })
      this.syncDeviceList()
    } else return this.netcall
  }

  /**
   * ----------------------------------------
   *              房间呼叫
   * ----------------------------------------
   */

  /**
   * createChannel
   */
  public startCalling(to: any, content?: any): any {
    let channelName = guid()
    this.createChannel(channelName, to, content)
  }

  /**
   * hangup
   */
  public hangup(): any {
    if (this.WebRTC) {
      // 停止本地视频预览
      this.netcall.stopLocalStream()
      // 停止对端视频预览
      this.netcall.stopRemoteStream()
      // 停止设备麦克风
      this.netcall.stopDevice(this.WebRTC.DEVICE_TYPE_AUDIO_IN)
      // 停止设备摄像头
      this.netcall.stopDevice(this.WebRTC.DEVICE_TYPE_VIDEO)
      // 停止播放本地音频
      this.netcall.stopDevice(this.WebRTC.DEVICE_TYPE_AUDIO_OUT_LOCAL)
      // 停止播放对端音频
      this.netcall.stopDevice(this.WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT)
      // 离开房间
      this.netcall.leaveChannel()
      // this.nim.disconnect()
      this.setStatus(this.nimCallStatusCode.hangup)
      this.emit(this.callbackType.track, null)
    }
  }

  /**
   * createChannel
   */
  private createChannel(channelName: string, to: any, content: any): any {
    this.netcall
      .createChannel({
        channelName,
        webrtcEnable: true
      })
      .then(obj => {
        this.joinChannel(channelName, to, content)
      })
      .then(obj => {
        this.setStatus(this.nimCallStatusCode.calling)
      })
      .catch(err => {
        console.error('创建房间失败: ', err)
        this.setStatus(this.nimCallStatusCode.failure)
      })
  }

  /**
   * joinChannel
   */
  private joinChannel(channelName: string, to: any, content: any): any {
    this.netcall
      .joinChannel({
        channelName,
        type: this.WebRTC.NETCALL_TYPE_VIDEO,
        sessionConfig: {
          splitMode: this.WebRTC.LAYOUT_SPLITLATTICETILE,
          videoQuality: this.WebRTC.CHAT_VIDEO_QUALITY_HIGH,
          videoFrameRate: this.WebRTC.CHAT_VIDEO_FRAME_RATE_15,
          videoEncodeMode: this.WebRTC.CHAT_VIDEO_ENCODEMODE_NORMAL
        }
      })
      .then(obj => {
        this.sendInvitations(channelName, to, content)
        this.setDevice(obj)
      })
  }

  /**
   * sendInvitations
   */
  private sendInvitations(channelName: string, to: any, content: any) {
    this.nim.sendCustomSysMsg({
      scene: 'p2p',
      to: to.account,
      apnsText: content || channelName,
      content: channelName,
      done: (error, msg) => {
        this.sendInvitationsDone(error, msg)
      }
    })
  }

  /**
   * setDevice
   */
  private setDevice(obj: any): any {
    this.netcall
      .startRtc(obj)
      .then(data => {
        this.setStatus(this.nimCallStatusCode.working)
        this.openTheMicro()
        this.openTheCamera()
      })
      .catch(error => {
        this.setStatus(this.nimCallStatusCode.failure)
      })
  }

  /**
   * sendInvitationsDone
   */
  private sendInvitationsDone(error: object, msg: object): any {
    if (error) {
      this.setStatus(this.nimCallStatusCode.failure)
    } else this.setStatus(this.nimCallStatusCode.calling)
  }

  /**
   * ----------------------------------------
   * ----------------------------------------
   */

  /**
   * ----------------------------------------
   *              点对点呼叫
   * ----------------------------------------
   */

  /**
   * ----------------------------------------
   * ----------------------------------------
   */

  /**
   * ----------------------------------------
   *              事件处理
   * ----------------------------------------
   */

  /**
   * 收到呼叫
   */
  private beCallingEventHandler(): any {}

  /**
   * 对方拒绝呼叫
   */
  private callRejectedEventHandler(): any {
    this.hangup()
  }

  /**
   * 对方接受呼叫
   */
  private callAcceptedEventHandler(): any {}

  /**
   * 对方挂断
   */
  private hangupEventHandler(): any {
    this.hangup()
  }

  /**
   * 对方加入房间
   */
  private joinChannelEventHandler(): any {}

  /**
   * 对方离开房间
   */
  private leaveChannelEventHandler(): any {
    this.hangup()
  }

  /**
   * ----------------------------------------
   * ----------------------------------------
   */

  /**
   * ----------------------------------------
   *              设备控制
   * ----------------------------------------
   */

  /**
   * 接收远程数据流
   */
  private remoteTrackEventHandler(param: any): any {
    if (param && param.track && param.track.kind === 'audio') {
      this.netcall
        .startDevice({
          type: WebRTC.DEVICE_TYPE_AUDIO_OUT_CHAT
        })
        .then(obj => {})
        .catch(err => {
          this.setStatus(this.nimCallStatusCode.failure)
        })
    } else if (param && param.track && param.track.kind === 'video') {
      this.previewRemoteVideo(param.account)
    }
  }

  /**
   * 预览本地视频
   */
  private previewLocalVideo(): any {
    let node = document.getElementById(NIM_CONFIG.localContainer)
    if (node) {
      this.netcall.startLocalStream(node)
      this.netcall.setVideoViewSize({
        width: node.scrollWidth,
        height: node.scrollHeight,
        cut: false
      })
    }
  }

  /**
   * 预览远端视频
   */
  private previewRemoteVideo(account: string): any {
    let node = document.getElementById(NIM_CONFIG.remoteContainer)
    if (node) {
      this.netcall.startRemoteStream({ account, node })
      this.netcall.setVideoViewRemoteSize({
        account,
        width: node.scrollWidth,
        height: node.scrollHeight,
        cut: false
      })
    }
  }

  /**
   * 打开收音设备
   */
  private openTheMicro(): any {
    if (this.deviceList.audio.length > 0) {
      this.netcall
        .startDevice({
          type: this.WebRTC.DEVICE_TYPE_AUDIO_IN,
          enableEchoCancellation: true,
          device: {
            deviceId: this.deviceList.audio[0].deviceId
          }
        })
        .then(data => {
          console.log('打开 mic 成功')
        })
        .catch(error => {
          console.log('打开 mic 出错: ', error)
        })
    }
  }

  /**
   * 关闭收音设备
   */
  private closeTheMicro(): any {
    this.netcall
      .stopDevice(this.WebRTC.DEVICE_TYPE_AUDIO_IN)
      .then(data => {
        console.log('关闭 mic 成功')
      })
      .catch(error => {
        console.log('关闭 mic 出错: ', error)
      })
  }

  /**
   * 打开摄像设备
   */
  private openTheCamera(): any {
    if (this.deviceList.video.length > 0) {
      this.netcall
        .startDevice({
          type: this.WebRTC.DEVICE_TYPE_VIDEO,
          device: {
            deviceId: this.deviceList.video[0].deviceId
          }
        })
        .then(data => {
          this.previewLocalVideo()
          console.log('打开 camera 成功')
        })
        .catch(error => {
          console.log('打开 camera 出错: ', error)
        })
    }
  }

  /**
   * 关闭摄像设备
   */
  private closeTheCamera(): any {
    this.netcall
      .stopDevice(this.WebRTC.DEVICE_TYPE_VIDEO)
      .then(data => {
        console.log('关闭 camera 成功')
      })
      .catch(error => {
        console.log('关闭 camera 出错: ', error)
      })
  }

  private syncDeviceList(): any {
    this.netcall
      .getDevicesOfType(this.WebRTC.DEVICE_TYPE_AUDIO_IN)
      .then(data => {
        this.deviceList.audio = data
      })
    this.netcall.getDevicesOfType(this.WebRTC.DEVICE_TYPE_VIDEO).then(data => {
      this.deviceList.video = data
    })
  }

  /**
   * ----------------------------------------
   * ----------------------------------------
   */
}
