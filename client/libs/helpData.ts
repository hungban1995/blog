type slugFunction = (values: string) => string

export const Slugify: slugFunction = (values) => {
    const slug = values
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove non-word characters
        .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and dashes with a single dash
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes

    return slug;
}