import ActionTypes from '../constants/actionTypes';
import { OrdersState, ApiResponseOrderType, DefaultOrderType } from '../store/types';

type OrdersPayload = {
  orders: Array<ApiResponseOrderType>;
};

type Actions = { type: string; payload: OrdersPayload };

const initialState: OrdersState = {
  orders: [],
  error: '',
  success: '',
  loading: false,
};

export default function usersReducer(state = initialState, action: Actions): OrdersState {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.GET_ALL_ORDERS_SUCCESS:
      const ordersTableData: DefaultOrderType[] = payload.orders.map((item: ApiResponseOrderType) => {
        const orderCell: DefaultOrderType = {
          order_number: item.order_number,
          customer_name: item.customer.first_name + item.customer.last_name,
          customer_address: item.customer.address.line1 + ' ' + item.customer.address.line2 + ' ' + item.customer.address.city + ' ' + item.customer.address.state + ' ' + item.customer.address.zip,
          order_value: item.order_details.value,
          order_date: item.order_details.date,
          ship_date: item.shipping_details.date,
          status: item.status,
        }
        
        return orderCell
      });

      return {
        ...state,
        orders: ordersTableData,
        loading: false,
      };
    case ActionTypes.GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
