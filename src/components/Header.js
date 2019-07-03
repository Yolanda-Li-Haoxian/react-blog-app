/**
 * Created by lihaoxian on 2019/6/25.
 */
import React, {Component} from 'react';
import {Navbar,Nav,NavDropdown,Form,FormControl, Button} from 'react-bootstrap';
import emitter from '../events';

class Header extends Component {
    handleCreate (){
        emitter.emit('create','hello')
    }
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Type" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=>alert(111)}>Front-end dev</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>alert(222)}>Back-end dev</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <Button onClick={this.handleCreate.bind(this)}>Create</Button>
                    </Nav>

                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default Header;