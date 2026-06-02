function loadFragment(targetId, path) {
    return fetch(path)
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                document.getElementById(targetId).innerHTML = data;
            });
}

function markActiveNavigation() {
    var currentPage = document.body.dataset.page;
    document.querySelectorAll("[data-nav]").forEach(function (link) {
        if (link.dataset.nav === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}

function hydrateFooterYear() {
    var yearNode = document.getElementById("current-year");
    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        loadFragment("header", "pages/header.html"),
        loadFragment("footer", "pages/footer.html")
    ]).then(function () {
        markActiveNavigation();
        hydrateFooterYear();
    });
});
