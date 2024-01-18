function kirimPesan() {
  // Mengambil nilai dari formulir
  var nama = document.getElementById("nama").value;
  var email = document.getElementById("email").value;
  var pesan = document.getElementById("pesan").value;

  // Validasi sederhana
  if (nama === "" || email === "" || pesan === "") {
    alert("Harap lengkapi semua field formulir!");
    return;
  }

  // Simulasi pengiriman pesan (Anda dapat menambahkan pengiriman ke server di sini)
  alert("Pesan berhasil dikirim!\nTerima kasih, " + nama + "!");
}
