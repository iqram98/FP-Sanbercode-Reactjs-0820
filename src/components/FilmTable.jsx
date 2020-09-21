import React, { useState, useContext } from "react";
import { DataContext } from "./DataContext";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { InputAdornment, Input, Divider } from "@material-ui/core";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "action", label: "Action" },
  { id: "image_url", label: "Image" },
  { id: "title", label: "Title" },
  { id: "duration", label: "Durasi" },
  { id: "genre", label: "Genre" },
  { id: "rating", label: "Rating" },
  { id: "year", label: "Year" },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Deskripsi",
  },
  { id: "review", numeric: false, disablePadding: false, label: "Review" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: 30,
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 30,
    flexFlow: "row wrap",
  },
  filter: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "flex-start",
  },
  input: {
    width: 100,
    marginRight: 20,
  },
}));

export default function FilmTable() {
  const classes = useStyles();
  const [
    dataFilm,
    setDataFilm,
    dataGame,
    setDataGame,
    user,
    setUser,
  ] = useContext(DataContext);
  const history = useHistory();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("".toString());
  const [filter, setFilter] = useState(false);
  const [filterKey, setFilterKey] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAdd = () => {
    history.push("/datafilm/filmform/add");
  };

  const handleDelete = (index) => {
    Axios.delete(
      `https://backendexample.sanbersy.com/api/data-movie/${index}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    ).then((res) => {
      let newFilm = dataFilm.filter((film) => film.id !== index);
      setDataFilm(newFilm);
    });
  };

  const handleEdit = (index) => {
    history.push(`/datafilm/filmform/${index}`);
  };

  const handleChange = (event) => {
    setSearch(event.target.value.substr(0, 20));
  };

  const handleChangeFilter = (event) => {
    setSearch(event.target.value.substr(0, 20));
    setFilterKey(event.target.name);
  };

  const handleFilter = () => {
    if (filter) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  };

  let filteredData =
    dataFilm !== null &&
    dataFilm.filter((film) => {
      return (
        (film.description !== null &&
          film.description.toLowerCase().indexOf(search.toLowerCase()) !==
            -1) ||
        (film.title !== null &&
          film.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
        (film.genre !== null &&
          film.genre.toLowerCase().indexOf(search.toLowerCase()) !== -1) ||
        (film.duration !== null &&
          film.duration.toString().indexOf(search.toLowerCase()) !== -1) ||
        (film.rating !== null &&
          film.rating.toString().indexOf(search.toLowerCase()) !== -1) ||
        (film.year !== null &&
          film.year.toString().indexOf(search.toLowerCase()) !== -1) ||
        (film.review !== null &&
          film.review.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      );
    });

  const emptyRows =
    dataFilm !== null &&
    rowsPerPage - Math.min(rowsPerPage, dataFilm.length - page * rowsPerPage);

  return (
    dataFilm !== null && (
      <div className={classes.root}>
        <div className={classes.head}>
          <Typography variant="h4">Tabel Data Film</Typography>
          <div>
            <Input
              placeholder="Search..."
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
            <IconButton onClick={() => handleAdd()}>
              <AddIcon />
            </IconButton>
            {filter === false ? (
              <IconButton onClick={() => handleFilter()}>
                <ExpandMore />
              </IconButton>
            ) : (
              <IconButton onClick={() => handleFilter()}>
                <ExpandLess />
              </IconButton>
            )}
          </div>
        </div>
        {filter && (
          <div className={classes.filter}>
            <Typography variant="h5">Filter</Typography>
            <div>
              <Input
                placeholder="title"
                name="title"
                className={classes.input}
                onChange={handleChangeFilter}
              />
              <Input
                placeholder="durasi"
                name="duration"
                className={classes.input}
                onChange={handleChangeFilter}
              />
              <Input
                placeholder="genre"
                name="genre"
                className={classes.input}
                onChange={handleChangeFilter}
              />
              <Input
                placeholder="rating"
                name="rating"
                className={classes.input}
                onChange={handleChangeFilter}
              />
              <Input
                placeholder="year"
                name="year"
                className={classes.input}
                onChange={handleChangeFilter}
              />
            </div>
          </div>
        )}
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(filteredData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover tabIndex={-1} key={row.title}>
                        <TableCell>
                          <IconButton
                            onClick={() => handleEdit(row.id)}
                            aria-label="expand row"
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(row.id)}
                            aria-label="expand row"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <img src={row.image_url} width="80" alt="gmbr" />
                        </TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.duration}</TableCell>
                        <TableCell>{row.genre}</TableCell>
                        <TableCell>{row.rating}</TableCell>
                        <TableCell>{row.year}</TableCell>
                        <TableCell align="justify">{row.description}</TableCell>
                        <TableCell>{row.review}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataFilm.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    )
  );
}
