import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {

    return (<div className={classes.CheckoutSummary}>
        <h1>It tastes will!</h1>
        <div style={{ width: '100%', margin: 'auto' }}>
            <Burger ingredients={props.ingredients} />
            <Button btnType="Danger" clicked>CANCEL</Button>
            <Button btnType="Success" clicked>CONTINUE</Button>
        </div>
    </div>);
}

export default checkoutSummary;