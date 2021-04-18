import firebase from "./firebase-app";
import { getFormValues, loginButton, showAlert, getQueryString } from "./utils";

document.querySelectorAll("main#auth").forEach((page) => {
  if (page) {
    const auth = firebase.auth();

    const hideAuthForms = () => {
      document
        .querySelectorAll("#auth form")
        .forEach((el) => el.classList.add("hide"));
    };

    const showAuthForm = (id) => {
      document.getElementById(id).classList.remove("hide");
    };

    let authHash = () => {
      hideAuthForms();

      if (sessionStorage.getItem("email")) {
        document
          .querySelectorAll("[name=email]")
          .forEach((el) => (el.value = sessionStorage.getItem("email")));
      }

      switch (window.location.hash) {
        case "#register":
          showAuthForm("form_register");
          break;

        case "#login":
          showAuthForm("form_login");
          break;

        case "#forget":
          showAuthForm("form_forget");
          break;

        case "#reset":
          showAuthForm("form_reset");
          break;

        default:
          const params = getQueryString();

          if (params.mode === "resetPassword") {
            showAuthForm("form_forget");
          } else {
            showAuthForm("form_login");
          }
      }
    };

    window.addEventListener("load", (e) => {
      authHash();
    });

    window.addEventListener("hashchange", (e) => {
      authHash();
    });

    //------------- Formulario Registrar Contato ------------------------
    const formRegister = page.querySelector("#form_register");

    if (formRegister) {
      const submit = formRegister.querySelector('[type="submit"]');

      submit.addEventListener("click", (e) => {
        e.preventDefault();

        hideAuthForms(formRegister);

        const values = getFormValues(formRegister);

        if (values.password_register !== values.password_confirm_register) {
          authHash();
          return showAlert("Senhas Incorretas.", true);
        }

        const btnSubmitFormText = submit.innerHTML;

        submit.innerHTML = "Criando conta...";
        submit.disabled = true;

        auth
          .createUserWithEmailAndPassword(
            values.email_register,
            values.password_register
          )
          .then((response) => {
            const { user } = response;
            user
              .updateProfile({
                displayName: values.name_register,
                phoneNumber: values.phone_register,
              })
              .then((res) => {
                showAlert("Registro Efetuado!!");
              });
            setTimeout(() => {
              window.location.href = "/auth.html#login";
            }, 2000);
          })
          .catch((error) => {
            showAlert(error.message, true);
            submit.innerHTML = btnSubmitFormText;
            submit.disabled = false;
          });
      });
    }

    //------------- Formulario Fazer Login ------------------------
    const formLogin = page.querySelector("#form_login");

    if (formLogin) {
      const submitLogin = formLogin.querySelector('[type="submit"]');

      submitLogin.addEventListener("click", (e) => {
        e.preventDefault();

        hideAuthForms(formLogin);

        const values = getFormValues(formLogin);

        const btnSubmitFormText = submitLogin.innerHTML;

        submitLogin.innerHTML = "Logando...";
        submitLogin.disabled = true;

        auth
          .signInWithEmailAndPassword(values.email_login, values.password_login)
          .then((response) => {
            loginButton();
            showAlert("Logado com Sucesso!");
            setTimeout(() => {
              window.location.href = "./";
            }, 3000);
          })
          .catch((err) => {
            showAlert(err, true);
            btnSubmitForm.innerHTML = btnSubmitFormText;
            btnSubmitForm.disabled = false;
          });
      });
    }

    //------------- Formulario Redefinir a Senha ------------------------
    const formReset = page.querySelector("#form_reset");

    if (formReset) {
      const submitReset = formReset.querySelector('[type="submit"]');

      submitReset.addEventListener("click", (e) => {
        e.preventDefault();

        const values = getFormValues(formReset);
        const btnSubmitFormText = submitReset.innerHTML;

        submitReset.disabled = true;
        submitReset.innerHTML = "Enviando...";

        auth
          .sendPasswordResetEmail(values.email_reset)
          .then(() => {
            showAlert("Verifique o seu email");
            setTimeout(() => {
              window.location.href = "/auth.html#login";
            }, 3000);
          })
          .catch((error) => {
            showAlert(error.message, true);
            submitReset.innerHTML = btnSubmitFormText;
            submitReset.disabled = false;
          });
      });
    }

    //------------- Formulario Atualizar a Senha ------------------------
    const formForget = page.querySelector("#form_forget");

    if (formForget) {
      const submitForget = formForget.querySelector('[type="submit"]');

      submitForget.addEventListener("click", (e) => {
        e.preventDefault();

        const btnSubmitFormText = submitForget.innerHTML;

        submitForget.disabled = true;
        submitForget.innerHTML = "Redefinindo...";

        const { oobCode } = getQueryString();
        const { password_forget, password_confirm_forget } = getFormValues(
          formForget
        );

        if (password_forget !== password_confirm_forget) {
          authHash();
          return showAlert("Senhas Incorretas.", true);
        }

        auth
          .verifyPasswordResetCode(oobCode)
          .then(() => auth.confirmPasswordReset(oobCode, password_forget))
          .then(() => {
            showAlert("Senha redefinida com sucesso!");
            setTimeout(() => {
              window.location.href = "/auth.html#login";
            }, 3000);
          })
          .catch((error) => {
            showAlert(error.message, true);
            submitForget.innerHTML = btnSubmitFormText;
            submitForget.disabled = false;
          });
      });
    }
  }
});
