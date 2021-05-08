import React from 'react';
import * as redux from "react-redux"
import { cleanup, render, screen, waitFor, act } from '@testing-library/react';
import { mount, ReactWrapper, shallow } from 'enzyme';
import App from './App';
import { DefaultOrderType } from './store/types';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


const mockGetAllOrders = jest.fn()
const spyOnUseDispatch = jest.spyOn(redux, "useDispatch")
const spyOnUseSelector = jest.spyOn(redux, "useSelector")

const mockOrdersStore: DefaultOrderType[] = [
  {
    customer_address: "123 Main Street  Boston MA 02215",
    customer_name: "John Doe",
    order_date: "Mon Feb 01 2021 00:00:00 GMT+0000 (GMT)",
    order_number: 100000,
    order_value: 137.11,
    ship_date: "Wed Feb 03 2021 00:00:00 GMT+0000 (GMT)",
    status: "open"
  },
  {
    customer_address: "555 Broadway  New York NY 12345",
    customer_name: "DakotaFinley",
    order_date: "Sun Mar 01 2021 00:00:00 GMT+0000 (GMT)",
    order_number: 100005,
    order_value: 117.12,
    ship_date: "Tue Mar 03 2021 00:00:00 GMT+0000 (GMT)",
    status: "shipped"
  }
]

describe('App page ,', () => {

  beforeEach(() => {
    cleanup()
    spyOnUseDispatch
      .mockReturnValue(mockGetAllOrders)
      .mockReturnValue(jest.fn())
  })

  afterEach(() => {
    cleanup()
    spyOnUseDispatch.mockClear()
    spyOnUseSelector.mockClear()
  })

  it("Should render page", () => {
    spyOnUseSelector
      .mockReturnValueOnce(mockOrdersStore)
    render(<App />)
    expect(
      screen.getByTestId("sortable-table")
    ).toBeInTheDocument()
  })
  
  it("Should be sorted by customer name by default", async () => {
    spyOnUseSelector
      .mockReturnValueOnce(mockOrdersStore)

    let wrapper: ReactWrapper = mount(
      <App />,
    );
    
    if(wrapper) {
      await act(async () => {
        wrapper.update();
      });
      expect(wrapper.find("#sortable-table tbody tr").at(0).find("td").at(2).text()).toEqual('DakotaFinley');
      expect(wrapper.find("#sortable-table tbody tr").at(1).find("td").at(2).text()).toEqual('John Doe');
    }

    wrapper.unmount();
  })

  it("Should sort the table when clicking the column header", async () => {
    spyOnUseSelector
      .mockReturnValueOnce(mockOrdersStore)

    let wrapper: ReactWrapper = mount(
      <App />,
    );
    
    if(wrapper) {
      (wrapper.find('#sortable-table thead tr th').at(4)).first().simulate('click');
      
      await act(async () => {
        wrapper.update();
      });
      expect(wrapper.find("#sortable-table tbody tr").at(0).find("td").at(4).text()).toEqual('$117.12');
      expect(wrapper.find("#sortable-table tbody tr").at(1).find("td").at(4).text()).toEqual('$137.11');
    }

    wrapper.unmount();

  })
});
