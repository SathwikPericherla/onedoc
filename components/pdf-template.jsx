import * as React from "react";

export const PDFTemplate = ({ name }) => {
  return (
    <div>
      <h1> Hello {name} !</h1>
      <p>This is the sample pdf generated using React and Onedoc API</p>
    </div>
  );
};