import fs from "fs";
import path from "path";

// index.d.tsを生成するコード
const declarationContent = 'declare module "three.ar.js";\n';

// index.d.tsをプロジェクトのルートに書き込む
fs.writeFileSync(path.resolve(__dirname, "../index.d.ts"), declarationContent);
