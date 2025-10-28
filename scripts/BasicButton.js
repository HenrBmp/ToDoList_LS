document.querySelector("input[value='Limpar']").addEventListener('click', () => {
    document.querySelector("#TaskDateInsert").value = null;
    document.querySelector("#TaskDescription").value = null;
});

document.querySelector("#resetName").addEventListener("click", () => {
    localStorage.removeItem("username");
    location.reload();
})

// Essa n é daqui
/* document.querySelector("input[type='Criar']").addEventListener("click", () => {
    
}); */