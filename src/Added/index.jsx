import { Box } from "@mui/material";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { mockDataContacts } from "../Data/mockData";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { UilPrint, UilAngleRight, UilAngleLeft } from '@iconscout/react-unicons';
import Barcode from 'react-barcode';

const ShowPackage = ({ hideCards, setSuccess }) => {

  const isMobile = window.innerWidth <= 768;
  const pageSize = 10; // Number of rows per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const tableRef = useRef(null); // Reference to the table element
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [colis, setColis] = useState([])
  var data = []

  useEffect(() => { setSuccess(true); axios.get(`${baseUrl}/colis`).then(({ data }) => setColis(data.filter((e) => e.status === hideCards).reverse())).catch((err) => console.log(err)).finally(() => setSuccess(false)) }, []);

  data = colis.filter((e) => e.status === hideCards);
  if (localStorage.getItem('user')) {
    if (JSON.parse(localStorage.getItem('user')).role === "fournisseur") {
      data = (colis.filter((e) => e.status === hideCards && e.id_fournisseur === JSON.parse(localStorage.getItem('user')).id))
    }
    if (JSON.parse(localStorage.getItem('user')).role === "livreur") {
      data = (colis.filter((e) => e.status === hideCards && e.id_livreur === JSON.parse(localStorage.getItem('user')).id))
    }
    if (JSON.parse(localStorage.getItem('user')).role === "ouvrier") {
      data = []
    }
  }


  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const tableContent = tableRef.current.outerHTML; // Get the table content as HTML

    // Create a new document in the print window and write the table content
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid black; /* Add a border to the whole table */
      }
      th, td {
        border: 1px solid black; /* Add borders to table cells */
        padding: 5px;
      }
    </style>
        </head>
        <body>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              ${tableContent}
            </TableBody>
          </Table>
          <script>
            // Automatically trigger the print action when the document is ready
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 100);
            };
            // Close the window when the print action is cancelled
            window.onafterprint = function() {
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

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
      <Box m="10px 0 0 0"><h1>Détails : {hideCards}</h1></Box>
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
                <TableCell style={{ fontWeight: "bold" }}>Identifiant</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Nom</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Téléphone</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Ville</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Adresse</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Prix</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Date d'ajout</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Date d'enlèvement</TableCell>
                {(hideCards === "Livrés" || hideCards === "Livrés payés") && <TableCell style={{ fontWeight: "bold" }}>Date de livraison</TableCell>}
                {(hideCards === "R définitif" || hideCards === "R expéditeur") && <TableCell style={{ fontWeight: "bold" }}>Date retour</TableCell>}
                <TableCell style={{ fontWeight: "bold" }}>Désignation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((colis) => (
                <TableRow key={colis.id}>
                  <TableCell ><Barcode  value={'"'+colis.id+'"'} width={1} height={30}/></TableCell>
                  <TableCell>{colis.nom}</TableCell>
                  <TableCell>{colis.telephone}</TableCell>
                  <TableCell>{colis.delegation}, {colis.gouvernerat}</TableCell>
                  <TableCell>{colis.adresse} </TableCell>
                  <TableCell>{colis.prix} dt</TableCell>
                  <TableCell>{colis.date_d_ajout.split("T")[0]}</TableCell>
                  <TableCell>{colis.date_d_enlevement.split("T")[0]}</TableCell>
                  {(hideCards === "Livrés" || hideCards === "Livrés payés") && <TableCell>{colis.date_de_livraison.split("T")[0]}</TableCell>}
                  {(hideCards === "R définitif" || hideCards === "R expéditeur") && <TableCell>{colis.date_de_retour.split("T")[0]}</TableCell>}
                  <TableCell>{colis.designation}</TableCell>
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
          <Button onClick={handlePrint}>
            <UilPrint size="24" />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ShowPackage;
