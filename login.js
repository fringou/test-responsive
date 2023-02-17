function showForm(form) {
    // Cacher tous les formulaires
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "none";
    // Afficher le formulaire sélectionné
    document.getElementById(form + "-form").style.display = "flex";
  }

  function login() {
    // Récupérez les données du formulaire de connexion
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
    // Effectuez votre traitement côté serveur ici (par exemple, en utilisant Fetch API)
    // ...
  }

  function signup() {
    // Récupérez les données du formulaire d'inscription
    var username = document.getElementById("signup-username").value;
    var password = document.getElementById("signup-password").value;
    var passwordConfirm = document.getElementById("signup-password-confirm").value;
    
    // Hash the password using SHA-256
    var hash = new TextEncoder().encode(password);
    var digest = crypto.subtle.digest('SHA-256', hash);
    digest.then(function (result) {
      var passwordHash = new Uint8Array(result);
      // Effectuez votre traitement côté serveur ici (par exemple, en utilisant Fetch API)
      // ...
    });
  }