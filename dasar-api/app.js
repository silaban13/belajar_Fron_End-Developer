const express = require('express');
const mysql = require('mysql'); 
const app = express();
const port = 3000;

app.use(express.json()); 

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mariono_silaban'
});

con.connect((err) => {
    if (err) {
        console.error("Gagagal konek ke dagtabase MYQL:", err.stack); 
        return;  
    } else {
        console.log("Berhasil konek ke database MySQL");
    }
});  

app.get('/gabungan1', (req, res) => {
    const query3 = 'SELECT id_dep FROM Karyawan UNION SELECT id_dep FROM Karyawan2 '; 
    con.query(query3, (err, result) => {
        if (err) {
            console.error("Gagal join", err);
            return res.status(500).json({ error: 'Gagal join' });
        }

      res.json(result);

    });
})

app.get('/gabungan2', (req, res) => {
    const query5 = 'SELECT nama, id_dep FROM Karyawan WHERE id_dep = 17 UNION ALL SELECT nama, id_dep FROM Karyawan2 WHERE id_dep > 12 ORDER BY id_dep '; 
    con.query(query5, (err, result) => {
        if (err) {
            console.error("Gagal join", err);
            return res.status(500).json({ error: 'Gagal join' });
        }

      res.json(result);

    });
})

app.get('/gabungan3', (req, res) => {
    const query4 = 'SELECT id_dep FROM Karyawan UNION ALL SELECT id_dep FROM Karyawan2 '; 
    con.query(query4, (err, result) => {
        if (err) {
            console.error("Gagal join", err);
            return res.status(500).json({ error: 'Gagal join' });
        } else {
                res.status(201).json({ message: " berhasil join", data: result });
        }

      res.json(result);

    });
})

app.post('/users', (req, res) => {
    const { nama, id_dep } = req.body; 

    if (!nama || !id_dep) {
        return res.status(400).json({ error: 'Nama dan id_dep wajib diisi' });
    }

    const query = 'INSERT INTO karyawan2 (nama, id_dep) VALUES (?, ?)'; 
    con.query(query, [nama, id_dep], (err, result) => {
        if (err) {
            console.error("Gagal menyimpan data pengguna:", err);
            return res.status(500).json({ error: 'Gagal menyimpan data pengguna' });
        }

        // Sukses
        res.status(201).json({ message: "User berhasil ditambahkan", id: result.insertId });
    });
});


app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});