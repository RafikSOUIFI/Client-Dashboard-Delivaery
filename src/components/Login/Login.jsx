import { useState } from "react";
import { Box, Button, TextField, InputAdornment, IconButton, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { UilSignInAlt } from '@iconscout/react-unicons';
import { UilEye, UilEyeSlash } from '@iconscout/react-unicons';
import axios from "axios";

const Login = ({ setRender, render ,setHideCards}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const expirationDate = new Date().getTime() + (24 * 60 * 60 * 1000);

  const handleFormSubmit = (values) => {
    axios.post(`${baseUrl}/utilisateurs/login`, values)
      .then((data) => {
        // Remove the old token, user, and expiration date before storing the new one
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
        localStorage.removeItem('expirationDate');
  
        // Store the new token and user data in local storage
        localStorage.setItem('jwt_token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('expirationDate', expirationDate);
      }).then(()=>{setRender(!render); setHideCards(false)})
      .catch((err) => {
        setLoginError(true);
      });
  };
  

  const handleInputChange = (event) => {
    // Clear the login error when email or password is changed
    setLoginError(false);
    // Handle other input changes if needed
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="90vh"
      padding={2}
    >

      <Box
        width={isNonMobile ? "400px" : "100%"}
        mt={3}
        borderRadius="8px"
        boxShadow="0px 2px 6px rgba(0, 0, 0, 0.23)"
        padding={3}
      >
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
              <Box display="grid" gap={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="E-mail"
                  onBlur={handleBlur}
                  onChange={(e) => { handleInputChange(e); handleChange(e); }}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  label="Mot de passe"
                  onBlur={handleBlur}
                  onChange={(e) => { handleInputChange(e); handleChange(e); }}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <UilEye /> : <UilEyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              {loginError && (
                <Box mt={1} color="red" textAlign="center" bgcolor="#fce6e6" borderRadius="4px" p={2} boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)">
                <Typography variant="body2">
                Email ou mot de passe incorrect.
                </Typography>
              </Box>
              )}
              <Box mt={3} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  startIcon={<UilSignInAlt />}
                >
                  Connexion
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().required("Veuillez saisir une adresse e-mail valide"),
  password: yup.string().required("Veuillez saisir un mot de passe valide"),
});

const initialValues = {
  email: "",
  password: "",
};

export default Login;
