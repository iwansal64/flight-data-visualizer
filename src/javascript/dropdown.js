const dropdown_options = Array.from(document.getElementsByClassName("dropdown-option"));

dropdown_options.forEach(option => {
    option.addEventListener("click", () => {
        const new_value = option.getAttribute("data-value");
        dropdown_options.forEach(element => element.classList.remove("active"));
        option.classList.add("active");
        option.parentElement.parentElement.setAttribute("data-selected", new_value);
        option.parentElement.previousElementSibling.innerHTML = new_value;
        option.parentElement.previousElementSibling.previousElementSibling.checked = false;
    });
});
