import styled from 'styled-components'

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
    color: #406a76;
    
    @media (min-width: 992px) {
        padding: 0 36px;
        margin: 0 auto;
        flex-direction: row;
    }
`

export const LoadingContainer = styled.div`
    flex-grow: 1;
    width: 100%
`