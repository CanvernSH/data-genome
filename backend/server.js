const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const { open } = require('node:fs/promises');
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.get('/collect-genome-data', async (req, res) => {
    let arr = []
    const file = await open('../collect-random-data/simplified_sample_500.tsv');

    for await (const line of file.readLines()) {
        data = line.split("\t");
        
        // Ignore first line
        if (data[0] == "#CHROM")
            continue

        arr.push({'row_num': data[-1], 'REF': data[3], 'ALT': data[4] });
    }
    await file.close();
    res.send([1,2,3,4]);

})


app.listen(port, () => {
    console.log("Example app listening on port: " + port);
})