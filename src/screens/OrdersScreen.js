import React, { useEffect } from "react";
import { deleteOrder, listOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading } = orderList;
  const orders =
    orderList && orderList.orders && orderList.orders.data
      ? orderList.orders.data
      : [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, []);

  const deleteHandler = order => {
    dispatch(deleteOrder(order.id));
  };
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="content content-margined">
      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ORDER NUMBER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>SKU</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.order_number}</td>
                  <td>{order.created_at}</td>
                  <td>{order.amount}</td>
                  <td>{order.sku}</td>
                  <td>{order.status}</td>
                  <td>
                    <Link
                      to={"/order/" + order.id}
                      className="button secondary"
                    >
                      Details
                    </Link>{" "}
                    <button
                      type="button"
                      onClick={() => deleteHandler(order)}
                      className="button secondary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default OrdersScreen;
