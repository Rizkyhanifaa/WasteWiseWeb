const CLASS_NAMES = [
  "battery", "biological", "brown-glass", "cardboard", "clothes", "green-glass", "metal", "paper", "plastic", "shoes", "trash", "white-glass"
];

// Fungsi ini memetakan 12 kelas spesifik ke 2 kategori umum ("Organik"/"Anorganik")
function mapToGeneralCategory(specificClass) {
  // Anda bisa menambahkan kelas lain jika ada yang bersifat organik
  const organicClasses = ["biological"]; 

  if (organicClasses.includes(specificClass)) {
    return "Organik";
  }
  return "Anorganik";
}


const ClassifyService = {
  _model: null,

  async _loadModel() {
    if (this._model) return; // Model sudah dimuat

    try{
      // Memastikan path ke model.json sudah benar
      this._model = await tf.loadLayersModel("/model/model.json");
      console.log("Model berhasil dimuat");
    } catch (error) {
      console.error("Gagal untuk memuat model:", error);
      throw new Error("Gagal memuat model klasifikasi. Coba muat ulang halaman.")
    }
  },

  async classifyImage(imageElement) {
    await this._loadModel();
    if (!this._model) {
      throw new Error("Model belum siap.");
    }

    // 1. Pra-pemrosesan gambar
    const tensor = tf.browser.fromPixels(imageElement).resizeNearestNeighbor([224, 224]) // Sesuaikan dengan input shape model [224, 224]
    .toFloat()
    .div(tf.scalar(255.0)) // Normalisasi
    .expandDims(); // Tambah dimensi batch

    // 2. Lakukan Prediksi
    const predictions = await this._model.predict(tensor).data();
    tensor.dispose(); // Membebaskan memori

    // 3. Proses hasil prediksi
    let maxConfidence = 0;
    let predictedIndex = -1;

    for (let i = 0; i < predictions.length; i++) {
      if(predictions[i] > maxConfidence){
        maxConfidence = predictions[i];
        predictedIndex = i;
      }
    }

    const specificClass = CLASS_NAMES[predictedIndex] || 'Tidak diketahui';
    const generalLabel = mapToGeneralCategory(specificClass);

    return {
      result: {
        label: generalLabel,
        specific: specificClass, // Mengirimkan kelas spesifik
        confidence: maxConfidence,
      },
    };
  },
};

export default ClassifyService;