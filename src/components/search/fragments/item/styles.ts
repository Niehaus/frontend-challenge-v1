import { Link } from "react-router-dom"
import styled from "styled-components"

export const Item = styled.li`
    display: flex;
    align-items: center;


    list-style: none;
    padding: 16px;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
        background-color: #DAF6F3;
    }
`

export const ItemImg = styled.div`
    max-width: 40px;
    flex-shrink: 0;
`

export const ItemContent = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;

    flex-grow: 1;
`

export const Empty = styled.li`
    list-style: none;
    padding: 8px 16px;
`

export const ResultLink = styled(Link)`
    color: inherit;

    &:hover {
        color: inherit;
    }
`