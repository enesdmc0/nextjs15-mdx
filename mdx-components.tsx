import Image from "next/image";
import { Link } from "next-view-transitions";
import { highlight } from "sugar-high";
import { ComponentPropsWithoutRef } from "react";
import { MDXComponents } from "mdx/types";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type ImageProps = ComponentPropsWithoutRef<"img"> & {
  src?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
};
type TableProps = ComponentPropsWithoutRef<"table">;
type PreProps = ComponentPropsWithoutRef<"pre">;
type HrProps = ComponentPropsWithoutRef<"hr">;
type DeleteProps = ComponentPropsWithoutRef<"del">;
type InlineCodeProps = ComponentPropsWithoutRef<"code">;

const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <h1 className="font-medium pt-12 mb-0 fade-in" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-red-800 font-medium mt-8 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-gray-800 font-medium mt-8 mb-3" {...props} />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  h5: (props: HeadingProps) => <h5 className="font-medium" {...props} />,
  h6: (props: HeadingProps) => <h6 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="text-gray-800 list-decimal pl-5 space-y-2" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="text-gray-800 list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = "text-blue-500 hover:text-blue-700";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  pre: (props: PreProps) => (
    <pre className="overflow-auto p-4 bg-gray-100 rounded" {...props} />
  ),
  inlineCode: (props: InlineCodeProps) => (
    <code className="bg-gray-100 rounded px-1" {...props} />
  ),
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  img: ({ alt, src, ...props }: ImageProps) => {
    if (src?.startsWith("http")) {
      return (
        <Image
          alt={alt || ""}
          src={src}
          width={800}
          height={400}
          className="max-w-full h-auto my-4"
          {...props}
        />
      );
    }
    return (
      <Image
        alt={alt || ""}
        src={src || ""}
        width={800}
        height={400}
        className="max-w-full h-auto my-4"
        {...props}
      />
    );
  },
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700"
      {...props}
    />
  ),
  hr: (props: HrProps) => (
    <hr className="my-8 border-t border-gray-300" {...props} />
  ),

  del: (props: DeleteProps) => (
    <del className="line-through text-gray-500" {...props} />
  ),

  sup: (props: ComponentPropsWithoutRef<"sup">) => (
    <sup className="text-xs" {...props} />
  ),

  sub: (props: ComponentPropsWithoutRef<"sub">) => (
    <sub className="text-xs" {...props} />
  ),

  details: (props: ComponentPropsWithoutRef<"details">) => (
    <details className="my-4" {...props} />
  ),

  summary: (props: ComponentPropsWithoutRef<"summary">) => (
    <summary className="cursor-pointer font-medium" {...props} />
  ),
  table: (props: TableProps) => (
    <table className="min-w-full border-collapse my-4" {...props} />
  ),

  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-gray-50" {...props} />
  ),

  tbody: (props: ComponentPropsWithoutRef<"tbody">) => (
    <tbody className="divide-y divide-gray-200" {...props} />
  ),

  tr: (props: ComponentPropsWithoutRef<"tr">) => (
    <tr className="hover:bg-gray-50" {...props} />
  ),

  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      {...props}
    />
  ),

  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
