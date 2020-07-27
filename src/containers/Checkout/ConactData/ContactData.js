import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        oerderForm: {
            name: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Your Name' },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Street' },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'ZIP code' },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Country' },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: { type: 'email', placeholder: 'Your Email' },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                    value: ''
                }
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }));
    }

    inputChangedHandler = (event) => {
      console.log(event.target.value);
    }

    render() {

        const formElementArray = [];
        for (let key in this.state.oerderForm) {
            formElementArray.push({
                id: key,
                config: this.state.oerderForm[key]
            });
        }


        let form = (<form >
            {formElementArray.map(formElemnt => (
                <Input
                    key={formElemnt.id}
                    elementType={formElemnt.config.elementType}
                    elementConfig={formElemnt.config.elementConfig}
                    value={formElemnt.config.value}
                    changed={this.inputChangedHandler}
                />
            ))}
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;