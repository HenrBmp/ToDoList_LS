const placeUser = document.querySelector("#name-place");
if (localStorage.getItem("username")) {
    placeUser.innerHTML = localStorage.getItem("username");
} else {
    // DESFOCANDO O FUNDO
    const blur = document.createElement("div");
    blur.classList.add("backdrop-box");
    document.body.appendChild(blur);

    // CAIXA DE INSERÇÃO DO NOME
    const box = document.createElement("div");
    box.classList.add("pop-up", "darken-bg", "b-radius");

    const title = document.createElement("p");
    title.classList.add("head-font");
    title.innerText = "Insira um nome, é assim que iremos te chamar.";
    box.appendChild(title);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.classList.add("half-b-radius", "none-bord", "input-text-params");
    box.appendChild(input);

    const send = document.createElement("input");
    send.setAttribute("type", "button");
    send.setAttribute("value", "Pronto");
    send.setAttribute("style", "display: block; margin: .5rem auto");
    send.classList.add("b-radius");
    box.appendChild(send);

    blur.appendChild(box);

    send.addEventListener("click", () => {
        const nome = document.querySelector(".pop-up input[type='text']").value;
        if (nome) {
            localStorage.setItem("username", nome);
            placeUser.innerHTML = nome;
            document.body.removeChild(blur);
        } else {
            alert("O nome inserido é invalido");
        }
    });
}
