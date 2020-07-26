import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use((request, error) => {
                this.setState({ error: null });
                return request;
            });

            axios.interceptors.response.use((response, error) => {
                this.setState({ error: error });
                return response;
            });
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        clicked={this.errorConfirmedHandler}
                        show={this.state.error}
                    >
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;