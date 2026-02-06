import express from 'express';

const app = express();
const router = express.Router();
app.use(express.json());

const PORT = 3000;

let cars = [
    {id: 1, make:'Toyota', model: 'Camry', year: 2022, price: 2800},
    {id: 2, make:'Tesla', model: 'Model S', year: 2023, price: 2500},
    {id: 3, make:'Ford', model: 'F-150', year: 2021, price: 3500},
];

router.get('/', (req, res) => {
    res.json(cars);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id === id);

    if(!car) return res.status(404).send('Car not found');
    res.json(car);
});

router.post('/', (req, res) => {
    const {id, make, model, year, price} = req.body;

    if(!id, !make, !model, !year, !price) {
        return res.status(400).send('Please fill all fields!');
    }

    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year: Number(year),
        price: Number(price)
    };

    cars.push(newCar);
    res.status(201). json({
        message: 'Product created successfully',
        data: newCar
    });
});

router.put('/:id', (req, res) => {
    const id = Number(req.params);
    const index = cars.findIndex(c => c.id === id);

    if(index === -1) {
        return res.status(404).json({error: "Car not found"});
    };

    const {make, model, year, price} = req.body;

    if (make) cars[index].make = make;
    if (model) cars[index].model = model;
    if (year) cars[index].year = Number(year);
    if (price) cars[index].price = Number(price);

    res.json(cars[index]);
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params);
    const index = cars.findIndex(c => c.id === id);

    if(index === -1) {
        return res.status(404).json({err: 'Car not found'});
    };

    const deleted = cars.splice(index, 1)[0];
    res.json({message: "Car deleted", car: deleted});
});


app.use('/api/v1/cars', router);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT || 3000}`);
});