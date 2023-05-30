import React from "react";
import "./Popup.css";

export interface PopupProps {
  onClose: () => void;
  children?: React.ReactNode | React.ReactNode[];
}

const Popup = (props: PopupProps) => {
  return (
    <div className="popup">
      <div className="popup_inner">
        {props.children}
        <button onClick={props.onClose}>close me</button>
      </div>
    </div>
  );
};

export default Popup;
