import { Box } from "@mui/material";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { UilAngleRight, UilAngleLeft } from '@iconscout/react-unicons';

const Virements = () => {

  const isMobile = window.innerWidth <= 768;
  const pageSize = 10; // Number of rows per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const tableRef = useRef(null); // Reference to the table element
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [user, setUser] = useState([])
  var data = []

  useEffect(() => { axios.get(`${baseUrl}/utilisateurs/${JSON.parse(localStorage.getItem('user')).id}`).then(({ data }) => setUser(data[0])).catch((err) => console.log(err))}, []);

user.virements && (data = JSON.parse(user.virements))


  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <>
      <Box m="10px 0 0 0"><h1>Virements</h1></Box>
      <Box
        m="0 0 15px 0"
        height="68vh"
        sx={{
          width: isMobile ? "90vw" : "100%", // Set the width to full viewport width on mobile
          border: "5px solid #ffe0e0",
          borderRadius: "20px",
          overflow: "auto", // Enable scrolling within the container
          scrollbarWidth: "none", // Hide the scroll bar for Firefox
          msOverflowStyle: "none", // Hide the scroll bar for IE and Edge
          "&::-webkit-scrollbar": {
            display: "none", // Hide the scroll bar for Chrome, Safari, and Opera
          },
        }}
      >
        <TableContainer>
          <Table ref={tableRef}>
            <TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#f799a354" }}>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Total recette</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Compte Expéditeur</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Compte Société</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((virement) => (
                <TableRow key={virement.date}>
                  <TableCell >{virement.date}</TableCell>
                  <TableCell>{virement.total} DT</TableCell>
                  <TableCell>{virement.montantExpéditeur} DT</TableCell>
                  <TableCell>{virement.frais} DT</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          bottom={0}
          bgcolor="#f799a354"
          display="flex"
          justifyContent="center"
          p={1}
        >
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <UilAngleLeft size="24" />
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={endIndex >= data.length}
          >
            <UilAngleRight size="24" />
          </Button>
        </Box>
      </Box>
      
    </>
  );
};

export default Virements;
