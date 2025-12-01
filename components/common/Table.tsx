"use client";
import { createContext, ReactNode, useContext } from "react";

const TableContext = createContext({ columns: "" });

function Table({
  columns,
  children,
}: {
  columns: string;
  children: React.ReactNode;
}) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="mt-2 w-full overflow-x-auto">
        <div
          role="table"
          className="min-w-[1200px] overflow-hidden rounded-lg border-b border-[#F0F1F3] bg-white shadow-sm md:min-w-full"
        >
          {children}
        </div>
      </div>
    </TableContext.Provider>
  );
}

Table.Text = function Text({ children }: { children: ReactNode }) {
  return { children };
};

const BaseRow = (props: {
  columns: string;
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const {
    columns,
    as: Component = "div",
    className,
    children,
    ...rest
  } = props;

  return (
    <Component
      className={`grid items-center transition-none ${className || ""}`}
      style={{
        ...rest.style,
        columnGap: "1.5rem",
        gridTemplateColumns: columns,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

function Header({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <BaseRow
      columns={columns}
      as="header"
      role="row"
      className="border-b border-[#F0F1F3] bg-[#F9F9FC] px-5.5 py-4.5 font-semibold tracking-wider"
    >
      {children}
    </BaseRow>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext);

  return (
    <BaseRow
      columns={columns}
      role="row"
      className="border-b border-[#F0F1F3] bg-white px-5.5 py-4.5 transition-colors last:border-b-0 hover:bg-[#FAFAFF]"
    >
      {children}
    </BaseRow>
  );
}

function Body({ data, render, TableBodyClassName = "" }) {
  if (!data || !data.length)
    return (
      <p className="m-6 text-center text-base font-medium">
        No data to show at the moment
      </p>
    );

  return (
    <section className={"my-1 " + (TableBodyClassName || "")}>
      {data.map(render)}
    </section>
  );
}

function Footer({ children }: { children: ReactNode }) {
  if (!children) return null;

  return <footer className="">{children}</footer>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
export default Table;
