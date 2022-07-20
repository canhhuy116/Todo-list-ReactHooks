import * as React from 'react';
import './styleButton.scss';

interface PropsBtn {
  nameBtn: string;
  className: string;
  isDisableButton: boolean;
  onClickButton: () => void;
}

function Button({
  nameBtn,
  className,
  isDisableButton,
  onClickButton,
}: PropsBtn) {
  return (
    <button
      type="button"
      disabled={isDisableButton}
      className={`${className} Btn`}
      onClick={onClickButton}
    >
      <span className="NameBtn">{nameBtn}</span>
    </button>
  );
}

export default Button;
