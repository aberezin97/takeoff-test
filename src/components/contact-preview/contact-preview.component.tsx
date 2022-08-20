import React from 'react';
import { ListGroup, ListGroupItemProps } from 'react-bootstrap';
import Image from '../image/image.component';
import './contact-preview.component.css';

export interface IContactPreviewProps extends ListGroupItemProps {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

const ContactPreview = ({
  firstName,
  lastName,
  imageUrl,
  ...otherProps
}: IContactPreviewProps) => {
  return (
    <ListGroup.Item action className="contact-preview" {...otherProps}>
      <Image imageUrl={imageUrl} size="30px" />
      <div className="ms-2">
        <h6 className="m-0">{`${firstName} ${lastName}`}</h6>
      </div>
    </ListGroup.Item>
  );
};

export default ContactPreview;
