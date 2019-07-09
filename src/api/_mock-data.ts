import Request from '@/utils/request';

const request = new Request();

/**
 * @param  {any} param?
 */
export const getLawWorks = (param?: any) => {
    return request.get('law-works.json', param);
};

/**
 * @param  {any} param?
 */
export const getPeopleCoords = (param?: any) => {
  return request.get('api/people/getPeopleCoords', param);
};