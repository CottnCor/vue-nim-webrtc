import Request from '@/utils/request';

const request = new Request();

/**
 * @param  {any} param?
 */
export const getTaskType = (param?: any) => {
  return request.get('api/face-time/getTaskType', param);
};

/**
 * @param  {any} param?
 */
export const getFaceTimeOverview = (param?: any) => {
  return request.get('api/face-time/getFaceTimeOverview', param);
};

/**
 * @param  {any} param?
 */
export const getFaceTimeRecord = (param?: any) => {
  return request.get('api/face-time/getFaceTimeRecord', param);
};

/**
 * @param  {any} param?
 */
export const getFaceTimeList = (param?: any) => {
  return request.get('api/face-time/getFaceTimeList', param);
};

/**
 * @param  {any} param?
 */
export const editFaceTimeState = (param?: any) => {
  return request.get('api/face-time/editFaceTimeState', param);
};