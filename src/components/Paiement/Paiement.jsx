import { Box, Button, TextField, Autocomplete, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { UilPrint } from '@iconscout/react-unicons';

const Paiement = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fournisseur, setFournisseur] = useState([])
  const [colis, setColis] = useState([])
  const [selected, setSelected] = useState([])
  const [result, setResult] = useState(false);
  const [virements, setVirements] = useState(false);
  const [clicCount, setClicCount] = useState(0);

  var listFournisseur = [""]
  useEffect(() => { axios.get(`${baseUrl}/utilisateurs`).then(({ data }) => setFournisseur(data.filter((e) => e.role === "fournisseur"))).catch((err) => console.log(err)) }, []);

  listFournisseur.push(...fournisseur.map((e) => e.email))

  const handleFormSubmit = () => {
    axios.get(`${baseUrl}/colis`).then(({ data }) => setColis(data.filter((e) => (e.status === "Livrés" || e.status === "R définitif" || e.status === "R expéditeur") && e.paye === "non" && e.id_fournisseur === selected[0].id))).then(setResult(true)).catch((err) => setError(true))
  };

//===================== paiement =======================================================
const nombreRetour = colis.filter((e)=> e.status === "R définitif" || e.status === "R expéditeur").length
const fraisRetour = selected.length > 0 ? selected[0].frais_de_retour * nombreRetour : 0;

const nombreLivrés = colis.length - nombreRetour
const fraisLivraison = selected.length > 0 ? selected[0].frais_de_livraison * nombreLivrés : 0;

const sumOfPrixLivres = colis.reduce((acc, obj) => {if (obj.status === "Livrés"){return acc + obj.prix}return acc;}, 0)

const montantExpéditeur = sumOfPrixLivres -(fraisLivraison + fraisRetour)
const frais = fraisLivraison + fraisRetour

useEffect(() => {
  if (selected.length > 0) {
    if(selected[0].virements){
      setVirements(JSON.parse(selected[0].virements));
    }
  }
}, [selected]);


