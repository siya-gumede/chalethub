import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS, type Document } from '@contentful/rich-text-types';

interface RichTextRendererProps {
  document: Document;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ document }) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: React.ReactNode) => (
        <strong className="text-chalet-ivory font-semibold">{text}</strong>
      ),
      [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
      [MARKS.CODE]: (text: React.ReactNode) => (
        <code className="font-mono text-sm bg-chalet-charcoal text-chalet-gold px-1.5 py-0.5 rounded">
          {text}
        </code>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: unknown, children: React.ReactNode) => (
        <p className="body-text text-base md:text-lg leading-relaxed mb-6">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (_node: unknown, children: React.ReactNode) => (
        <h2 className="font-display text-2xl md:text-3xl font-bold text-chalet-ivory mt-10 mb-4">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_2]: (_node: unknown, children: React.ReactNode) => (
        <h2 className="font-display text-xl md:text-2xl font-semibold text-chalet-ivory mt-10 mb-4">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (_node: unknown, children: React.ReactNode) => (
        <h3 className="font-display text-lg md:text-xl font-semibold text-chalet-ivory mt-8 mb-3">
          {children}
        </h3>
      ),
      [BLOCKS.UL_LIST]: (_node: unknown, children: React.ReactNode) => (
        <ul className="list-disc list-outside pl-5 space-y-2 mb-6 text-chalet-ivory">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node: unknown, children: React.ReactNode) => (
        <ol className="list-decimal list-outside pl-5 space-y-2 mb-6 text-chalet-ivory">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: unknown, children: React.ReactNode) => (
        <li className="body-text">{children}</li>
      ),
      [BLOCKS.QUOTE]: (_node: unknown, children: React.ReactNode) => (
        <blockquote className="border-l-2 border-chalet-gold pl-6 my-8 text-chalet-muted italic">
          {children}
        </blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="border-chalet-ivory/10 my-10" />,
      [INLINES.HYPERLINK]: (node: { data: { uri: string } }, children: React.ReactNode) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-chalet-gold underline underline-offset-2 hover:text-chalet-ivory transition-colors"
        >
          {children}
        </a>
      ),
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <>{documentToReactComponents(document, options as any)}</>;
};

export default RichTextRenderer;
