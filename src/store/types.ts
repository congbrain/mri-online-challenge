export interface ApiResponseOrderType {
    customer: {
        first_name: string;
        last_name: string;
        address: {
            line1: string;
            line2: string;
            city: string;
            state: string;
            zip: string;
        };
    };
    order_details: {
        date: string;
        value: number;
    };
    order_number: number;
    shipping_details: {
        date: string;
    };
    status: string;
}

export interface DefaultOrderType {
    order_number: number,
    customer_name: string,
    customer_address: string,
    order_value: number,
    order_date: string,
    ship_date: string,
    status: string
}
  
  
export type OrdersState = {
    orders: Array<DefaultOrderType>;
    error: string;
    success: string;
    loading: boolean;
}

export type RootState = {
    orders: OrdersState;
};