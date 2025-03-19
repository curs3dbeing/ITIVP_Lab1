function autocomplete(inp, arr) {
    let currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) return false;

        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);

        for (i = 0; i < arr.length; i++) {
            const item = arr[i].toLowerCase();
            const search = val.toLowerCase();
            if (item.includes(search)) {
                b = document.createElement("DIV");
                const regex = new RegExp(search, 'gi');
                b.innerHTML = arr[i].replace(regex, match => `<strong>${match}</strong>`);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

const messages = ['Здравствуйте, мы хотим с вами сотрудничать.', 'Здравствуйте, мы хотим пользоваться вашим проектом.', 'Здравствуйте, мы хотим поддержать развитие вашего стартапа.', 'Здравствуйте, мы хотим заняться спонсорством вашей идеи.'];
const countries = ['Беларусь', 'Россия', 'Украина', 'Казахстан', 'Соединенные Штаты Америки', 'Чехия', 'Польша', 'Китай', 'Япония'];
autocomplete(document.getElementById("myInput"), messages);
autocomplete(document.getElementById("countries"), countries);
