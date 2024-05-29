
const axios = require('axios');

// Địa chỉ của API bạn muốn thử nghiệm
const test = 'http://127.0.0.2:5046/WeatherForecast';

// Thực hiện một yêu cầu GET đến API
axios.get(API_URL)
  .then(response => {
    console.log('Kết quả từ API:', response.data);
  })
  .catch(error => {
    console.error('Lỗi kết nối tới API:', error.message);
  });