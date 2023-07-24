import { Box, Button, TextField, Autocomplete, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Transactions = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [livreurs, setLivreurs] = useState([])
  const [hideLivreurs, setHideLivreurs] = useState("")
  const [id,setId] = useState("")

  var listLivreurs = [""]
  useEffect(() => {axios.get(`${baseUrl}/utilisateurs`).then(({ data }) => setLivreurs(data.filter((e) => e.role === "livreur"))).catch((err) => console.log(err))}, []);

  listLivreurs.push(...livreurs.map((e)=>e.email))

  const handleFormSubmit = (values, { setFieldValue }) => {
  
    if (values.codeColis <= 900000000000) {
      setError(true);
      return;
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    let obj = {};
  
    switch (values.transaction) {
      case "Première réception":
        obj = { status: "Au dépôt", date_d_enlevement: formattedDate };
        break;
  
      case "Sortie livraison":
        if (values.livreur !== "") {
          obj = { status: "En cours", id_livreur: id[0].id };
        } else {
          setError(true);
          return;
        }
        break;
  
      case "Livraison réussie":
        obj = { status: "Livrés", date_de_livraison: formattedDate };
        break;
  
      case "Retour dépôt":
        obj = { status: "Rtn dépôt" };
        break;
  
      case "Retour définitif":
        obj = { status: "R définitif", date_de_retour: formattedDate };
        break;
  
      case "Retour expéditeur":
        obj = { status: "R expéditeur" };
        break;
  
      case "À vérifier":
        obj = { status: "À vérifier" };
        break;
  
      default:
        setError(true);
        return;
    }
  
    axios
      .put(`${baseUrl}/colis/${values.codeColis}`, obj)
      .then(() => {setSuccess(true); setFieldValue("codeColis", "")})
      .catch(() => setError(true));
  };
  

  const handleInputChange = (event) => { setError(false); setSuccess(false) }

  return (
    <>
      <Box m="10px 0 0 0"><h1>Transactions</h1></Box>
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
                  options={["", 'Première réception', 'Sortie livraison', 'Livraison réussie', 'Retour dépôt', 'Retour définitif', 'Retour expéditeur', 'À vérifier']}

                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: 'transaction',
                        value: newValue || '',
                      },
                    });
                    handleChange({
                      target: {
                        name: 'livreur',
                        value: '',
                      },
                    });
                    setHideLivreurs(newValue);
                    handleInputChange(event)
                  }}
                  value={values.transaction}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="filled"
                      label="Type de transaction"
                      onBlur={handleBlur}
                      error={!!touched.transaction && !!errors.transaction}
                      helperText={touched.transaction && errors.transaction}
                      sx={{ gridColumn: "span 4" }}
                    />
                  )}
                />
                {hideLivreurs === "Sortie livraison" && <Autocomplete
                  fullWidth
                  sx={{ gridColumn: "span 4" }}
                  options={listLivreurs}

                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: 'livreur',
                        value: newValue || '',
                      },
                    });
                    setId(livreurs.filter((e) => e.email === newValue));
                    handleInputChange(event);
                  }}
                  value={values.livreur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="filled"
                      label="Livreur"
                      onBlur={handleBlur}
                      error={!!touched.livreur && !!errors.livreur}
                      helperText={touched.livreur && errors.livreur}
                      sx={{ gridColumn: "span 4" }}
                    />
                  )}
                />}
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Code colis"
                  onBlur={handleBlur}
                  onChange={(e) => { handleInputChange(e); handleChange(e); }}
                  value={values.codeColis}
                  name="codeColis"
                  error={!!touched.codeColis && !!errors.codeColis}
                  helperText={touched.codeColis && errors.codeColis}
                  sx={{ gridColumn: "span 4" }}
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
                Confirmer
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

const checkoutSchema = yup.object().shape({
  transaction: yup.string().required("Champ obligatoire"),
  codeColis: yup.string().required("Champ obligatoire"),
});
const initialValues = {
  transaction: "",
  livreur: "",
  codeColis: "",
};

export default Transactions;
