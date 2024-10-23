import styled from "styled-components";


export const Content = styled.div`
    background-color: #fff;
    color: #406a76;

    border-right: 1px solid #dee1e6;
    padding: 32px 12px 0 12px;

    @media (min-width: 992px) {
        margin-right: 12px;
        padding: 0 12px;
        margin: 0 auto;
        min-width: 20%
    }
`
export const ContentTitle = styled.p`
    color: #9EAEB7;
    font-size: 16px;
    font-weight: 700;
`
export const Button = styled.button`
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    padding: 8px 24px;
    width: 100%;
    text-transform: uppercase;
    background-color: #ADB7BF;
`
export const FilterTitle = styled.p`
    color: ;
    font-size: 16px;
    font-weight: 700;
`
export const FilterContent = styled.div`
    & > ul {
        list-style-type: none;
        padding: 0;
        margin-bottom: 8px;
    }
    & > ul > li {
        margin-bottom: 3px;
    }
    & > ul > li > span {
        color: #053B4B;
    }

`