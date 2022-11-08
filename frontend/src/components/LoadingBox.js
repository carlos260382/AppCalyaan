// eslint-disable-next-line no-unused-vars
import React from "react";

import { DotSpinner } from "@uiball/loaders";

export default function LoadingBox() {
  return (
    <div>
      <DotSpinner size={60} speed={0.9} color="#494949" />{" "}
    </div>
  );
}
