/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  const [filter, setFilter] = useState('');
  const router = useRouter();

  const onSearch = (event) => {
    event.preventDefault();
    if (filter !== '') {
      router.push(`/search/${filter}`);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="black">
      <Container>
        <Nav.Link passhref="true" href="/">
          <Image
            src="../images/real-trax-high-resolution-logo-color-on-transparent-background.png"
            width="120px"
            height="68px"
            className="d-inline-block align-top"
          />
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" color="gold" />
        <input
          style={{
            backgroundColor: 'white',
            border: 'none',
            height: '40px',
            width: '230px',
            borderRadius: '40px',
            boxShadow: 'none',
            color: 'black',
            outline: 'none',
          }}
          placeholder="Search Projects & Engineers"
          onChange={(event) => setFilter(event.target.value)}
        />
        <button
          style={{
            backgroundColor: '#ffb700',
            border: 'none',
            height: '38px',
            width: '70px',
            borderRadius: '40px',
            boxShadow: 'none',
          }}
          type="submit"
          onClick={(event) => onSearch(event)}
        >Search
        </button>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Link passHref href="/engineers">
              <Nav.Link style={{ color: '#ffb700' }}>Engineers</Nav.Link>
            </Link>
            <Link passHref href="/projects">
              <Nav.Link style={{ color: '#ffb700' }}>Projects</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link style={{ color: '#ffb700' }}>Profile</Nav.Link>
            </Link>
            <Button variant="dark" style={{ color: '#ffb700' }} onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
