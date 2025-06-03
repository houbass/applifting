import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  IconButton,
  Stack,
  Typography,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import {
  ArrowDropUp,
  ArrowDropDown,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";

// Types
import { Order, Data, HeadCell, EnhancedTableProps } from "./types";
import { Article } from "@/types/types";

// Utils
import { getComparator, createArticleListData } from "./utils";

const tableTitleStyle = {
  fontZise: "16px",
  fontWeight: 700,
  textWrap: "nowrap",
};

const headCells: readonly HeadCell[] = [
  {
    id: "title",
    label: "Article Title",
  },
  {
    id: "perex",
    label: "Perex",
  },
  {
    id: "author",
    label: "Author",
  },
  {
    id: "comments",
    label: "# of comments",
  },
];

// TODO přesunout do separo componenty + učesat zbytek
function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            size="small"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={{
              minWidth: index < 2 ? "220px" : "auto",
              width: index === 1 ? "100%" : "auto",
            }}
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={tableTitleStyle}
              IconComponent={() => (
                <Stack>
                  <ArrowDropUp fontSize="small" sx={{ opacity: 1, mb: -0.7 }} />
                  <ArrowDropDown fontSize="small" sx={{ mt: -0.7 }} />
                </Stack>
              )}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell key="Actions" sx={tableTitleStyle}>
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface Props {
  data: Article[];
}

export default function ArticlesList({ data }: Props) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("id");
  const [selected, setSelected] = useState<readonly number[]>([]);

  const rows = useMemo(() => {
    return data.map((article, index) =>
      createArticleListData(
        index + 1,
        article.articleTitle,
        article.content,
        article.author,
        article.comments
      )
    );
  }, [data]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  function handleCheck(rowId: number) {
    if (selected.includes(rowId)) {
      setSelected(selected.filter((id) => id !== rowId));
    } else {
      setSelected([...selected, rowId]);
    }
  }

  const visibleRows = useMemo(
    () => [...rows].sort(getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table aria-labelledby="tableTitle" size="small">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = selected.includes(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              const rowValuesArray = Object.values(row).filter(
                (_, i) => i !== 0
              );

              const thisId = data.find(
                (item) => item.articleTitle === row.title
              )?.id;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      checked={isItemSelected}
                      onClick={() => handleCheck(row.id)}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  {rowValuesArray.map((rowItem, index) => {
                    const eclipsed: React.CSSProperties = {
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    };

                    const thisStyle: React.CSSProperties =
                      index !== 2 ? eclipsed : { textWrap: "nowrap" };

                    const text = (
                      <Typography title={row.title} style={thisStyle}>
                        {rowItem}
                      </Typography>
                    );

                    return (
                      <TableCell key={index} scope="row">
                        {index === 0 ? (
                          <Link
                            className="unsetLink"
                            href={`/article-detail/${thisId}`}
                          >
                            {text}
                          </Link>
                        ) : (
                          text
                        )}
                      </TableCell>
                    );
                  })}

                  <TableCell>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Link
                        className="unsetLink"
                        href={`/edit-article/${thisId}`}
                      >
                        <IconButton>
                          <EditOutlined fontSize="large" />
                        </IconButton>
                      </Link>
                      {/* TODO delete article functionality + progression */}
                      <IconButton onClick={() => console.log(row)}>
                        <DeleteOutlined fontSize="large" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
