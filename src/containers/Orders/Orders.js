import React from 'react';

import Order from '../../components/Order/Order';

export default class Orders extends React.Component {

    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }

}

