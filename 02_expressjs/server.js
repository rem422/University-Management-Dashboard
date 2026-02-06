import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send({message: "Hello from the Cars API!"})
});

app.get('/api/v1/cars', (req, res) => {
    res.send('All cars')
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT || 3000}`);
});