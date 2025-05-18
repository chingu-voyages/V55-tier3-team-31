export const formatDate = () => {
    const _date = new Date();
    const formattedDate = _date.toLocaleDateString("en-us",{
        weekday:'long',
        year:'numeric',
        month:'long',
        day:'numeric'
    })
    return formattedDate;
}