import React, { Component } from 'react'
import { Navbar, NavbarBrand, Jumbotron, Nav, NavItem, NavbarToggler, Collapse, Modal, ModalHeader, ModalBody, Button , Form , FormGroup ,Input ,Label,Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';


class HeaderComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            navFlagOpen: false,
            ModalFlagOpen: false,
        }

        this.handleForm = this.handleForm.bind(this);
    }

    toggleNavFunc = () => {

        this.setState(
            {
                navFlagOpen: !this.state.navFlagOpen
            }
        );

    }

    toggleModalFunc = () => {

        this.setState(
            {
                ModalFlagOpen: !this.state.ModalFlagOpen
            }
        );

    }
    handleForm(event){

        this.toggleModalFunc();
        alert("this is values of submitted uncontrolled login form : " + 
        "user name : "+this.username.value +" , password : "+this.password.value +"  , remmember : "+this.remember.checked
        );

        event.preventDefault();

    }
    render() {
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModalFunc}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className='container'>
                        <div className='row row-header'>
                            <div className='col-12 col-sm-6'>
                                <h1>Dola Resturant</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.ModalFlagOpen} toggle={this.toggleModalFunc}>
                    <ModalHeader toggle={this.toggleModalFunc}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleForm}>
                            <FormGroup>
                                <Label htmlFor='username' >Username</Label>
                                <Input innerRef ={(input => this.username = input)} type='text' name='username' id='username' />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password' >Password</Label>
                                <Input innerRef ={(input => this.password = input)} type='password' name='password' id='password' />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input innerRef ={(input => this.remember = input)} type='checkbox' name="remember"  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>                        </Form>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}
export default HeaderComponent;