const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // inserir dados
    proffyValue = {
        name: 'Gabriel Biasom',
        avatar: 'https://avatars1.githubusercontent.com/u/54422701?s=460&u=91874ff84f34809eb665da8169e345e2d96a7531&v=4',
        whatsapp: '62991920794',
        bio: 'Entusiasta das melhores tecnologias de química, física, experimentos e curiosidades cientificas.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
    }

    classValue = {
        subject: 1,
        cost: "20",
        // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 720,
            time_to: 1220
        }
    ]

    //await createProffy(db,{proffyValue, classValue, classScheduleValues})

    //consultar dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    // o horário qua a pessoa trabalha, é das 8h - 18h
    // o horário do time_from (18h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa ser acima
    const selectedClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)

    // console.log(selectedClassesSchedules)

})