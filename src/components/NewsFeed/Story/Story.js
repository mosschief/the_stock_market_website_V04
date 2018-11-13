import React from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import "./Story.css"


export default function Story({title, image, link}) {
  return(
    <Thumbnail href={link} className="story-image" src={image}>
      <h3>{title}</h3>
    </Thumbnail>
  );
}