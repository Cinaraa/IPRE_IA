

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
// 👇 add this before your routes
app.use(express.json());

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        message: "Here is your t-shirt!",
        size:"L"
    })
});
app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { size } = req.body;

    if (!size) {
        return res.status(400).send({
            error: "Size is required to create a t-shirt."
        });
    }  
    res.status(200).send({
        message: `T-shirt with ID ${id} has been created.`,
        size: size,
    });
});

app.listen(
    PORT,
    () => {console.log(`Server is running on port ${PORT}`);
    }
)
