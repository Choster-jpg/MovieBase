export function removeHtml(html) {
    let result = html.replace(/<[^>]*>/g, '');
    return result.replace(/&nbsp;/g, "");
}