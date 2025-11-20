/**
 * Converts a string to a URL-friendly slug
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 * 
 * @example
 * createSlug("Sossusvlei Desert Lodge") // "sossusvlei-desert-lodge"
 * createSlug("Etosha Safari Resort!") // "etosha-safari-resort"
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove all characters that are not alphanumeric or hyphens
    .replace(/[^\w\-]+/g, '')
    // Replace multiple consecutive hyphens with a single hyphen
    .replace(/\-\-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

