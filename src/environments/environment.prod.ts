export const environment = {
  production: true,
  cache: true,
  client_id: "IvanicDabar",
  client_password: "IvanicDabarPristup",
  rest_server: {
    protokol: 'https://',
    host: 'ivanic-grad-dabar.versalink-api.com', 
    //host: 'rest-api.mkovacic-dev.com', // dev server comp 2
    functions: {
        api: '/api/',
        token: '/token.php' 
    },
    multimedia: '/Assets/multimedia'
  },
  google_map_api: 'AIzaSyDSqpoJa-PgQciD5Tf58LmssF0FLSYwcXY',
  cache_key: 'cache-key-',
  def_image: 'assets/imgs/no-image-icon-23485.png',
  company_id: 5,
  show_id: true,
  version: '13022024',
  db_version: '1.2.8',
};
