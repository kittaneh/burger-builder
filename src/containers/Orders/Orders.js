import React from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends React.Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                let fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({ orders: fetchedOrders, loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map((order, key) => {
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                })}
            </div>
        );
    }

}


export default Orders;
