import styled from 'styled-components'

export const ContentResults = styled.div`
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    gap: 24px;
    display: grid;

    @media (min-width: 786px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 992px) {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
`

export const ContentResultsWrapper = styled.div`
    margin: 10px 0;
`

export const ContentResultsCover = styled.div`
    img {
        width: 124px;
        height: 185px;
    }
`

export const ContentResultsTitle = styled.div`
    label {
        font-size: 14px;
        color: #86878b;
    }
`

export const ContentResultsCategory = styled.div`
    span {
        font-size: 14px;
        color: #9EAEB7;
    }
`

export const CategorizedBooksContainer = styled.div`
    margin: 0 0 90px 0;
    padding: 0 24px
`

export const CategoryTitle = styled.h2``
export const CategoryWrapper = styled.div``