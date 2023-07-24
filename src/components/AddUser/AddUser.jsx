import { Box, Button, TextField, Autocomplete, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useState } from "react";

const AddUser = ({setSuccess}) => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [error, setError] = useState(false);

  const handleFormSubmit = (values, { resetForm }) => {
    axios.post(`${baseUrl}/utilisateurs/register`, values).then(() => {setSuccess(true); resetForm()}).catch((err) => {setError(true)}).finally(() => {
        setTimeout(() => setSuccess(false), 1000);
      });
  };

  const handleInputChange = (event) => {setError(false)}

  return (
    <>
    <Box m="10px 0 0 0"><h1>Créer un compte</h1></Box>
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom complet"
                onBlur={handleBlur}
                onChange={(e) => { handleInputChange(e); handleChange(e); }}
                value={values.nom}
                name="nom"
                error={!!touched.nom && !!errors.nom}
                helperText={touched.nom && errors.nom}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Téléphone"
                onBlur={handleBlur}
                onChange={(e) => { handleInputChange(e); handleChange(e); }}
                value={values.telephone}
                name="telephone"
                error={!!touched.telephone && !!errors.telephone}
                helperText={touched.telephone && errors.telephone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="E-mail"
                onBlur={handleBlur}
                onChange={(e) => { handleInputChange(e); handleChange(e); }}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mot de passe"
                onBlur={handleBlur}
                onChange={(e) => { handleInputChange(e); handleChange(e); }}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />

              <Autocomplete
                fullWidth
                sx={{ gridColumn: "span 2" }}
                options={["",'admin', 'fournisseur', 'livreur', 'ouvrier']}

                onChange={(event, newValue) => {
                  handleChange({
                    target: {
                      name: 'role',
                      value: newValue || '',
                    },
                  });
                }}
                value={values.role}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="filled"
                    label="Role"
                    onBlur={handleBlur}
                    error={!!touched.role && !!errors.role}
                    helperText={touched.role && errors.role}
                    sx={{ gridColumn: "span 2" }}
                  />
                )}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Frais de livraison"
                onBlur={handleBlur}
                onChange={(e) => { handleInputChange(e); handleChange(e); }}
                value={values.frais_de_livraison}
                name="frais_de_livraison"
                error={!!touched.frais_de_livraison && !!errors.frais_de_livraison}
                helperText={touched.frais_de_livraison && errors.frais_de_livraison}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Frais de retour"
                onBlur={handleBlur}
                onChange={(e) => { handleInputChange(e); handleChange(e); }}
                value={values.frais_de_retour}
                name="frais_de_retour"
                error={!!touched.frais_de_retour && !!errors.frais_de_retour}
                helperText={touched.frais_de_retour && errors.frais_de_retour}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Adresse"
                onBlur={handleBlur}
                onChange={(e) => { handleInputChange(e); handleChange(e); }}
                value={values.addresse}
                name="addresse"
                error={!!touched.addresse && !!errors.addresse}
                helperText={touched.addresse && errors.addresse}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Matricule Fiscal"
                onBlur={handleBlur}
                onChange={(e) => { handleInputChange(e); handleChange(e); }}
                value={values.MF}
                name="MF"
                error={!!touched.MF && !!errors.MF}
                helperText={touched.MF && errors.MF}
                sx={{ gridColumn: "span 4" }}
              />
            
            </Box>
            {error && (
                <Box mt={1} color="red" textAlign="center" bgcolor="#fce6e6" borderRadius="4px" p={2} boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)">
                <Typography variant="body2">
                Adresse e-mail déjà utilisée
                </Typography>
              </Box>
              )}
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Ajouter utilisateur
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
  nom: yup.string().required("Champ obligatoire"),
  telephone: yup.string().required("Champ obligatoire"),
  email: yup.string().required("Champ obligatoire"),
  password: yup.string().required("Champ obligatoire"),
  role: yup.string().required("Champ obligatoire"),
  frais_de_livraison: yup.string().required("Champ obligatoire"),
  frais_de_retour: yup.string().required("Champ obligatoire"),
  addresse: yup.string().required("Champ obligatoire"),
});
const initialValues = {
  nom: "",
  telephone: "",
  email: "",
  password: "",
  role: "",
  frais_de_livraison: "",
  frais_de_retour: "",
  addresse: "",
  MF: "",

};

export default AddUser;
