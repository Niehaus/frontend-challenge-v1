import styled from 'styled-components'
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';
import { Link } from 'react-router-dom';

export const SearchContainer = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    width: 100%;
`

export const InputSearch = styled.input`
    background-color: #F1F7FC;
    border: 1px solid #DEE1E6;
    outline: #DEE1E6;
    line-height: 300%;
    font-size: 16px;
    font-weight: 400;
    cursor: default;
    color: #406a76;
    border-radius: 50px;
    padding: 0 16px;
    width: 100%;

    &:placeholder {
        color: #406a76;
        opacity: 0;
    }
`

export const Icon = styled(SearchIcon)`
    position: relative;
    right: 32px;

    @media (min-width: 992px) {
        right: 42px;
    }
`

export const OverlaySearchContainer = styled.div`
    position: absolute;
    top: 55px; /* Alinhamento abaixo do input */
    width: inherit;
    max-width: 960px;
    background-color: #F1F7FC;
    border: 1px solid #DEE1E6;
    border-top: none;
    color: #406a76;

    padding: 0 8px;
    
    // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;

    z-index: 1000;

    max-height: 40dvh;
    overflow: auto
`

export const OverlaySearchResultContainer = styled.ul`
    list-style: none;
    margin: 0;
    padding: 10px;
`

export const OverlaySearchResultItem = styled.li`
    display: flex;
    align-items: center;


    list-style: none;
    padding: 16px;
    cursor: pointer;
    border-radius: 50px;

    &:hover {
        background-color: #DAF6F3;
    }
`

export const OverlaySearchResultItemImg = styled.li`
    max-width: 40px;
`

export const OverlaySearchResultItemContent = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
`

export const OverlaySearchResultEmpty = styled.li`
    list-style: none;
    padding: 8px 16px;
`

export const ResultLink = styled(Link)`
    color: inherit;

    &:hover {
        color: inherit;
    }
`