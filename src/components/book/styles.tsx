import styled from "styled-components";

export const BookContainer = styled.div`
    display: flex;
    color: #406a76;

    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`

export const ThumbnailContent = styled.div``
export const Thumbnail = styled.img`
    width: 120px;

    @media (min-width: 768px) {
        width: 160px;
    }
`

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;

    font-weight: 600;
`

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        padding: 12px;
    }
`

export const DescriptionWrapper = styled.span`
    font-size: 14px;
    margin: 12px 0;
    text-align: justify;
`

export const CategoriesWrapper = styled.div`
    display: flex;
    align-items: center;

    padding: 4px 0;
`

export const CategoryTag = styled.span`
    padding: 4px 16px;
    background-color: #45d0c1;
    color: white;

    border-radius: 50px;

    font-size: 14px
`

export const RatingTag = styled.span`
    padding: 4px;
    margin: 0 4px;
    color: white;

    border-radius: 40px;

    font-size: 14px;
    width: 32px;
    height: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
`
