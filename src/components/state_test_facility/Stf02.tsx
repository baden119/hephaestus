import React from "react";

interface STF_module_props {
  CSS_input: string;
  value02: string;
  onDataFromChild?: any;
}

const Stf02 = ({ CSS_input, value02, onDataFromChild }: STF_module_props) => {
  const sendDataToParent = () => {
    onDataFromChild("Mixing Up The Medicine");
  };

  return (
    <div className={CSS_input}>
      <button
        className="px-3 py-1 text-sm leading-normal bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={sendDataToParent}
      >
        {value02}
      </button>
    </div>
  );
};

export default Stf02;