//===================== print =======================================================
const handlePrint = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  const printWindow = window.open("", "_blank");

  printWindow.document.open();
  printWindow.document.write(`
  <!DOCTYPE html>
  <html>
  <head>
      <title>Liste des virements</title>
  </head>
  <body>
      <table border="1">
          <tr>
              <th>${formattedDate}</th>
              <th>QTE / COLIS</th>
              <th>Montant</th>
          </tr>
          <tr>
              <td>CONTRE REMBOURSEMENT</td>
              <td></td>
              <td>${sumOfPrixLivres}</td>
          </tr>
          <tr>
              <td>FRAIS COLIS LIVRES</td>
              <td>${nombreLivrés}</td>
              <td>${fraisLivraison}</td>
          </tr>
          <tr>
              <td>FRAIS COLIS RETOUR</td>
              <td>${nombreRetour}</td>
              <td>${fraisRetour}</td>
          </tr>
          <tr>
              <td>MONTANT A PAYER</td>
              <td></td>
              <td>${montantExpéditeur}</td>
          </tr>
          <tr>
              <td>TOTAL FRAIS DE LIVRAISON</td>
              <td></td>
              <td>${fraisLivraison + fraisRetour}</td>
          </tr>
      </table>
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
//===================== Pay =======================================================
const [virementString,setVirementString]= useState('')

useEffect(() => {
  if (virements) {setVirementString(JSON.stringify(virements))}}, [virements]);

useEffect(() => {handleVirement()}, [colis]);

  const handleVirement = () => {
   if(colis.length) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const vir = {date : formattedDate, colisPayés : colis, total:sumOfPrixLivres, montantExpéditeur:montantExpéditeur, frais: frais}
  if(virements){
    const updatedVirements = [...virements];
    updatedVirements.push(vir);
    setVirements(updatedVirements);
  }
  if(!virements){
    setVirements([vir])
  }}
  }


const handlePay = () => {
  if(!clicCount){
    let obj = { paye: "oui"};
    let obj1 = {status: "Livrés payés" , paye: "oui"};
   let obj2 = obj
  axios.put(`${baseUrl}/utilisateurs/${selected[0].id}`, {virements:virementString}).catch((err) => setError(true));

  for(var i=0; i<colis.length; i++){
    if(colis[i].status === "Livrés") {obj2 = obj1}

    axios.put(`${baseUrl}/colis/${colis[i].id}`, obj2)
    .then(() => {setSuccess(true)})
    .catch(() => setError(true));
  }}
  setClicCount(1)
}
//===================== Pay =======================================================

  const handleInputChange = (event) => { setError(false); setSuccess(false); setResult(false); setClicCount(0); setVirements(false)}

  return (
    <>
      <Box m="10px 0 0 0"><h1>Paiement</h1></Box>
      <Box m="0 0 15px 0">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <Autocomplete
                  fullWidth
                  sx={{ gridColumn: "span 4" }}
                  options={listFournisseur}

                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: 'fournisseur',
                        value: newValue || '',
                      },
                    });

                    setSelected(fournisseur.filter((e) => e.email === newValue));
                    handleInputChange(event)
                  }}
                  value={values.fournisseur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="filled"
                      label="Nom du fournisseur"
                      onBlur={handleBlur}
                      error={!!touched.fournisseur && !!errors.fournisseur}
                      helperText={touched.fournisseur && errors.fournisseur}
                      sx={{ gridColumn: "span 4" }}
                    />
                  )}
                />

              </Box>
              {error && (
                <Box mt={1} color="red" textAlign="center" bgcolor="#fce6e6" borderRadius="4px" p={2} boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)">
                  <Typography variant="body2">
                    Une erreur est survenue !!!
                  </Typography>
                </Box>
              )}
              {success && (
                <Box mt={1} color="green" textAlign="center" bgcolor="#fce6e6" borderRadius="4px" p={2} boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)">
                  <Typography variant="body2">
                    Opération réussie
                  </Typography>
                </Box>
              )}
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Générer état
                </Button>
              </Box>
            </form>
          )}
        </Formik>
        {result && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: isNonMobile ? 'row' : 'column' }}>
              <Box
                mt={1}
                color="red"
                textAlign="left"
                bgcolor="#fce6e6"
                borderRadius="4px"
                p={2}
                boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
                width="150px"
                height="100px"
                marginRight={1}
                marginBottom={isNonMobile ? 0 : 1} // Add some space between the boxes when stacked
              >
                <Typography variant="body2" textAlign="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Retour
                </Typography>
                <Typography variant="body2" mt={1}>
                  Nombre: {nombreRetour}
                </Typography>
                <Typography variant="body2" mt={1}>
                  Frais: {fraisRetour} DT
                </Typography>
              </Box>
              <Box
                mt={1}
                color="green"
                textAlign="left"
                bgcolor="#eafce6"
                borderRadius="4px"
                p={2}
                boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
                width="150px"
                height="100px"
                marginRight={1}
                marginBottom={isNonMobile ? 0 : 1} 
              >
                <Typography variant="body2" textAlign="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Livrés
                </Typography>
                <Typography variant="body2" mt={1}>
                  Nombre: {nombreLivrés}
                </Typography>
                <Typography variant="body2" mt={1}>
                  Frais: {fraisLivraison}  DT
                </Typography>
              </Box>
              <Box
                mt={1}
                color="green"
                textAlign="left"
                bgcolor="#eafce6"
                borderRadius="4px"
                p={2}
                boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
                width="150px"
                height="100px"
                marginRight={1}
                marginBottom={isNonMobile ? 0 : 1} // Add some space between the boxes when stacked
              >
                <Typography variant="body2" textAlign="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Compte Société
                </Typography>
                <Typography variant="body2" mt={1}>
                  Montant: {fraisRetour + fraisLivraison} DT
                </Typography>
              </Box>
              <Box
                mt={1}
                color="green"
                textAlign="left"
                bgcolor="#eafce6"
                borderRadius="4px"
                p={2}
                boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
                width="150px"
                height="100px"
              >
                <Typography variant="body2" textAlign="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Compte Expéditeur
                </Typography>
                <Typography variant="body2" mt={1}>
                  Montant: {montantExpéditeur} DT
                </Typography>
              </Box>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Box mt={1} marginRight={1}>
                <Button type="submit" onClick={() => handlePrint()}>
                <UilPrint size="24" />
                </Button>
              </Box>
              <Box mt={1} marginRight={1}>
                <Button type="submit" color="secondary" variant="contained" onClick={() => handlePay()}>
                  Payer
                </Button>
              </Box>
            </div>
          </>
        )}
      </Box>
    </>
  );
};

const checkoutSchema = yup.object().shape({
  fournisseur: yup.string().required("Champ obligatoire"),
});
const initialValues = {
  fournisseur: "",
};

export default Paiement;
