import styled from "styled-components";

export const OverlaySearchContainer = styled.div`
    display: none; /* Inicialmente oculto */
    position: absolute;
    top: 55px; /* Alinhamento abaixo do input */
    width: inherit;
    max-width: 960px;
    background-color: #F1F7FC;
    border: 1px solid #DEE1E6;
    border-top: none;
    color: #406a76;
    
    // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    padding: 0 16px;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    border-radius: 50px

    z-index: 1000;
`