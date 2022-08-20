import React from 'react';
import './image.component.css';

export interface IImageProps {
  imageUrl: string;
  size: string;
}

const Image = ({ imageUrl, size }: IImageProps) => (
  <span
    className="image"
    style={{
      backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
      width: size,
      height: size,
    }}
  />
);

export default Image;
