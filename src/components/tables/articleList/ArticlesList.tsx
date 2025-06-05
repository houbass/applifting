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
  TableRow,
  CircularProgress,
} from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { setAlert, setSucces } from "@/redux/slices/userSlice";

// Hooks
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

// Types
import { Order, Data } from "./types";
import { Article } from "@/types/types";

// Utils
import { getComparator, createArticleListData } from "./utils";
import { handleArticleAction } from "@/utils/firebase";

// Components
import EnhancedTableHead from "./EnhancedTableHead";

interface Props {
  data: Article[];
}

export default function ArticlesList({ data }: Props) {
  // Hooks
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // States
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("id");
  const [selected, setSelected] = useState<number[]>([]);
  const [updatingArticle, setUpdatingArticle] = useState<string | null>(null);

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

  const visibleRows = useMemo(
    () => [...rows].sort(getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  // Utils
  function handleRequestSort(
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }

  function handleCheck(rowId: number) {
    if (selected.includes(rowId)) {
      setSelected(selected.filter((id) => id !== rowId));
    } else {
      setSelected([...selected, rowId]);
    }
  }

  async function handleDelete(thisId: string) {
    if (updatingArticle) return;
    try {
      setUpdatingArticle(thisId);
      // Call the delete action
      await handleArticleAction("delete", undefined, thisId);
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setUpdatingArticle(null);
      dispatch(setSucces("Article deleted successfully"));
    } catch (error) {
      console.error("Error deleting article:", error);
      setUpdatingArticle(null);
      dispatch(setAlert("Something went wrong, Please try again"));
    }
  }

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

              const thisId: string =
                data.find((item) => item.articleTitle === row.title)?.id || "";

              const thisDeleteIcon =
                updatingArticle === thisId ? (
                  <CircularProgress size={25} color="inherit" />
                ) : (
                  <DeleteOutlined fontSize="large" />
                );

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
                        <IconButton aria-label="edit">
                          <EditOutlined fontSize="large" />
                        </IconButton>
                      </Link>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(thisId)}
                      >
                        {thisDeleteIcon}
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
