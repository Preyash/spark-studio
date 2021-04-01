import React from 'react'
import Navbar from './Navbar'
import { Jumbotron, Container } from 'reactstrap';

export default function Layout({ children }) {
    return (
        <main>
            <Navbar />
            <Jumbotron>
                <Container>
                    {children}
                </Container>
            </Jumbotron>
        </main>
    )
}
