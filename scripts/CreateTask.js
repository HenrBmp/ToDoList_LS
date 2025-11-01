document.querySelector("input[value='Criar']")
.addEventListener("click", () => {
    if (!localStorage.getItem("taskList")) {
        localStorage.setItem("taskList", '[]');
    }
    // VERIFICA O INPUT
    if (!document.querySelector("#TaskDescription").value ||
    !document.querySelector("#TaskDateInsert").value) {
        alert("As informações inseridas são invalidas.");
    }

    const TaskSection = document.querySelector("#TaskList");
    const descricaoTarefa = document.querySelector("#TaskDescription").value;
    const year = document.querySelector("#TaskDateInsert").value.slice(0,4);
    const month = document.querySelector("#TaskDateInsert").value.slice(5,7);
    const day = document.querySelector("#TaskDateInsert").value.slice(8);
    const epoch = new Date(`${year}-${month}-${day}T00:00:00`).getTime();
    const TaskList = JSON.parse(localStorage.getItem("taskList"));
    const elementJSON = {
        "descricao": descricaoTarefa,
        "validade": {
            "strData": `${day}/${month}/${year}`,
            "epochData": epoch
        }
    }

    // SUBIR NO LOCALSTORAGE
    if (TaskList.some(e => e.descricao === elementJSON.descricao && e.validade.epochData === elementJSON.validade.epochData)) 
    {
        alert("Essa tarefa já existe");
        return;
    }
    TaskList.push(elementJSON);
    TaskList.sort((a,b) => a.validade.epochData - b.validade.epochData);
    localStorage.setItem("taskList", JSON.stringify(TaskList));

    // CRIAR ELEMENTO NA PAGINA
    // CRIAR ITEM
    const TaskItem = document.createElement("div");
    TaskItem.classList.add("TaskItem", "b-radius");
    const momentEpoch = new Date().getTime();
    // TAREFAS ATRASADAS
    if (epoch < momentEpoch) {
        TaskItem.classList.add("overdueTask");
    }

    // LABEL DE DESCRICAO
    const descricaoInput = document.createElement("p");
    descricaoInput.classList.add("taskTitle", "body-font");
    descricaoInput.innerHTML = descricaoTarefa;
    TaskItem.appendChild(descricaoInput);

    // DIV GENERICA
    const divGenerica = document.createElement("div");
    const validade = document.createElement("span");

    // DATA DE VALIDADE
    validade.classList.add("dataVal");
    validade.innerHTML = `${day}/${month}/${year}`;

    // CRIAR O BOTAO DE APAGAR
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("height", "24px");
    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("width", "24px");
    svg.setAttribute("fill", "#e3e3e3");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z");
    svg.appendChild(path);
    // BOTAO DE APAGAR FUNCIONAL
    svg.addEventListener("click", function () {
        // REMOVE DO DOM
        TaskItem.remove();

        // REMOVE DO JSON
        localStorage.setItem("taskList", JSON.stringify(TaskList.filter(e => e.descricao !== descricaoTarefa && e.validade.epoch !== epoch)));
    })

    divGenerica.appendChild(validade);
    divGenerica.appendChild(svg);
    TaskItem.appendChild(divGenerica);

    // ADICIONAR ELEMENTO
    /* for (let i = 0; i <= TaskItem.childElementCount - 1; i++) {
        const targetEpoch = document.querySelector(".TaskItem").
    } */
    TaskSection.appendChild(TaskItem);
});
