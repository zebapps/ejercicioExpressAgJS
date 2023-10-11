const express = require('express');
const app = express();
const port = 9090;
const fs = require('fs');
// Define una ruta para la raíz de tu aplicación
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Reemplaza 'miarchivo.html' con el nombre de tu archivo
});

app.use(express.static('public'));

app.get('/api/symbols', (req, res) => {
    fs.readFile(__dirname + '/data/symbols.json', 'utf-8', (err,data) => {
        if (err) {
            res.status(500).json({error: 'Error al leer el archivo JSON'});
        } else {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        }
    });
});

app.get('/api/symbols/:symbol', (req, res) => {
    const symbol = decodeURIComponent(req.params.symbol);;
    console.log(symbol)

    fs.readFile(__dirname + '/data/symbols.json', 'utf-8', (err,data) => {
        if (err) {
            res.status(500).json({error: 'Error al leer el archivo JSON'});
        } else {
            const cadena = JSON.parse(data);
            console.log(symbol)

            const symbolData = cadena.symbolsList.find((r) => r.symbol === symbol)

            if (!symbolData) {
                res.status(404).json({mensaje: 'El Symbolo no pertenece al conjunto de datos'});
            } else {
                res.json(symbolData);
            }
        }
    });
});

app.get('/api/historical', (req, res) => {
    fs.readFile(__dirname + '/data/historical.json', 'utf-8', (err,data) => {
        if (err) {
            res.status(500).json({error: 'Error al leer el archivo JSON'});
        } else {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        }
    });
});

app.get('/api/historical/:symbol', (req, res) => {
    const symbol = decodeURIComponent(req.params.symbol);;
    console.log(symbol)

    fs.readFile(__dirname + '/data/historical.json', 'utf-8', (err,data) => {
        if (err) {
            res.status(500).json({error: 'Error al leer el archivo JSON'});
        } else {
            const cadena = JSON.parse(data);
            console.log(symbol)

            const symbolData = cadena.historicalStockList.find((r) => r.symbol === symbol)

            if (!symbolData) {
                res.status(404).json({mensaje: 'El Symbolo no pertenece al conjunto de datos'});
            } else {
                res.json(symbolData);
            }
        }
    });
});

app.listen(port, () => {
  console.log(`La API está escuchando en http://localhost:${port}`);
});

