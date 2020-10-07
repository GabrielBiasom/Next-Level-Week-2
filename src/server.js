// // DADOS
// const proffys = [
//     {
//         name: "Gabriel Biasom",
//         avatar: "https://avatars1.githubusercontent.com/u/54422701?s=460&u=91874ff84f34809eb665da8169e345e2d96a7531&v=4",
//         whatsapp: "62 991920794",
//         bio: `Entusiasta das melhores tecnologias de química, física, experimentos e curiosidades cientificas. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.`,
//         subject: "Ciências",
//         cost: "20",
//         weekday: [0],
//         time_from: [720],
//         time_to: [1220]
//     },
//     {
//         name: "Filipe Deschamps",
//         avatar: "https://avatars2.githubusercontent.com/u/4248081?s=460&u=98a643ad7f90c7950d9311e4b5a762fe77af8ada&v=4",
//         whatsapp: "1234545678969",
//         bio: "Entusiasta das melhores tecnologias de química, física, experimentos e curiosidades cientificas. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
//         subject: "Química",
//         cost: "20",
//         weekday: [1],
//         time_from: [720],
//         time_to: [1220]
//     }

// ]
// const subjects = [
//     "Artes",
//     "Biologia",
//     "Ciências",
//     "Educação física",
//     "Física",
//     "Geografia",
//     "História",
//     "Matemática",
//     "Português",
//     "Química",
// ]
// const weekdays = [
//     "Domingo",
//     "Segunda-feira",
//     "Terça-feira",
//     "Quarta-feira",
//     "Quinta-feira",
//     "Sexta-feira",
//     "Sábado",
// ]

// // FUNCIONALIDADES

// function getSubject(subjectNumber) {
//     const position = +subjectNumber - 1
//     return subjects[position]
// }

// const { subjects, weekdays, getSubject } = require('./utils/format')

// function pageLanding(req, res) {
//     return res.render("index.html")
// }

// function pageStudy(req, res) {
//     const filters = req.query
//     return res.render("study.html", { proffys, filters, subjects, weekdays })
// }

// function pageGiveClasses(req, res) {
//     const data = req.query

//     // se tiver dados (data)
//     const isNotEmpty = Object.keys(data).length > 0
//     if (isNotEmpty) {

//         data.subject = getSubject(data.subject)
//         // adicionar dados à lista de proffys
//         proffys.push(data)

//         return res.redirect("/study")

//     }
//     // se nao tiver dados , mostre a pagina
//     return res.render("give-classes.html", { subjects, weekdays })
// }

// SERVIDOR
const express = require('express')
const server = express()

const { pageLanding, pageGiveClasses, pageStudy, saveClasses } = require('./pages')

//configurar nunjucks (TEMPLATE ENGINE)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})
// INICIO E CONFIGURAÇÃO DO SERVIDOR
server
    // receber os dados do require.body
    .use(express.urlencoded({ extended: true }))
    // configurar arquivos (css ,scripts, imagens)
    .use(express.static("public"))
    //rotas da aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", saveClasses)
    // START DO SERVIDOR
    .listen(2020)