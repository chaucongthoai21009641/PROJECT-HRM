import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Cho phép truy cập từ mọi IP trong mạng nội bộ
    port: 5173, // Có thể đổi nếu bị trùng
    // proxy: {
    //   "/api": "http://localhost", // Giả sử backend của bạn chạy trên localhost, cổng 80
    // },
    allowedHosts: [
      "40xlte30yjdo.share.zrok.io", // Port 5713 Reactjs
      "iyv8ftx8dkxh.share.zrok.io", // Port 80 MySQL
      "localhost", // Thêm localhost vào nếu chưa có
    ],
    // allowedHosts: ["all"], // Cho phép tất cả các host
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import fs from "fs";
// import path from "path";

// // Sử dụng __dirname trực tiếp trong ES module
// const __dirname = path.resolve();

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
//       cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
//     },
//     host: "0.0.0.0",
//     port: 5173,
//   },
// });
