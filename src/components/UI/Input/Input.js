import React from 'react';

import classes from './Input.css'

const input = props => {


    let inputEelement = null;

    switch (props.elementType) {
        case ('input'):
            inputEelement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('textarea'):
            inputEelement = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputEelement = (<select
                className={classes.InputElement}
                value={props.value}
                onChange={props.changed}
                >
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>);
            break;
        default:
            inputEelement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEelement}
        </div>
    );

}

export default input; 