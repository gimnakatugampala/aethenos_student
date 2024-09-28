import React from 'react';

export const FormatVideoTimeLength = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    let timeString = "";

    if (hours > 0) {
        timeString += `${hours} hr${hours > 1 ? "s" : ""} `;
        timeString += `${minutes} min${minutes > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
        timeString += `${minutes} min${minutes > 1 ? "s" : ""}`;
    } else {
        // Special case for 0 seconds
        timeString = "0 hr 0 min";
    }

    return timeString.trim();
};
