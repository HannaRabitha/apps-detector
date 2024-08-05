import React from 'react';

const Container = (props) => {
  return (
    <div
      className={`container px-8 w-full pt-24 pb-0 mx-auto ${
        props.className ? props.className : ''
      }`}
    >
      {props.children}
    </div>
  );
};

export default Container;
