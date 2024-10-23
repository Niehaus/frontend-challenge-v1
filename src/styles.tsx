import styled from "styled-components";

export const RoutesContainer = styled.div`
  height: calc(100dvh - 120px);
  overflow: auto;
  margin-top: 160px;

  @media (min-width: 768px) {
    margin-top: 180px;
  }

  @media (min-width: 992px) {
    margin-top: 105px;
  }
`;
