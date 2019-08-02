import Request from '@/utils/request';

const request = new Request();

/**
 * @param  {any} param?
 */
export const getPeopleTree = (param?: any) => {
  return request.get('api/people/getPeopleTree', param);
};

/**
 * @param  {any} param?
 */
export const getYxInfo = (param?: any) => {
  return request.get('api/people/getYxInfo', param);
};

/**
 * @param  {any} param?
 */
export const getUserInfo = (param?: any) => {
  return request.get('api/people/getUserInfo', param);
};

/**
 * @param  {any} param?
 */
export const getUserState = (param?: any) => {
  return request.get('api/people/getUserState', param);
};