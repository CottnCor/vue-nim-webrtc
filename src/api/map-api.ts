import Request from '@/utils/request';

const request = new Request();

/**
 * @param  {any} param?
 */
export const getVisibleJctb = (param?: any) => {
  return request.get('api/common/spot/getVisibleJctb', param);
};