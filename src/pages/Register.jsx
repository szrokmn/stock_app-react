import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import Grid from "@mui/material/Grid";

import { Link, useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import useAuthCall from "../hooks/useAuthCall";

const Register = () => {
  const navigate = useNavigate();
  const { currentUser, error } = useSelector((state) => state.auth);
  const { register } = useAuthCall();

  const registerScheme = object({
    first_name: string()
      .required("Ad zorunludur")
      .max(20, "Ad en fazla 20 karakter olmalıdır"),
    last_name: string()
      .required("Soyad zorunludur")
      .max(20, "Soyad en fazla 20 karakter olmalıdır"),
    username: string()
      .required("Kullanıcı adı zorunludur")
      .max(20, "Kullanıcı adı en fazla 20 karakter olmalıdır"),
    email: string()
      .email("Lutfen valid bir email giriniz")
      .required("Email zorunludur"),
    password: string()
      .required("password zorunludur")
      .min(8, "password en az 8 karakter olmalıdır")
      .max(20, "password en fazla 20 karakter olmalıdır")
      .matches(/\d+/, "Password bir sayı içermelidir")
      .matches(/[a-z]/, "Password bir küçük harf içermelidir")
      .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
      .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir"),
  });

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>

          <Formik
            initialValues={{
              email: "",
              password: "",
              first_name: "",
              last_name: "",
              username: "",
            }}
            validationSchema={registerScheme}
            onSubmit={(values, actions) => {
              register({...values, password2:values.password})
              console.log(values)
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => {
              return (
                <Form>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField
                      label="User Name"
                      name="username"
                      id="username"
                      type="text"
                      variant="outlined"
                      value={values?.username || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                    <TextField
                      label="First Name"
                      name="first_name"
                      id="first_name"
                      type="text"
                      variant="outlined"
                      value={values?.first_name || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.first_name && Boolean(errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                    />
                    <TextField
                      label="Last Name"
                      name="last_name"
                      id="last_name"
                      type="text"
                      variant="outlined"
                      value={values?.last_name || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.last_name && Boolean(errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      id="email"
                      type="email"
                      variant="outlined"
                      value={values?.email || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      id="password"
                      type="password"
                      variant="outlined"
                      value={values?.password || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <LoadingButton type="submit" variant="contained">
                      Submit
                    </LoadingButton>
                  </Box>
                </Form>
              );
            }}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">Do you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={7} md={6}>
          <Container>
            <img src={image} alt="" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
