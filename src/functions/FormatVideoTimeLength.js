import React from 'react';

export const FormatVideoTimeLength = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const leftoverSeconds = seconds % 60;

    let timeString = "";

    // Add hours, minutes, and seconds with short labels if they are greater than 0
    if (hours > 0) {
        timeString += `${hours}h `;
    }
    if (minutes > 0) {
        timeString += `${minutes}m `;
    }
    if (leftoverSeconds > 0 || (hours === 0 && minutes === 0)) {
        timeString += `${leftoverSeconds}s`;
    }

    return timeString.trim();  // Remove trailing space
};
