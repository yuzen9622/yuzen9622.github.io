export function TypographyH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  );
}
export function TypographyH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
export function TypographyH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}
export function TypographyH4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}
export function TypographyP({ children }: { children: React.ReactNode }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
export function TypographyBlockquote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}
export function TypographyTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">{children}</table>
    </div>
  );
}
export function TypographyList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-primary  ">
      {children}
    </ul>
  );
}
export function TypographyInlineCode({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

export const TypographyThead: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>;

export const TypographyTbody: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <tbody>{children}</tbody>;

export const TypographyTr: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <tr className="even:bg-muted border-t">{children}</tr>;

export const TypographyTh: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
    {children}
  </th>
);

export const TypographyTd: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
    {children}
  </td>
);
