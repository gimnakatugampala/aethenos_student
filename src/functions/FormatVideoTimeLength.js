import React from 'react';

export const FormatVideoTimeLength = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);  // Use 'let' to allow reassignment
    const leftoverSeconds = seconds % 60;

    let timeString = "";

    // If only seconds are present and less than 60 seconds, round up to 1 minute
    if (hours === 0 && minutes === 0 && leftoverSeconds > 0) {
        minutes = 1;
    }

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
