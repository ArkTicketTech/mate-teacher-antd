import React from 'react';

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '60px',
      marginBottom: 7,
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

export default DescriptionItem;