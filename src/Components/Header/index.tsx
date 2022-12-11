import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand>Fake Alibaba</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={styles.links}>
                    <Link to={"/"} >Home</Link>
                    <Link to={"/orders"} >
                        Orders
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}
export default Header