/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Nav.Link passhref="true" href="/">
          <Image
            src="../images/vinyl-record.png"
            width="35"
            height="35"
            className="d-inline-block align-top"
          />
        </Nav.Link>
        <h3 style={{ color: '#f7b008' }} className="text-center ml-4 my-2">REAL TRAX</h3>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/engineers">
              <Nav.Link>Engineers</Nav.Link>
            </Link>
            <Link passHref href="/projects">
              <Nav.Link>Projects</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
