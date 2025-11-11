export type searchFieldCompType = 
    {
        inputPlaceholder: string
        inputTextStyle: string
        inputDivStyle: string,
        inputState: string,
        setInputState: React.Dispatch<React.SetStateAction<string>>
    }


export type sliderCardPropType = {
    imgUrl: string,
    link: string, 
    alt: string,
    id: number
}