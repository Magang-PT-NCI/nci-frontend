module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      ["module:react-native-dotenv", {
        "moduleName": "@env", // Nama modul yang digunakan untuk mengimpor variabel .env
        "path": ".env",        // Lokasi file .env
        "blocklist": null,     // Daftar variabel yang ingin dikecualikan
        "allowlist": null,     // Daftar variabel yang diizinkan
        "safe": false,         // Menggunakan .env.example untuk validasi
        "allowUndefined": true // Mengizinkan variabel yang tidak didefinisikan di .env
      }]
    ]
  };
};
