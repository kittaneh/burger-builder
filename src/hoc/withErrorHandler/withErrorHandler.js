import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        constructor(props) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use((request, error) => {
                this.setState({ error: null });
                return request;
            });

            this.respInterseptor = axios.interceptors.response.use((response, error) => {
                this.setState({ error: error });
                return response;
            });

            this.state = {
                error: null
            }
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterseptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        clicked={this.errorConfirmedHandler}
                        modalClosed={this.state.error}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;