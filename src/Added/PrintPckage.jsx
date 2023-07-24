import { Box } from "@mui/material";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { UilPrint, UilAngleRight, UilAngleLeft } from '@iconscout/react-unicons';

const PrintPckage = ({setSuccess}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const isMobile = window.innerWidth <= 768;
  const [colis, setColis] = useState([])
  var data= []

  const pageSize = 10; // Number of rows per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const tableRef = useRef(null); // Reference to the table element
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {setSuccess(true); axios.get(`${baseUrl}/colis`).then(({ data }) => setColis(data.filter((e) => e.status === "en attente").reverse())).catch((err) => console.log(err)).finally(() => setSuccess(false))}, []);

  data = colis
  if(localStorage.getItem('user')){
    if(JSON.parse(localStorage.getItem('user')).role === "fournisseur"){
      data = (colis.filter((e) => e.id_fournisseur === JSON.parse(localStorage.getItem('user')).id))
      
    }
    if(JSON.parse(localStorage.getItem('user')).role === "livreur" || JSON.parse(localStorage.getItem('user')).role === "ouvrier"){
      data = []
    }
  }



  const handlePrint = (colis) => {
    const printWindow = window.open("", "_blank");

    // Create a new document in the print window and write the colis data
    printWindow.document.open();
    printWindow.document.write(`
    <html>
    <head>
      <title>Print</title>
      <style>
        body {
          border: 1px solid black;
        }
        #header {
          position: absolute;
          top: 20px;
          left: 20px;
        }
        #content {
          margin-top: 25%;
          text-align: center;
        }
        #qr-code {
          margin-top: 2%;
        }
        #footer {
          text-align: center;
          margin-top: 20px;
        }
        #left-section {
          top: 300px;
          left: 20px;
          margin-left: 2%;
          margin-right: 2%;
        }
        #rectangle {
          width: 400px;
          height: 50px;
          border: 2px solid black;
          margin-top: 10px;
          padding: 10px;
        }
        table {
          margin-top: 20px;
          width: 100%;
          border-collapse: collapse
        }
        th, td {
          border: 1px solid black;
          padding: 5px;
        }
        #rectangle-right {
          width: 300px;
          height: 200px;
          border: 2px solid black;
          margin-top: 20px;
          margin-left: 350px;
        }
        #content p {
          border: 1px solid black; /* Add border property for the p element */
          padding: 10px;
          width:300px;
          margin: 0 auto;
          margin-top: 5px;
        }
        .container {
          display: flex;
          align-items: center;
        }
        #rectangle p {
          text-align: left;
          margin: 0;
        }
      </style>
      <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
    </head>
    <body>
      <div id="header">
        <p>NOM DE L'EXPEDITEUR: ${user.nom}</p>
        <p>ADRESSE: ${user.addresse}</p>
        <p>TELEPHONE: ${user.telephone}</p>
        <p>M/F: ${user.MF ? user.MF : '-'}</p>
      </div>
      <div id="content">
        <p>BON DE LIVRAISON N° ${colis.id}</p>
        <div id="qr-code">
        <svg id="barcode-container"></svg>
        </div>
        <p>Centrale >> ---- Dispatch ---- >> ${colis.gouvernerat}</p>
      </div>
      <div id="left-section">
      <div class="container">
      <p style="margin-right: 10px;">Date : ${colis.date_d_ajout.split("T")[0]} </p>
      <div id="rectangle">
        <p>NOM DE DESTINATAIRE: ${colis.nom}</p>
        <p>ADRESSE: ${colis.adresse}</p>
        <p>TELEPHONE: ${colis.telephone}</p>
      </div>
    </div>
    
        <table>
          <thead>
            <tr>
              <th>Désignation</th>
              <th>Quantité</th>
              <th>Montant Total HT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${colis.designation}</td>
              <td>${colis.nombre}</td>
              <td>${(colis.prix * 0.81 !== Math.floor(colis.prix * 0.81)) ? (colis.prix * 0.81).toFixed(2) : (colis.prix * 0.81)} DT</td>

            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>Montant HT</td>
              <td>${(colis.prix * 0.81 !== Math.floor(colis.prix * 0.81)) ? (colis.prix * 0.81).toFixed(2) : (colis.prix * 0.81)} DT</td>
            </tr>
            <tr>
              <td>TVA 19%</td>
              <td>${(colis.prix * 0.19 !== Math.floor(colis.prix * 0.19)) ? (colis.prix * 0.19).toFixed(2) : (colis.prix * 0.19)} DT</td>
            </tr>
            <tr>
              <td>Total en TTC</td>
              <td>${colis.prix} DT</td>
            </tr>
          </tbody>
        </table>
        <div id="rectangle-right">
        <p> ${colis.commentaire} <p/>
        </div>
      </div>
      <script>
          const barcodeValue = "${colis.id}";
          JsBarcode("#barcode-container", barcodeValue);
      </script>
      <script>
        window.onload = function() {
          window.print();
          setTimeout(function() {
            window.close();
          }, 100);
        };
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
      <Box m="10px 0 0 0"><h1>Détails</h1></Box>
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
                <TableCell style={{ fontWeight: "bold" }}>Désignation</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Imprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((colis) => (
                <TableRow key={colis.id}>
                  <TableCell>{colis.id}</TableCell>
                  <TableCell>{colis.nom}</TableCell>
                  <TableCell>{colis.telephone}</TableCell>
                  <TableCell>{colis.delegation}, {colis.gouvernerat}</TableCell>
                  <TableCell>{colis.adresse} </TableCell>
                  <TableCell>{colis.prix} dt</TableCell>
                  <TableCell>{colis.date_d_ajout.split("T")[0]}</TableCell>
                  <TableCell>{colis.designation}</TableCell>
                  <TableCell>
                    <Button onClick={() => handlePrint(colis)}><UilPrint size="24" /></Button>
                  </TableCell>
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

export default PrintPckage;
