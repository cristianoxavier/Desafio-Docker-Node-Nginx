const express = require('express');
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql');
const connection = mysql.createConnection(config);



app.get('/', (req, res) => {
    const sql = `INSERT INTO people(name) values('Cristiano Xavier')`
    connection.query(sql);

    const query = 'SELECT * FROM people';
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Erro na consulta ao banco de dados:', err);
            res.status(500).send('Erro interno do servidor');
        } else {
            // Renderizar os resultados em HTML
            const html = '<h1>Full Cycle Rocks!</h1>' +
                '<ul>' +
                result.map(person => `<li>${person.name}</li>`).join('') +
                '</ul>';

            res.send(html);
        }
    });
})

app.listen(port, () => {
    console.log('Rodando na porta: ' + port);
})