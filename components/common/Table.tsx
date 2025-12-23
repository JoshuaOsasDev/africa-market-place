"use client";
import { createContext, ReactNode, useContext } from "react";


type TableContextType = {
  columns: string;
};

const TableContext = createContext<TableContextType>({
  columns: "",
});


function Table({
  columns,
  children,
}: {
  columns: string;
  children: ReactNode;
}) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="mt-2 w-full overflow-x-auto">
        <div
          role="table"
          className="min-w-[1200px] overflow-hidden rounded-lg border-b border-[#F0F1F3] bg-white shadow-sm"
        >
          {children}
        </div>
      </div>
    </TableContext.Provider>
  );
}



type BaseRowProps = {
  columns: string;
  as?: React.ElementType;
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const BaseRow = ({
  columns,
  as: Component = "div",
  className,
  children,
  ...rest
}: BaseRowProps) => {
  return (
    <Component
      className={`grid items-center ${className ?? ""}`}
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



function Header({ children }: { children: ReactNode }) {
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


function Row({ children }: { children: ReactNode }) {
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



type BodyProps<T> = {
  data: T[];
  render: (item: T, index: number) => ReactNode;
};

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data || data.length === 0) {
    return (
      <p className="m-6 text-center text-base font-medium">
        No data to show at the moment
      </p>
    );
  }

  return (
    <section className="my-1">
      {data.map((item, index) => render(item, index))}
    </section>
  );
}


function Footer({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <footer>{children}</footer>;
}


Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
