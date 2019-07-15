const TdtKey = '0592e6141496da4ac134903ad99a76e3'

const MapboxToken = 'pk.eyJ1IjoiaW50bWlub3IiLCJhIjoiY2p2ZW1lem83MG9vNzQ0bzZpenQ2ODlsYyJ9.InmY47CW_yv26kVg2GWIDQ'

export const MAP_URL = {
  STREETS : `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${MapboxToken}`,
  SATELLITE : `https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=${MapboxToken}`,
  IMG: `https://t0.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=${TdtKey}`,
  VEC: `https://t0.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=${TdtKey}`,
  CVA: `https://t0.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=${TdtKey}`,
  BOUNDARY:
    'https://dd.landcloud.org.cn:4447/mapserver/vmap/GT_HomePage/getMAP?x={x}&y={y}&l={z}&styleId=GT_HomePage',
  LABEL:
    'https://dd.landcloud.org.cn:4447/mapserver/label/GTDP_V3/getImg?x={x}&y={y}&l={z}&styleId=gtdp',
  CBA:
    'https://dd.landcloud.org.cn:4447/mapserver/label/GT_HomePage/getImg?x={x}&y={y}&l={z}&styleId=GT_HomePage',
  WAPPER:
    'https://dd.landcloud.org.cn:4447/mapserver/vmap/GTDP_V3/getMAP?x={x}&y={y}&l={z}&styleId=gtdp'
}

export const MAP_ZOOM = 12

export const MAP_CENTER = {
  LAT: 25.047191912417052,
  LNG: 102.68783569335939
}

export const MAP_BOUND = {
  MAX_LAT: 53.55,
  MAX_LNG: 135.05,
  MIN_LAT: 3.86,
  MIN_LNG: 73.66
}
