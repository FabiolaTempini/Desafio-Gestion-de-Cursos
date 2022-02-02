const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { crearCurso, obtenerCurso, actualizarCurso, eliminarCurso } = require('./consulta.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (_, res) => {
    res.sendFile(__dirname + '/index.html')
})

//CREATE
app.post('/curso', async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body
    const respuesta = await crearCurso(nombre, nivelTecnico, fechaInicio, duracion)
    res.send(respuesta)
})

//READ
app.get('/cursos', async (_, res) => {
    const respuesta = await obtenerCurso();
    res.send(respuesta)
})

//UPDATE
app.put('/curso', async (req, res) => {
    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body
    const respuesta = await actualizarCurso(id, nombre, nivelTecnico, fechaInicio, duracion)
    res.send(respuesta)
})

//DELETE
app.delete('/curso/:id', async (req, res) => {
    const { id } = req.params
    const respuesta = await eliminarCurso(id)
    res.send(respuesta)
})

app.listen(3000, () => console.log(`SERVER ON`))