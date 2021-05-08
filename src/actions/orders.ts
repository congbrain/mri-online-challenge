import ActionTypes from '../constants/actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';

import { ApiResponseOrderType } from '../store/types';

export function getAllOrders() {
  return (dispatch: Dispatch) => {
    dispatch(request());
    return axios.get('https://gist.githubusercontent.com/ryanjn/07512cb1c008a5ec754aea6cbbf4afab/raw/eabb4d324270cf0d3d17a79ffb00ff3cfaf9acc3/orders.json')
      .then((resp: any) => {
        return dispatch(success(resp.data));
      })
      .catch((error: any) => dispatch(failure(error)));
  };

  function request() {
    return { type: ActionTypes.GET_ALL_ORDERS_REQUEST };
  }
  function success(orders: Array<ApiResponseOrderType>) {
    return { type: ActionTypes.GET_ALL_ORDERS_SUCCESS, payload: { orders } };
  }
  function failure(error: any) {
    return { type: ActionTypes.GET_ALL_ORDERS_FAILURE, payload: error };
  }
}
