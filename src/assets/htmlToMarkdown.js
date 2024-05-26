
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';

export function htmlToMarkdown(htmlText) {
  const file = unified()
    .use(remarkParse)
    .use(remarkStringify)
    .processSync(htmlText);

  return String(file);
}
