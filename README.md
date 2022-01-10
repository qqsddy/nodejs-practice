# nodejs-practice
使用npm建立專案套件管理檔案package.json：
§ > npm init -y
§ 從github或bitbucket 網站clone 下來的專案，可以下式安裝package.json裡記錄的
模組：
§ > npm install

全域安裝es-checker 模組（套件）：
§ > npm install -g es-checker
§ > sudo npm install -g es-checker # mac上全域安裝需要權限
§ 測試環境（測試用，通常只使用一次）：> es-checker

nodemon會監看專案裡的檔案，有任何檔案變更，會重新啟動。
§ 全域安裝nodemon
§ > npm i -g nodemon
§ $ sudo npm i -g nodemon
§ nodemon的功能：專案中相關檔案修改時，會重新啟動server。

安裝dotenv套件，以載入.env 檔案裡的設定。
§ > npm i dotenv
§ .env 檔不應該加入git （版本控制）。
§ .env 可以放在專案以外的路徑。

專案安裝Express
§ > npm install --save express
§ > npm i express
§ 查看package.json內容
