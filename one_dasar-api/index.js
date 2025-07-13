const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());

let sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mariono_silaban265'
});

sql.connect((err) => {
    if (err) {
        console.error("Gagal konek ke database MySQL:", err.stack);
        return;
    } else {
        console.log("Berhasil konek ke database MySQL");
    }
}); 

app.get('/gabung1', (req, res) => {
    const query3 = "SELECT m.Type_Mobil, s.Tgl_Pinjam FROM sewa s JOIN mobil m ON s.Kd_MBL = m.Kd_Mobil JOIN anggota a ON s.No_Member = a.No_Member WHERE s.Tgl_Pinjam = '2025-06-17'";
    sql.query(query3, (err, result) => {
        if (err) {
            console.error("Gagal join", err);
            return res.status(500).json({ error: 'Gagal join' });
        }

      res.json(result);

    });
})

app.get('/gabung2', (req, res) => {
    const query3 = "SELECT DISTINCT a.Nama_Member, a.Alamat_Member FROM sewa s JOIN anggota a ON s.No_Member = a.No_Member WHERE s.Tgl_Pinjam IN ('2025-06-16', '2025-06-19')";
    sql.query(query3, (err, result) => {
        if (err) {
            console.error("Gagal join", err);
            return res.status(500).json({ error: 'Gagal join' });
        }

      res.json(result);

    });
})

app.get('/gabung3', (req, res) => {
    const query3 = "SELECT m.Type_Mobil, m.Merk_Mobil FROM sewa s JOIN anggota a ON s.No_Member = a.No_Member JOIN mobil m ON s.Kd_MBL = m.Kd_Mobil WHERE a.Nama_Member = 'M. Sulaiman'";
    sql.query(query3, (err, result) => {
        if (err) {
            console.error("Gagal join", err);
            return res.status(500).json({ error: 'Gagal join' });
        }

      res.json(result);

    });
})

app.get('/gabung4', (req, res) => {
    const query3 = "SELECT a.Nama_Member, m.Merk_Mobil, s.Tgl_Pinjam FROM sewa s JOIN anggota a ON s.No_Member = a.No_Member JOIN mobil m ON s.Kd_MBL = m.Kd_Mobil WHERE a.Alamat_Member = 'Pasar Minggu'";
    sql.query(query3, (err, result) => {
        if (err) {
            console.error("Gagal join", err);
            return res.status(500).json({ error: 'Gagal join' });
        }

      res.json(result);

    });
})

app.get('/gabung5', (req, res) => {
    const query3 = "SELECT No_Member, Nama_Member, Alamat_Member FROM anggota WHERE Identitas_Tertahan = 'Kartu BPJS'";
    sql.query(query3, (err, result) => {
        if (err) {
            console.error("Gagal join", err);
            return res.status(500).json({ error: 'Gagal join' });
        }

      res.json(result);

    });
})

app.get('/gabung6', (req, res) => {
    const query3 = "SELECT a.No_Member, a.Nama_Member, a.Alamat_Member FROM sewa s JOIN anggota a ON s.No_Member = a.No_Member WHERE s.Tgl_Kembali IN ('2025-06-18', '2025-06-21')";
    sql.query(query3, (err, result) => {
        if (err) {
            console.error("Gagal join", err);
            return res.status(500).json({ error: 'Gagal join' });
        }

      res.json(result);

    });
})

app.get('/gabung7', (req, res) => {
    const query3 = "SELECT No_Member, Nama_Member, Alamat_Member FROM anggota WHERE Identitas_Tertahan = 'Kartu Mahasiswa'";
    sql.query(query3, (err, result) => {
        if (err) {
            console.error("Gagal join", err);
            return res.status(500).json({ error: 'Gagal join' });
        }

      res.json(result);

    });
})

app.get('/gabung8', (req, res) => {
    const query3 = "SELECT  DAYNAME(NOW()) AS Hari, DATE_FORMAT(NOW(), '%d-%m-%Y') AS Tanggal, DATE_FORMAT(NOW(), '%H:%i:%s') AS Waktu";
    sql.query(query3, (err, result) => {
        if (err) {
            console.error("Gagal join", err);
            return res.status(500).json({ error: 'Gagal join' });
        }

      res.json(result);

    });
})

app.post('/anggota', (req, res) => {
    const {No_Member, Identitas_Tertahan, Nama_Member, Alamat_Member } = req.body;
  
    if (!No_Member || !Identitas_Tertahan || !Nama_Member || !Alamat_Member) {
        return res.status(400).json({ error: 'Semua kolom harus diisi' });
    }

    const query = 'INSERT INTO anggota (No_Member, Identitas_Tertahan, Nama_Member, Alamat_Member) VALUES (?, ?, ?, ?)';
    sql.query(query, [No_Member, Identitas_Tertahan, Nama_Member, Alamat_Member], (err, result) => {
        if (err) {
            console.error("Gagal menambahkan anggota:", err);
            return res.status(500).json({ error: 'Gagal menambahkan anggota' });
        }
        //Sukses menambahkan anggota
        res.status(201).json({ message: 'Anggota berhasil ditambahkan', id: result.inserId });
    });
})

app.post('/mobil', (req, res) => {
    const {Kd_Mobil, Type_Mobil, Merk_Mobil, Jml_Mobil } = req.body;
  
    if (!Kd_Mobil || !Type_Mobil || !Merk_Mobil || !Jml_Mobil) {
        return res.status(400).json({ error: 'Semua kolom harus diisi' });
    }

    const query = 'INSERT INTO mobil (Kd_Mobil, Type_Mobil, Merk_Mobil, Jml_Mobil) VALUES (?, ?, ?, ?)';
    sql.query(query, [Kd_Mobil, Type_Mobil, Merk_Mobil, Jml_Mobil], (err, result) => {
        if (err) {
            console.error("Gagal menambahkan mobil:", err);
            return res.status(500).json({ error: 'Gagal menambahkan mobil' });
        }
        //Sukses menambahkan anggota
        res.status(201).json({ message: 'Mobil berhasil ditambahkan', id: result.inserId });
    });
})

app.post('/sewa', (req, res) => {
    const {Kd_Sewa, No_Member, Kd_MBL, Tgl_Pinjam, Tgl_Kembali } = req.body;
  
    if (!Kd_Sewa || !No_Member || !Kd_MBL || !Tgl_Pinjam || !Tgl_Kembali) {
        return res.status(400).json({ error: 'Semua kolom harus diisi' });
    }

    const query = 'INSERT INTO sewa (Kd_Sewa, No_Member, Kd_MBL, Tgl_Pinjam, Tgl_Kembali) VALUES (?, ?, ?, ?, ?)';
    sql.query(query, [Kd_Sewa, No_Member, Kd_MBL, Tgl_Pinjam, Tgl_Kembali], (err, result) => {
        if (err) {
            console.error("Gagal menambahkan data:", err);
            return res.status(500).json({ error: 'Gagal menambahkan data' });
        }
        //Sukses menambahkan anggota
        res.status(201).json({ message: 'Data berhasil ditambahkan', id: req.body.Kd_Sewa });

    });
})



app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});