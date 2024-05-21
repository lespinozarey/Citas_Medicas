import express from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import _ from "lodash";
import chalk from "chalk";

const app = express()

app.listen(3004, console.log('FUNCA!'))
let users = [];

const lista = (array) => {
    let templateLista = `
    <ul>
    `
    array.forEach(user => {
        templateLista += `
        <li>Nombre: ${user.first}, Apellido: ${user.last}, ID: ${user.id}, TimeStamp: ${user.time}, Genero: ${user.gender}</li>
        `
        console.log(chalk.bgRed.blue(`Nombre: ${user.first}, Apellido: ${user.last}, ID: ${user.id}, TimeStamp: ${user.time}, Genero: ${user.gender}`))
    })
    templateLista += `
    </ul>`
    
    return templateLista;
}

const fetcher = async () => {
    app.get('/usuarios', async (req, res) => {
        const { data } = await axios.get('https://randomuser.me/api')
        const { name: { first, last }, gender } = data.results[0]
        const id = uuidv4().slice(28)
        const time = moment().format('MM, YYYY, hh:mm:ss')
        users.push({ first, last, gender, id, time })
        const usersOrder = _.partition(users, ({ gender }) => gender == 'female');
        console.log(usersOrder[0])
        console.log(usersOrder[0].length)
        console.log(usersOrder[1])
        console.log(usersOrder[1].length)

        let template = `
        <h4>Total Mujeres ${usersOrder[0].length}</h4>
            ${lista(usersOrder[0])}        
        <h4>Total Hombres ${usersOrder[1].length}</h4>
            ${lista(usersOrder[1])}        
        `
        res.send(template)
    })
}

fetcher()

//1.El registro de los usuarios debe hacerse con la API Random User usando axios para consultar la data. (2 Puntos)
//2.Cada usuario registrado debe tener un campo id único generado por el paquete UUID. (2 Puntos)
//3.Cada usuario debe tener un campo timestamp almacenando la fecha de registro obtenida y formateada por el paquete Moment. (2 Puntos)
//4.Por cada consulta realizada al servidor, se debe devolverle al cliente una lista con los datos de todos los usuarios registrados usando Lodash para dividir el arreglo en 2 separando los usuarios por sexo. (2 Puntos)
//5.En cada consulta también se debe imprimir por la consola del servidor la misma lista de usuarios pero con fondo blanco y color de texto azul usando el paquete Chalk. (1 Punto)
//6.El servidor debe ser levantado con el comando Nodemon. (1 Punto)