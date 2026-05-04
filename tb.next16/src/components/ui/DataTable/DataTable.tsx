"use client";

import {
  NoSsr,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import React, { ChangeEvent, FC, JSX, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  DEFAULT_PER_PAGE,
  DEFAULT_PER_PAGE_OPTIONS,
  NO_DATA
} from "@/utils/constants";

import {
  ActionColumn,
  ActionsMenuColumn,
  ActiveColumn,
  CheckBoxColumn
} from "./DataTable.components";
import { HeadRow } from "./DataTable.style";
import {
  ACTIONS,
  ACTIONS_MENU,
  ACTIVE,
  CHECKBOX,
  CUSTOM_ELEMENT,
  Order,
  STATUS
} from "./Datatable.constants";

interface DataTableProps {
  rows?: any[];
  headCells: any[];
  selector?: (_state: any) => any;
  tableId?: string;
  header?: React.ReactNode;
  total?: number;
  onPageChange?: (_data: { page: number }) => void;
  onRowsPerPageChange?: (_data: { page: number; limit: number }) => void;
  onOrder?: (_data: { direction: string; column: string }) => void;
  disableSort?: boolean;
  disablePaging?: boolean;
  footer?: React.ReactNode;
}

interface EnhancedTableHeadProps {
  order: Order;
  orderBy: string;
  headCells: any[];
  disableSort?: boolean;
  tableId?: string;
}

const EnhancedTableHead = ({
  order,
  orderBy,
  headCells
}: EnhancedTableHeadProps) => {
  return (
    <TableHead>
      <HeadRow>
        {headCells.map(
          ({ id, align = "left", label, minWidth, renderHeader }) => {
            return (
              <TableCell
                key={id}
                align={align}
                sortDirection={orderBy === id ? order : false}
                sx={{
                  whiteSpace: "nowrap",
                  minWidth,
                  maxWidth: "400px",
                  overflowWrap: "break-word",
                  wordBreak: "break-word"
                }}
              >
                {label}
                {renderHeader?.()}
              </TableCell>
            );
          }
        )}
      </HeadRow>
    </TableHead>
  );
};

const DataTable: FC<DataTableProps> = ({
  rows = [],
  headCells = [],
  selector,
  tableId = "",
  header = null,
  total = rows?.length,
  onPageChange = undefined,
  onRowsPerPageChange = undefined,
  disableSort = false,
  disablePaging = false,
  footer = null
}) => {
  const data =
    useSelector(selector ?? (() => ({ table: undefined }))).table ?? {};
  const tableDetails = selector ? data?.details : rows;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_PER_PAGE);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setCurrentPage(newPage);
    onPageChange?.({ page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setCurrentPage(0);
    onRowsPerPageChange?.({ page: 1, limit: newLimit });
  };

  const getContent = ({
    headId,
    row,
    children,
    tableId,
    type,
    onClick,
    render
  }: {
    headId: string;
    row: any;
    children: any[];
    tableId: string;
    type?: string;
    onClick?: (_row: any, value: string | boolean) => void;
    render?: (_row: any) => JSX.Element;
  }) => {
    if (type === CHECKBOX) {
      return (
        <CheckBoxColumn
          defaultChecked={row?.[headId]}
          onClick={(value) => onClick?.(row, value)}
          disabled={typeof onClick !== "function"}
          headId={headId}
        />
      );
    }

    if (type === STATUS) {
      return <ActiveColumn currentStatus={row?.[headId]} />;
    }

    if (type === CUSTOM_ELEMENT) {
      return render?.(row) ?? <></>;
    }

    const contentMap: Record<string, JSX.Element> = {
      [ACTIONS]: (
        <ActionColumn tableId={tableId} rowData={row} data={children} />
      ),
      [ACTIONS_MENU]: (
        <ActionsMenuColumn tableId={tableId} rowData={row} data={children} />
      ),
      [ACTIVE]: <ActiveColumn currentStatus={row?.[headId]} />
    };

    return contentMap[headId] ?? render?.(row) ?? row?.[headId] ?? "";
  };

  const resetDataTable = () => {
    setCurrentPage(0);
    setRowsPerPage(DEFAULT_PER_PAGE);
    setOrderBy("");
  };

  useEffect(() => {
    resetDataTable();
  }, [data?.reset]);

  return (
    <NoSsr>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {header && <div className="p-3">{header}</div>}
        <TableContainer sx={{ overflow: "auto" }}>
          <Table sx={{ minWidth: "1000px", tableLayout: "auto" }}>
            {/* {"Create Hander"} */}
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              headCells={headCells}
              disableSort={disableSort}
              tableId={tableId}
            />

            <TableBody>
              {tableDetails.length > 0 ? (
                tableDetails.map((row: any, index: number) => {
                  const rowId = row.id ?? index;
                  return (
                    <TableRow key={`${tableId}-${rowId}-${index}`}>
                      {headCells.map(
                        ({
                          id: headId,
                          align = "left",
                          children = [],
                          type,
                          onClick,
                          render
                        }) => {
                          const content = getContent({
                            headId,
                            row,
                            children,
                            tableId,
                            type,
                            onClick,
                            render
                          });

                          return (
                            <TableCell
                              key={headId}
                              align={align}
                              sx={{ maxWidth: "400px" }}
                            >
                              {content}
                            </TableCell>
                          );
                        }
                      )}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={headCells.length} align="center">
                    {NO_DATA}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {!disablePaging && (
          <TablePagination
            rowsPerPageOptions={DEFAULT_PER_PAGE_OPTIONS}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
        {footer}
      </Paper>
    </NoSsr>
  );
};

export default DataTable;
