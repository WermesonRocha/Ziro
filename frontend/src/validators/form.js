import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Nome é obrigatório"),
  last_name: Yup.string().required("Sobrenome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  age: Yup.number().required("A idade é obrigatória")
});

export default validationSchema;
