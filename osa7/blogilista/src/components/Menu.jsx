import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const Menu = ({ logOut }) => {
  const { username } = useSelector(state => state.login)

  const padding = {
    padding: 10,
    textDecoration: 'none',
    color: 'black',
  }

  console.log('username (Menu): ', username)

  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link style={padding} to="/">
              Blog App
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link style={padding} to="/">
                  Blogs
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link style={padding} to="/users">
                  Users
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>{`${username} logged in`}</Navbar.Text>
            <Button type="button" variant="primary" onClick={logOut}>
              <Link style={{ color: 'white', textDecoration: 'none' }} to="/">
                log out
              </Link>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Menu
