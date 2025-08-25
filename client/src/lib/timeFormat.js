const timeFormat = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const MinutesRemainder = minutes % 60;

    return `${hours}h ${MinutesRemainder}m`
}

export default timeFormat