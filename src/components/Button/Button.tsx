import * as React from 'react';
import './styleButton.scss';

interface PropsBtn {
  nameBtn: string;
}

function Button({ nameBtn }: PropsBtn) {
  return (
    <button type="button" className="Btn">
      <span className="NameBtn">{nameBtn}</span>
    </button>
  );
}

export default Button;
