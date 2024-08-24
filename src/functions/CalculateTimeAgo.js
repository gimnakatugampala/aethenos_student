import React from 'react'

const CalculateTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
  
    const years = Math.floor(seconds / 31536000);
    const months = Math.floor((seconds % 31536000) / 2592000);
    const days = Math.floor((seconds % 2592000) / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    if (years > 0) return years === 1 ? 'A year ago' : `${years} years ago`;
    if (months > 0) return months === 1 ? 'A month ago' : `${months} months ago`;
    if (days > 0) return days === 1 ? 'A day ago' : `${days} days ago`;
    if (hours > 0) return hours === 1 ? 'An hour ago' : `${hours} hours ago`;
    if (minutes > 0) return minutes === 1 ? 'A minute ago' : `${minutes} minutes ago`;
    return 'just now';
  };

export default CalculateTimeAgo