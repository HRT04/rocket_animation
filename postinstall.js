const fs = require("fs");
const path = require("path");

const directoryPath = path.resolve(__dirname, "./node_modules/three.ar.js");
// ディレクトリが存在しない場合のみ作成する
if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath);
}
// index.d.tsを生成するコード
const declarationContent = 'declare module "three.ar.js";\n';

// index.d.tsをプロジェクトのルートに書き込む
fs.writeFileSync(
  path.resolve(__dirname, "./node_modeles/three.ar.js/index.d.ts"),
  declarationContent
);
