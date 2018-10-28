import React from 'react';
import PropTypes from 'prop-types';

function Question(props) {

  return (
    <h2 className="question">{props.content} (打分越高代表越满意)</h2>
  );

}

Question.propTypes = {
  content: PropTypes.string
};

export default Question;
