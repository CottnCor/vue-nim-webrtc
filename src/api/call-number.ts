import Request from '@/utils/request';

const request = new Request();

/**
 * @param  {any} param?
 */
export const getTaskType = (param?: any) => {
  return request.get('api/people/getUserInfo', param);
};

/**
 * @param  {any} param?
 */
export const getFaceTimeOverview = (param?: any) => {
  return request.get('api/people/getUserInfo', param);
};

/**
 * @param  {any} param?
 */
export const getFaceTimeRecord = (param?: any) => {
  return request.get('api/people/getUserInfo', param);
};

/**
 * @param  {any} param?
 */
export const getFaceTimeList = (param?: any) => {
  return request.get('api/people/getUserInfo', param);
};

/**
 * @param  {any} param?
 */
export const editFaceTimeState = (param?: any) => {
  return request.get('api/people/getUserInfo', param);
};