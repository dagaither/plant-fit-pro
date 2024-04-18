import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const About = () => {
    return (
        <>
        <h2 className="mainH2">About Rick and Morty</h2><br />
        <Container className="py-2 text-white" style={{fontFamily: "Courier New"}}>
            <Row>
                <Col>
                    <p>Welcome to my Rick and Morty page!</p>
                    <p>Rick and Morty is an American animated science fiction sitcom created by Justin Roiland and Dan Harmon.</p>
                    <p>The show follows the misadventures of an eccentric and alcoholic scientist named Rick Sanchez and his good-hearted but easily influenced grandson, Morty Smith. Together, they embark on interdimensional escapades that often lead to bizarre and surreal encounters.</p>
                    <p>First premiered in 2013, Rick and Morty has garnered a cult following for its dark humor, clever storytelling, and exploration of complex themes such as existentialism, morality, and the nature of reality.</p>
                    <p>The series is known for its intricate plotlines, rich character development, and imaginative world-building, drawing viewers into a universe filled with eccentric characters, alternate dimensions, and cosmic phenomena.</p>
                    <p>With its unique blend of comedy, satire, and science fiction, Rick and Morty has become a cultural phenomenon, inspiring a passionate fanbase and earning critical acclaim.</p>
                    <p>Whether you're a seasoned fan or new to the series, join us as we explore the multiverse of Rick and Morty and dive into the weird and wonderful world of one of the most inventive animated series of our time.</p>
                    <p>So buckle up, grab your portal gun, and get ready for an adventure across dimensions with Rick and Morty!</p>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default About;
