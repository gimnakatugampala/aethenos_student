export const FormatVideoTimeLengthShow = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let leftoverSeconds = seconds % 60;

    let timeString = "";

    // If seconds are exactly 0, display "0m"
    if (seconds === 0) {
        return "0m";
    }

    // If only seconds are present and less than 60, round up to 1 minute
    if (hours === 0 && minutes === 0 && leftoverSeconds > 0) {
        minutes = 1;
        leftoverSeconds = 0;
    }

    // If remaining seconds are 30 or more, round up to the next minute
    if (leftoverSeconds >= 30) {
        minutes += 1;
    }

    // Add hours and minutes
    if (hours > 0) {
        timeString += `${hours}h `;
    }

    if (minutes > 0 || (hours === 0 && minutes === 0)) {
        timeString += `${minutes}m`;
    }

    return timeString.trim(); // Remove trailing space if exists
};
