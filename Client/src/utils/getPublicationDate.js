export function getPublicationDate(date) {
    const dateObject = new Date(date);
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let options = { day: 'numeric', month: 'long', year: 'numeric' };

    const timeFormatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const dateFormatted = dateObject.toLocaleDateString('en-US', options);

    return { timeFormatted, dateFormatted }
}