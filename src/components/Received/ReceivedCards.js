import React, { useEffect } from "react";
import { Avatar, Box, Button, Divider, Tooltip } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import { connect } from "react-redux";
import Typography from "@mui/joy/Typography";
import {
  TextField,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Received } from "../../data/Received";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Logout } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import CustomizedIconButton from "../common/CustomizedIconButton";
import download1 from "../../assets/images/download1.png";
import teamsent from "../../assets/images/teamsent.png";
import downloadall from "../../assets/images/downloadall.png";
import download from "../../assets/images/download.png";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import unviewed from "../../assets/images/un.png";
import vector from "../../assets/images/Vector (2).png";
const ReceivedCards = (props) => {
  const Received1 = Received;
  const username = "Sumaja Gurlinka";
  const [timeOfDay, setTimeOfDay] = useState("");

  const maxRowsToShowWithoutScrollbar = 5;
  const maxHeight = `${maxRowsToShowWithoutScrollbar * 90}px`;
  const [sortOrder, setSortOrder] = useState(true);
  const [selectedButton, setSelectedButton] = useState("All");
  const [page, setPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [received, setReceived] = useState(Received1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, getDownloadAllAsync } = props;
  const [data, setData] = useState([]);
  const [orderBy, setOrderBy] = useState("Received Time");
  const [order, setOrder] = useState("asc");
  const base64Image = user.image;
  const navigate = useNavigate();
  const columns = [
    { accessor: "Card ID", label: "Card ID" },
    { accessor: "Received Time", label: "Received Time" },
    { accessor: "Sender", label: "Sender" },
    { accessor: "Category", label: "Category" },
    { accessor: "Actions", label: "Actions" },
  ];

  const [showTextbox, setShowTextbox] = useState(false);
  useEffect(() => {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      setTimeOfDay("Good Morning");
    } else if (currentTime >= 12 && currentTime < 18) {
      setTimeOfDay("Good Afternoon");
    } else {
      setTimeOfDay("Good Evening");
    }
  }, []);
  const handleClick = () => {
    setShowTextbox(!showTextbox);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDialog = () => {
    setDialog(false);
  };
  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleView = (card) => {
    setDialog(true);
    setSelectedCard(card);
    console.log(Received1);
  };
  const handleSendClick = () => {
    navigate("/sendcard");
  };
  const createSortHandler = (property) => () => {
    // Determine the sorting order (ascending or descending)
    const isAsc = orderBy === property && order === "asc";

    // Create a sorted copy of the received data based on the property and order
    const sortedData = [...received].sort((a, b) => {
      if (isAsc) {
        return a[property] < b[property] ? -1 : 1;
      } else {
        return a[property] > b[property] ? -1 : 1;
      }
    });

    // Update the state with the sorted data and order details
    setReceived(sortedData);
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  const handleViewCard = (index) => {
    // Create a copy of the Received1 array
    const updatedReceived1 = [...Received];

    // Toggle the 'viewed' property for the clicked row
    updatedReceived1[index].viewed = !updatedReceived1[index].viewed;

    console.log("Clicked index:", index);
    console.log("Updated Received1:", updatedReceived1);

    // Update the state of Received1 with the modified data
    setReceived(updatedReceived1);
    setDialog(true);

    console.log(Received1);
  };
  const fetchData = async (button) => {
    try {
      if (button === "All") {
      } else if (button === "Appreciate") {
      } else if (button === "Thanking") {
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const handleButtonSelect = (button) => {
    setSelectedButton(button);
    fetchData(button);
  };

  const handleDownloadAll = async () => {
    try {
      await getDownloadAllAsync();
    } catch (error) {}
  };

  const buttonStyles = {
    textTransform: "none",

    marginRight: "20px",
  };

  return (
    <Box
      className="signup1_container"
      style={{
        background: "#f5f5f5",
        width: "100vw",
        height: "100vh",
        marginTop: "60px",
        paddingTop: "14px",
      }}
    >
      {/* <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <Typography
          level="title-md"
          sx={{
            color: "black",
            fontSize: "20px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: "bold",
            marginLeft: "30px",
            marginBottom: "4px",
          }}
        >
          Received Cards
        </Typography>
        <Box sx={{ display: "flex", flexwrap: "wrap" }}>
        
          <div style={{position:"absolute",top:"11px",right:"370px"}}>
          <TextField
    sx={{
    
      padding: "0px",
      marginLeft: "20px",
      "& label.Mui-focused": {
        color: "#8B5CF6",
      },
      "& .MuiOutlinedInput-root": {
        height: "34px",
        width: "200px",
        borderColor: "transparent",
        "&:hover fieldset": {
          borderColor: "#8B5CF6",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#8B5CF6",
        },
      },
    }}
    placeholder="Enter CardID..."
    variant="outlined"
    
  /></div>
  <Box style={{position:"absolute",top:"12px",right:"320px",background:"#0071e3",padding:"0px",borderRadius:"4px"}}>
     
    <IconButton sx={{color:"#FCFCFC"}}>
       
          <SearchIcon />
      
     
          </IconButton>
 
          </Box>
          <Typography
            level="title-md"
            sx={{
              fontSize: "16px",
              fontFamily: "Manrope, sans-serif",
              color: "black",
            
              marginRight: "90px",
            }}
          >
            Welcome, {username}
          </Typography>
          <Tooltip title="Account Settings">
            <Avatar
              sx={{
                width: "32px",
                height: "30px",
                position: "absolute",
                top: "12px",
                right: "35px",
                fontSize: "15px",color:"black"
              }}
              onClick={handleAvatarClick}
            >
              SG
            </Avatar>
          </Tooltip>
        </Box>
      </Box> */}
      {/* <Box
        style={{
          fontSize: "16px",
          marginTop: "8px",
          marginLeft: "30px",
          fontFamily: "Manrope, sans-serif",
        }}
      >
        {timeOfDay}
      </Box> */}
      <Typography
        level="title-md"
        sx={{
          color: "black",
          fontSize: "20px",
          fontFamily: "Manrope, sans-serif",
          fontWeight: "bold",
          marginLeft: "30px",
          marginBottom: "4px",
        }}
      >
        Received Cards
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "5px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14.5px",
            width: "520px",
            fontFamily: "Manrope, sans-serif",
            marginLeft: "30px",
            marginTop: "5px",
            "@media (max-width: 600px)": {
              fontsize: "2px",
            },
          }}
        >
          Appreciation can change a day, even change a life. Your willingness to
          put it into words is all that is necessary. — Margaret Cousins
        </Typography>
        <Box
          sx={{
            padding: "0px !important",
            display: "flex",
            height: "30px",

            flexWrap: "wrap",

            justifyContent: "flex-end",

            marginRight: "32px",
          }}
        >
          {" "}
          <Tooltip title="Send Card">
            <Button
              style={{
                background: "#0071e3",
                color: "white",
                padding: "0px",
                height: "35px",
                textTransform: "none",
                borderRadius: "6px",
                width: "120px",
              }}
              onClick={handleSendClick}
            >
              <MailIcon
                sx={{
                  marginLeft: "0px",
                  marginRight: "10px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#FCFCFC",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {" "}
                Send Card
              </Typography>
            </Button>
          </Tooltip>{" "}
          <Tooltip title="Download All Cards">
            <img
              src={download}
              style={{
                fontsize: "30px",
                marginTop: "3px",
                marginLeft: "20px",
                width: "1.75em",
                height: "1.75em",
              }}
              onClick={handleDownloadAll}
            ></img>
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{
          marginLeft: "30px",
          marginRight: "30px",
          marginTop: "14px",
          marginBottom: "10px",
        }}
      >
        <TableContainer
          component={Paper}
          style={{
            maxHeight,

            // '@media (maxWidth: 768px)': {
            //   maxWidth: '300px',
            // },
          }}
        >
          <div
            style={{
              display: "flex",
              marginTop: "5px",
              marginBottom: "5px",
              alignItems: "center",
              marginRight: "20px",
              fontWeight: "bold",
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                flex: "0 0 auto",
                marginLeft: "22px",
                marginTop: "10px",
              }}
            >
              <Button
                onClick={() => handleButtonSelect("All")}
                style={{
                  ...buttonStyles,
                  backgroundColor:
                    selectedButton === "All" ? "#ECF5FF" : "transparent",
                  color: selectedButton === "All" ? "#0071E3" : "#3F3F3F",
                }}
              >
                All(10)
              </Button>
              <Button
                onClick={() => handleButtonSelect("Appreciate")}
                style={{
                  ...buttonStyles,
                  backgroundColor:
                    selectedButton === "Appreciate" ? "#ECF5FF" : "transparent",
                  color:
                    selectedButton === "Appreciate" ? "#0071E3" : "#3F3F3F",
                }}
              >
                Appreciate(7)
              </Button>
              <Button
                onClick={() => handleButtonSelect("Thanking")}
                style={{
                  textTransform: "none",
                  backgroundColor:
                    selectedButton === "Thanking" ? "#ECF5FF" : "transparent",
                  color: selectedButton === "Thanking" ? "#0071E3" : "#3F3F3F",
                }}
              >
                Thanking(3)
              </Button>
            </Box>
            <TextField
              sx={{
                marginTop: "10px",
                padding: "0px",
                marginLeft: "20px",
                "& label.Mui-focused": {
                  color: "#8B5CF6",
                },
                "& .MuiOutlinedInput-root": {
                  height: "45px",
                  width: "350px",
                  borderColor: "transparent",
                  "&:hover fieldset": {
                    borderColor: "#0071e3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0071e3",
                  },
                },
              }}
              placeholder="Enter to Search..."
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {selectedButton === "All" && (
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      sx={{
                        padding: "12px 32px !important",
                        fontWeight: "600",
                        position: "sticky",
                        background: "#FCFCFC",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === column.accessor}
                        direction={orderBy === column.accessor ? order : "asc"}
                        onClick={createSortHandler(column.accessor)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {received.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      You have not received any card yet.
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody className="custom-table-body">
                  {received
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((row, rowIndex) => {
                      // Calculate the actual index
                      const actualIndex = page * rowsPerPage + rowIndex;

                      return (
                        <TableRow
                          key={actualIndex}
                          sx={{
                            "&:hover": {
                              backgroundColor: row.viewed
                                ? "#f5f5f5!important"
                                : "#e0e0e087",
                            },
                            backgroundColor: row.viewed ? "#FCFCFC" : "#F4F9FF",
                          }}
                        >
                          <TableCell
                            sx={{
                              fontWeight: row.viewed ? "" : "bold",
                              color: row.viewed ? "" : "#0071E3",
                            }}
                          >
                            {row.viewed ? (
                              <Tooltip title="Viewed">
                                {" "}
                                <IconButton sx={{ padding: "0px" }}>
                                  <DraftsOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Unviewed">
                                <IconButton
                                  sx={{
                                    padding: "0px",
                                    marginLeft: "5px",
                                    marginRight: "7px",
                                  }}
                                >
                                  <img
                                    src={unviewed}
                                    style={{ width: "20px", height: "1em" }}
                                  />
                                </IconButton>
                              </Tooltip>
                            )}
                            {row.card}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            {row.date}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            {row.category}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "8px 20px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                              {row.viewed ? (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(actualIndex)}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(actualIndex)}
                                    sx={{
                                      marginLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    <img src={vector}></img>
                                  </IconButton>
                                </Tooltip>
                              )}
                              {row.viewed ? (
                                <Tooltip title="Download Card">
                                  <a
                                    href={`data:image/jpeg;base64,${base64Image}`}
                                    download={`${row.name}_${row.card}.jpg`}
                                  >
                                    <IconButton>
                                      <DownloadIcon />
                                    </IconButton>
                                  </a>
                                </Tooltip>
                              ) : (
                                <Tooltip title="Download Card">
                                  <a
                                    href={`data:image/jpeg;base64,${base64Image}`}
                                    download={`${row.name}_${row.card}.jpg`}
                                  >
                                    <IconButton sx={{ marginLeft: "6px" }}>
                                      <img src={download1}></img>
                                    </IconButton>
                                  </a>
                                </Tooltip>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          )}
          {selectedButton === "Appreciate" && (
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      sx={{
                        padding: "12px 32px !important",
                        fontWeight: "600",
                        position: "sticky",
                        background: "#FCFCFC",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === column.accessor}
                        direction={orderBy === column.accessor ? order : "asc"}
                        onClick={createSortHandler(column.accessor)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {received.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      You have not received any card yet.
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody className="custom-table-body">
                  {received
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((row, rowIndex) => {
                      // Calculate the actual index
                      const actualIndex = page * rowsPerPage + rowIndex;

                      return (
                        <TableRow
                          key={actualIndex}
                          sx={{
                            "&:hover": {
                              backgroundColor: row.viewed
                                ? "#f5f5f5!important"
                                : "#e0e0e087",
                            },
                            backgroundColor: row.viewed ? "#FCFCFC" : "#F4F9FF",
                          }}
                        >
                          <TableCell
                            sx={{
                              fontWeight: row.viewed ? "" : "bold",
                              color: row.viewed ? "" : "#0071E3",
                            }}
                          >
                            {row.viewed ? (
                              <Tooltip title="Viewed">
                                {" "}
                                <IconButton sx={{ padding: "0px" }}>
                                  <DraftsOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Unviewed">
                                <IconButton
                                  sx={{
                                    padding: "0px",
                                    marginLeft: "5px",
                                    marginRight: "7px",
                                  }}
                                >
                                  <img src={unviewed}></img>
                                </IconButton>
                              </Tooltip>
                            )}
                            {row.card}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            {row.date}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            {row.category}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "8px 20px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                              {row.viewed ? (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(actualIndex)}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(actualIndex)}
                                    sx={{
                                      marginLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    <img src={vector}></img>
                                  </IconButton>
                                </Tooltip>
                              )}
                              {row.viewed ? (
                                <Tooltip title="Download Card">
                                  <a
                                    href={`data:image/jpeg;base64,${base64Image}`}
                                    download={`${row.name}_${row.card}.jpg`}
                                  >
                                    <IconButton>
                                      <DownloadIcon />
                                    </IconButton>
                                  </a>
                                </Tooltip>
                              ) : (
                                <Tooltip title="Download Card">
                                  <a
                                    href={`data:image/jpeg;base64,${base64Image}`}
                                    download={`${row.name}_${row.card}.jpg`}
                                  >
                                    <IconButton sx={{ marginLeft: "6px" }}>
                                      <img src={download1}></img>
                                    </IconButton>
                                  </a>
                                </Tooltip>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          )}
          {selectedButton === "Thanking" && (
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      sx={{
                        padding: "12px 32px !important",
                        fontWeight: "600",
                        position: "sticky",
                        background: "#FCFCFC",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === column.accessor}
                        direction={orderBy === column.accessor ? order : "asc"}
                        onClick={createSortHandler(column.accessor)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {received.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      You have not received any card yet.
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody className="custom-table-body">
                  {received
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .map((row, rowIndex) => {
                      // Calculate the actual index
                      const actualIndex = page * rowsPerPage + rowIndex;

                      return (
                        <TableRow
                          key={actualIndex}
                          sx={{
                            "&:hover": {
                              backgroundColor: row.viewed
                                ? "#f5f5f5!important"
                                : "#e0e0e087",
                            },
                            backgroundColor: row.viewed ? "#FCFCFC" : "#F4F9FF",
                          }}
                        >
                          <TableCell
                            sx={{
                              fontWeight: row.viewed ? "" : "bold",
                              color: row.viewed ? "" : "#0071E3",
                            }}
                          >
                            {row.viewed ? (
                              <Tooltip title="Viewed">
                                {" "}
                                <IconButton sx={{ padding: "0px" }}>
                                  <DraftsOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Unviewed">
                                <IconButton
                                  sx={{
                                    padding: "0px",
                                    marginLeft: "5px",
                                    marginRight: "7px",
                                  }}
                                >
                                  <img src={unviewed}></img>
                                </IconButton>
                              </Tooltip>
                            )}
                            {row.card}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            {row.date}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "12px 32px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            {row.category}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "8px 20px !important",
                              fontWeight: row.viewed ? "" : "bold",
                            }}
                          >
                            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                              {row.viewed ? (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(actualIndex)}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                <Tooltip title="View Card">
                                  <IconButton
                                    onClick={() => handleViewCard(actualIndex)}
                                    sx={{
                                      marginLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    <img src={vector}></img>
                                  </IconButton>
                                </Tooltip>
                              )}
                              {row.viewed ? (
                                <Tooltip title="Download Card">
                                  <a
                                    href={`data:image/jpeg;base64,${base64Image}`}
                                    download={`${row.name}_${row.card}.jpg`}
                                  >
                                    <IconButton>
                                      <DownloadIcon />
                                    </IconButton>
                                  </a>
                                </Tooltip>
                              ) : (
                                <Tooltip title="Download Card">
                                  <a
                                    href={`data:image/jpeg;base64,${base64Image}`}
                                    download={`${row.name}_${row.card}.jpg`}
                                  >
                                    <IconButton sx={{ marginLeft: "6px" }}>
                                      <img src={download1}></img>
                                    </IconButton>
                                  </a>
                                </Tooltip>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={received.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Menu
        placement="bottom-end"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{ marginTop: "1.43em" }}
      >
        <MenuItem>
          <div>
            <Typography sx={{ color: "black" }}>Sumaja Gurlinka</Typography>
            <Typography sx={{ fontSize: "14px", marginTop: "5px" }}>
              Associate
            </Typography>
            <Typography sx={{ color: "black" }}>
              sumajagurlinka22@gmail.com
            </Typography>
          </div>
        </MenuItem>

        <Divider></Divider>
        <MenuItem>
          {" "}
          <ListItemIcon sx={{ marginRight: "5px", fontSize: "20px" }}>
            <Logout size="sm" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Dialog open={dialog}>
        <DialogContent
          style={{
            width: "300px",
            height: "300px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: base64Image
              ? `url(data:image/jpeg;base64,${base64Image})`
              : "none",
          }}
        >
          <p style={{ color: "#FCFCFC" }}>
            Not because it's thanksgiving but I always wanted to Thank you ,
            having you as my mentor has greatly enhanced my capabilities and
            skill set. I truly appreciate everything you have done and always
            will be grateful to you for your kindness and support.
          </p>
          <Tooltip title="Close">
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
              sx={{
                position: "absolute",
                top: "10px",
                right: "15px",
                color: "#FCFCFC",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  getDownloadAllAsync: dispatch.login.getDownloadAllAsync,
});
export default connect(mapStateToProps, mapDispatchToProps)(ReceivedCards);
