import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody , Label, Col, Row  } from 'reactstrap'
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { BASE_URL } from '../shared/base_url';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navFlagOpen: false,
            ModalFlagOpen: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(values) {
        console.log("current state is : " + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }


    toggleModalFunc = () => {

        this.setState(
            {
                ModalFlagOpen: !this.state.ModalFlagOpen
            }
        );

    }

    render() {
        return (
            <view>
                <Button outline onClick={this.toggleModalFunc}><span className="fa fa-edit"></span> Submit Comment</Button>
                <Modal isOpen={this.state.ModalFlagOpen} toggle={this.toggleModalFunc}>
                    <ModalHeader toggle={this.toggleModalFunc}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="message" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </view>

        )
    }
}

function RenderDish({ dish }) {

    if (dish.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (dish.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{dish.errMess}</h4>
                </div>
            </div>
        );
    }else if (dish != null) {
        return (
            <div className='col-12 col-md-5 mt-1'>
                <Card>
                    <CardImg width="50%" height="50%" src={BASE_URL + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

function RenderComments({ commentsArr, dishId , addComment  }) {
    if (commentsArr != null) {
        return (
            <div className='col-12 col-md-5 mt-1'>
                <h4>Comments</h4>
                {
                    commentsArr.map((dishCom) => {
                        return (
                            <ul className='list-unstyled' key={dishCom.id} >
                                <li>{dishCom.comment}</li>
                                <li>--{dishCom.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(dishCom.date)))}</li>
                            </ul>
                        );
                    })
                }
                <CommentForm dishId={dishId} addComment={addComment} />

            </div>
        );
    } else {
        return (
            <div>
            </div>
        );
    }

}



class DishdetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navFlagOpen: false,
            ModalFlagOpen: false,
        }

    }




    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.singleDish.name}</BreadcrumbItem>

                        <BreadcrumbItem>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.singleDish.name}</h3>
                        <hr />
                    </div>
                </div>

                <div className='row'>
                    <RenderDish dish={this.props.singleDish} />
                    {this.props.singleDish !== undefined ?
                        <RenderComments commentsArr={this.props.comments} dishId={this.props.singleDish.id} addComment={this.props.addComment}/> :
                        <div></div>
                    }

                </div>
            </div>
        );
    }
}



export default DishdetailComponent;