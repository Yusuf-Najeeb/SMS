export const truncateText = (text)=> {
    if(text.length > 12){
        let truncatedText = `${text.slice(0, 12)}...`

        return truncatedText
    }

    return text
}