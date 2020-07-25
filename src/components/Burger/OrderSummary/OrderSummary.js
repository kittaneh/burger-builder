import React from 'react';

import classes from './OrderSummary.css';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey) => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            );
        })

    return (
        <Aux>
            {/* <div className={classes.OrderSummary}></div> */}
            <h3>Your Order</h3>
            <p>A delecious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout ?</p>
        </Aux>
    );
}

export default orderSummary;