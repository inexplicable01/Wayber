import React, { useEffect, useState } from "react";
import SignList from "./SignList";
import SignedList from "./SignedList";
import "gestalt/dist/gestalt.css";

const DocToSignOrReview = () => {
  return (
    <div className="page-content">
      <h4 style={{ textAlign: "center" }}>{`Sign Documents`}</h4>

      <SignList />
      <h4 style={{ textAlign: "center" }}>Review Signed Documents</h4>
      <SignedList />
    </div>
  );
};

export default DocToSignOrReview;
