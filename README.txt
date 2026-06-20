生命靈數進階分析 App 使用方式

這是一個 PWA 手機 App。
可在手機瀏覽器開啟後加入主畫面，之後可像 App 一樣使用。

檔案內容：
- index.html：主程式
- manifest.json：App 安裝設定
- sw.js：離線快取
- icon-192.png / icon-512.png：App 圖示

手機使用方式：
1. 把整個資料夾上傳到 GitHub Pages、Netlify、Vercel 或自己的網站空間。
2. 用手機 Chrome 或 Safari 開啟網址。
3. Android Chrome：點右上角「⋮」→「加入主畫面」。
4. iPhone Safari：點分享 →「加入主畫面」。

注意：
如果只是在手機直接打開本機 HTML，通常不能完整安裝成 PWA。
要有網址並使用 HTTPS，安裝功能才會完整啟用。
