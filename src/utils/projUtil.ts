import proj4 from 'proj4'

export default class ProjUtil {
  private static instance = new ProjUtil()

  public static getInstance(): ProjUtil {
    if (!ProjUtil.instance) {
      ProjUtil.instance = new ProjUtil()
    }
    return this.instance
  }

  private epsg4326 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

  private epsg3857 = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs';

  public transform(lonLat: number[]): any {
    // return proj4.transform(this.epsg4326, this.epsg3857, lonLat)
  }
}
