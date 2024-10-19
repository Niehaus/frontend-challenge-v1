import React, { useState } from "react";
import {  OverlaySearchContainer } from "./styles";
import { OverlayInput } from "./types";

const Overlay: React.FC<OverlayInput> = () => {
  return (
    <OverlaySearchContainer id="searchOverlay">
        <ul id="searchResults"> resultados aqui</ul>
    </OverlaySearchContainer>
  );
};

export default Overlay;
