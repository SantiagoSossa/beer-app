import React, { Component } from 'react';
import Backdrop from './Backdrop';

export default class MessageModal extends Component {

    state = {
        modalShow:false
    }

    handleModalOpen = () => {
        console.log("open")
        this.setState({modalShow: true});
    }

    handleModalClose = () => {
        this.setState({modalShow: false});
    }

    render() {
        let buttons = null;
        if(this.props.type == 'delete')
        {
            buttons = 
                <div className="modalConfirm">
                    <h1>Delete Beer</h1> <br />
                    <div className="warning">
                        <i className="fas fa-exclamation-triangle"></i>{this.props.message}
                    </div>
                    <div className="buttons">
                        <button
                            onClick={this.props.modalClosed}
                            className="btn rounded"
                            style={{ opacity: "0.4" }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={this.props.clicked}
                            className="btn btn-warning rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>;
        }
        if(this.props.type == 'update')
        {
            buttons = 
                <div className="modalConfirm">
                    <h1>Edit Beer</h1> <br />
                    <div className="success">
                        {this.props.message}
                    </div>
                    <div className="buttons">
                        <button
                            onClick={this.props.modalClosed}
                            className="btn btn-success rounded"
                        >
                            Ok
                        </button>
                    </div>
                </div>;
        }

        return(
            <div>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className="modalConfirm">
                    <h1>Delete Beer</h1> <br />
                    <div className="warning">
                        <i className="fas fa-exclamation-triangle"></i> Todos los datos
                        correspondientes serán eliminados de forma permanente{" "}
                    </div>
                    {buttons}
                </div>
            </div>
        )
    }
}