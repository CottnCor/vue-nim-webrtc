const TdtKey = '0592e6141496da4ac134903ad99a76e3'

export const MAP_URL = {
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

export const MAP_CENTER = {
  LAT: 74.66292249033845,
  LNG: 100.94238281250001
}

export const MAP_BOUND = {
  MAX_LAT: 76.44490733708945,
  MAX_LNG: 116.67480468750001,
  MIN_LAT: 72.54790992192898,
  MIN_LNG: 86.66015625000001
}
