
export const generateSlug = (name: string): string => {
  // const string = name.toLowerCase().replace("/[^a-z0-9]+/g", "-")
  // return string.toLowerCase().replaceAll(" ", "-")
  let slug = name.toLowerCase();

  // Remove special characters (keeping letters, numbers, and spaces)
  slug = slug.replace(/[^a-z0-9\s-]/g, '');

  // Replace spaces and multiple hyphens with a single hyphen
  slug = slug.replace(/\s+/g, '-').replace(/-+/g, '-');

  // Trim leading and trailing hyphens
  slug = slug.replace(/^-+/, '').replace(/-+$/, '');

  return slug;
}
