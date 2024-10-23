import styled from 'styled-components'
import { ReactComponent as User } from '../../assets/person-icon.svg';

export const Container = styled.div`
    background-color: #45d0c1;
    position: absolute;
    top: 0;
    padding: 16px 0;
    width: 100%;
    z-index: 10;
    
    @media (min-width: 992px) {
        left: 0;
        right: 0;
    }
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 992px) {
        margin: 0 auto;
        flex-direction: row;
        justify-content: space-around;
    }
    @media (min-width: 1440px) {
        max-width: 1433px;
    }
`

export const ContentSearch = styled.div`
    display: flex;
    align-items: center;
    width: 70%;
    margin: 16px 0 8px;

    @media (min-width: 992px) {
        width: 50%;
        margin: 0;
        padding-right: 0;
    }
`

export const ContentUser = styled.div` 
    display: none;
    border: 1px solid #dee1e6;
    padding: 12px 16px;
    border-radius: 12px;
    margin: 8px 0;

    &:hover {
        border-color: #86878b;
    }

    @media (min-width: 992px) {
        display: block;
        margin: 0 6px;
    }
`

export const ContentUserLink = styled.a`
    text-decoration: none;
    color: #DAF6F3;
    font-weight: 700;

    &:hover {
        color: #86878b;
    }
`

export const UserButton = styled.button`
    display: block;
    background-color: transparent;
    position: relative;
    right: -55px;
    width: 42px;

    &:focus {
        outline: none;
    }

    &:focus-visible {
        outline: none;
    }

    &:hover {
        border: none;
    }

    @media (min-width: 992px) {
        display: none;
    }
`
export const Icon = styled(User)`
    width: 42px;
`

export const ContentLogo = styled.div``
export const Logo = styled.a`
    padding-left: 60px
`
