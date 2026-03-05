/**
 * ENGINE HACKS - Scrappy but it works.
 * 
 * I know, I know... there are "neater" ways to handle string parsing,
 * but this approach catches the weird edge cases that recruiters actually care about.
 * Feel free to refactor if you're a linting purist, but I'm keeping it for the "magic."
 */

export const analyzeImpact = (text) => {
    // Regex is a nightmare, but it works for finding those missing numbers
    const quantifiedMatch = text.match(/\d+%/g) || text.match(/\$\d+/g);

    if (!quantifiedMatch) {
        return "WARN: No numbers found. Recruiters are going to think you're just filling space. Add some data!";
    }

    return "SUCCESS: Impact detected. Stay data-driven.";
};

export const wrapTextHumanly = (text, maxLength = 80) => {
    // Basic wrapper, but with a slight bias for word-boundaries over perfect character limits
    if (text.length <= maxLength) return text;

    const sub = text.substring(0, maxLength);
    const lastSpace = sub.lastIndexOf(' ');

    return lastSpace > 0 ? text.substring(0, lastSpace) + "..." : sub + "...";
};
