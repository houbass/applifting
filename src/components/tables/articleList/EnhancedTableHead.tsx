import React from "react";
import {
  Stack,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";

// Types
import { Data, HeadCell, EnhancedTableProps } from "./types";

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

export default function EnhancedTableHead(props: EnhancedTableProps) {
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
