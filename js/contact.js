document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form");
    if (!form) {
        return;
    }

    var statusNode = document.getElementById("contact-form-status");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var formData = new FormData(form);
        var name = formData.get("name") || "";
        var email = formData.get("email") || "";
        var subject = formData.get("subject") || "";
        var message = formData.get("message") || "";

        var mailSubject = encodeURIComponent("[Portfolio] " + subject);
        var mailBody = encodeURIComponent(
                "Nom : " + name + "\n" +
                "Email : " + email + "\n\n" +
                message
                );

        if (statusNode) {
            statusNode.textContent = "Votre logiciel mail va s'ouvrir avec le message prérempli.";
        }

        window.location.href = "mailto:louis.leveque.nsi@gmail.com?subject=" + mailSubject + "&body=" + mailBody;
    });
});
