import { Box, Button, TextField, Autocomplete } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { location } from "../../Data/Data";

const AddPickUp = ({setSuccess}) => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const id_fournisseur = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).id : null

  const handleFormSubmit = (values, { resetForm }) => {
    values["id_fournisseur"] = id_fournisseur;
    axios.post(`${baseUrl}/colis/add`, values).then(() => {setSuccess(true); resetForm()}).catch((err) => {console.log(err)}).finally(() => {
        setTimeout(() => setSuccess(false), 1000); // Clear success message after 3 seconds
      });
  };



 

  return (
    <>
    <Box m="10px 0 0 0"><h1>Ajouter colis</h1></Box>
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
                onChange={handleChange}
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
                onChange={handleChange}
                value={values.telephone}
                name="telephone"
                error={!!touched.telephone && !!errors.telephone}
                helperText={touched.telephone && errors.telephone}
                sx={{ gridColumn: "span 2" }}
              />

              <Autocomplete
                fullWidth
                sx={{ gridColumn: "span 2" }}
                options={Object.keys(location)}

                onChange={(event, newValue) => {
                  handleChange({
                    target: {
                      name: 'gouvernerat',
                      value: newValue || '',
                    },
                  });
                  handleChange({
                    target: {
                      name: 'delegation',
                      value: '',
                    },
                  });
                }}
                value={values.gouvernerat}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="filled"
                    label="Gouvernerat"
                    onBlur={handleBlur}
                    error={!!touched.gouvernerat && !!errors.gouvernerat}
                    helperText={touched.gouvernerat && errors.gouvernerat}
                    sx={{ gridColumn: "span 2" }}
                  />
                )}
              />

              <Autocomplete
                fullWidth
                sx={{ gridColumn: "span 2" }}
                options={location[values.gouvernerat] || []}

                onChange={(event, newValue) => {
                  handleChange({
                    target: {
                      name: 'delegation',
                      value: newValue || '',
                    },
                  });
                }}
                value={values.delegation}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="filled"
                    label="Délegation"
                    onBlur={handleBlur}
                    error={!!touched.delegation && !!errors.delegation}
                    helperText={touched.delegation && errors.delegation}
                    sx={{ gridColumn: "span 2" }}
                  />
                )}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Adresse complémentaire"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adresse}
                name="adresse"
                error={!!touched.adresse && !!errors.adresse}
                helperText={touched.adresse && errors.adresse}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Désignation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.designation}
                name="designation"
                error={!!touched.designation && !!errors.designation}
                helperText={touched.designation && errors.designation}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Nombre d'articles"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
                name="nombre"
                error={!!touched.nombre && !!errors.nombre}
                helperText={touched.nombre && errors.nombre}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Prix"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.prix}
                name="prix"
                error={!!touched.prix && !!errors.prix}
                helperText={touched.prix && errors.prix}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Commentaire"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.commentaire}
                name="commentaire"
                error={!!touched.commentaire && !!errors.commentaire}
                helperText={touched.commentaire && errors.commentaire}
                sx={{ gridColumn: "span 2" }}
              />
              
              {/* <Select
                fullWidth
                variant="filled"
                label="Product Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helpertext={touched.category && errors.category}
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="Product Category" disabled>
                  Product Category
                </MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
                <MenuItem value="HealthCare">HealthCare</MenuItem>
              </Select>
               */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Ajouter colis
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
  gouvernerat: yup.string().required("Champ obligatoire"),
  delegation: yup.string().required("Champ obligatoire"),
  adresse: yup.string().required("Champ obligatoire"),
  designation: yup.string().required("Champ obligatoire"),
  nombre: yup.string().required("Champ obligatoire"),
  prix: yup.string().required("Champ obligatoire"),
  // category: yup.string().required("required"),
});
const initialValues = {
  nom: "",
  telephone: "",
  gouvernerat: "",
  delegation: "",
  adresse: "",
  designation: "",
  nombre: "",
  prix: "",
  commentaire: "",
  // category: "Product Category",
};

export default AddPickUp;
