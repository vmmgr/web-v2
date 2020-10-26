# vmmgr Web

## 特徴
* RestAPI経由でvmmgrをWebから操作
* PWAに対応

### 設定ファイル(enviroment)
`timeout: 21600 * 1000,` //APIの失効時間(ミリ秒)   
`  api: {`  
`    https: true,`
`    domain: "example.com",`
`  },`  
`  console: {`  
`    https: true,`  
`    domain: "example.com",`  
`  },`  
`  firebase: {`  
`    apiKey: "",`  
`    authDomain: "*.firebaseapp.com",`  
`    databaseURL: "https://*.firebaseio.com",`  
`    projectId: "*",`  
`    storageBucket: "*.appspot.com",`  
`    messagingSenderId: "*",`  
`    appId: "1:*:web:*",`  
`    measurementId: "G-*"`  
`  },`  
