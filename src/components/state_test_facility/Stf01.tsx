import React from "react";

interface STF_module_props {
  CSS_input: string;
  value01: string;
  onDataFromChild?: any;
}

const Stf01 = ({ CSS_input, value01, onDataFromChild }: STF_module_props) => {
  const sendDataToParent = () => {
    onDataFromChild("Stardust");
  };
  return (
    <div className={CSS_input}>
      <button
        className="px-3 py-1 text-sm leading-normal bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={sendDataToParent}
      >
        {value01}
      </button>
    </div>
  );
};

export default Stf01;
