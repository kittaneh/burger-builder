import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = () => {

    }

    render() {
        return (
            <div className={classes.ContactData}>
                <hr4>Enter your Contact Data</hr4>
                <form >
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
                    <input className={classes.Input} type="text" name="email" placeholder="Your Email"></input>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"></input>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }

}

export default ContactData;