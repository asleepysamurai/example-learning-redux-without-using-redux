/**
 * Utility functions
 */

function generateID() {
    return Date.now().toString(36) + '-' + (Math.random() + 1).toString(36).substring(7);
};

export {
    generateID
};
