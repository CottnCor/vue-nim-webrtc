const TdtKey = '0592e6141496da4ac134903ad99a76e3'

const MapboxToken =
  'pk.eyJ1IjoiaW50bWlub3IiLCJhIjoiY2p2ZW1lem83MG9vNzQ0bzZpenQ2ODlsYyJ9.InmY47CW_yv26kVg2GWIDQ'

export const MAP_URL = {
  STREETS: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${MapboxToken}`,
  SATELLITE: `https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=${MapboxToken}`,
  IMG: `https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TdtKey}`,
  VEC: `https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TdtKey}`,
  CVA: `https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TdtKey}`,
  CIA: `https://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TdtKey}`,
  IBO: `https://t0.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TdtKey}`,
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
