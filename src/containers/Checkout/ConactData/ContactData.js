import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Your Name' },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Street' },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'ZIP code' },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: { type: 'text', placeholder: 'Country' },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: { type: 'email', placeholder: 'Your Email' },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                },
                value: '',
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
        loading: false
    }

    chechValidity = (value, rules) => {
        let isValid = true;

        if(!rules){
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let id in this.state.orderForm) {
            formData[id] = this.state.orderForm[id].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }));
    }

    inputChangedHandler = (event, id) => {

        const updatedOrderForm = {
            ...this.state.orderForm //doesnt deep clone
        };

        const updatedFormElement = {
            ...updatedOrderForm[id]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.chechValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[id] = updatedFormElement;

        let formIsValid = true;
        for (let id in updatedOrderForm) {
            formIsValid = updatedOrderForm[id].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {

        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }


        let form = (<form onSubmit={this.orderHandler}>
            {formElementArray.map(formElemnt => (
                <Input
                    key={formElemnt.id}
                    elementType={formElemnt.config.elementType}
                    elementConfig={formElemnt.config.elementConfig}
                    value={formElemnt.config.value}
                    invalid={!formElemnt.config.valid}
                    shouldValidate={formElemnt.config.validation}
                    touched={formElemnt.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElemnt.id)}
                />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
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