const TdtKey = '0592e6141496da4ac134903ad99a76e3'

const MapboxToken =
  'pk.eyJ1IjoiaW50bWlub3IiLCJhIjoiY2p2ZW1lem83MG9vNzQ0bzZpenQ2ODlsYyJ9.InmY47CW_yv26kVg2GWIDQ'

export const MAP_URL = {
  STREETS: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${MapboxToken}`,
  SATELLITE: `https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=${MapboxToken}`,
  IMG: `https://maps.ynmap.cn/services/img/map/3857/WMTS?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=tdtYnImg100cm2000_2017&STYLE=default&TILEMATRIXSET=default&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%252fpng`,
  VEC: `https://maps.ynmap.cn/services/vec/map/3857/WMTS?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=tdtYnImg100cm2000_2017&STYLE=default&TILEMATRIXSET=default&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%252fpng`,
  CVA: `https://maps.ynmap.cn/services/cva/map/3857/WMTS?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=tdtYnImg100cm2000_2017&STYLE=default&TILEMATRIXSET=default&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%252fpng`,
  CIA: `https://maps.ynmap.cn/services/cia/map/3857/WMTS?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=tdtYnImg100cm2000_2017&STYLE=default&TILEMATRIXSET=default&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%252fpng`,
  IBO: `https://maps.ynmap.cn/services/ibo/map/3857/WMTS?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=tdtYnImg100cm2000_2017&STYLE=default&TILEMATRIXSET=default&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image%252fpng`,
}

export const MAP_ZOOM = 12

export const MAX_PANTO_TIMES = 6

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

export const MAP_DEFINITION = "https://maps.ynmap.cn/services/img/map/3857?f=pjson"
