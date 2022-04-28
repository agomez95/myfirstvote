const voteForm = document.querySelector("#voteForm")

document.addEventListener("DOMContentLoaded", () => {
    App.init()
})

voteForm.addEventListener("submit", e => {
    e.preventDefault() //con esto cancelamos el refresh de la pagina que era automatico

    App.doVote(voteForm["fullname"].value, voteForm["option"].value)
})