import styled from 'styled-components'

export const Content = styled.div`
    display: flex;
    margin-bottom: 12px;
    color: #406a76;
    
    @media (min-width: 992px) {
        padding: 0 36px;
        margin: 0 auto;
    }
`

export const LoadingContainer = styled.div`
    flex-grow: 1;
    width: 100%
`