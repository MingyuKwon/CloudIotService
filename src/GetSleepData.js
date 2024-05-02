// Axios 모듈을 가져옵니다.
const axios = require('axios');

// 오늘 날짜와 7일 전 날짜를 계산합니다.
const today = new Date();
const sevenDaysAgo = new Date(today);

// 7일을 빼서 7일 전 날짜를 설정합니다.
sevenDaysAgo.setDate(today.getDate() - 7);

// 날짜를 'YYYY-MM-DD' 형식으로 변환하는 함수
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// 오늘 날짜와 7일 전 날짜를 콘솔에 출력합니다.
console.log("Today's date: " + formatDate(today));
console.log("Seven days ago: " + formatDate(sevenDaysAgo));

// 사용할 accessToken
var accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1MzN0siLCJzdWIiOiJDMlZaSE4iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJwcm8gcm51dCByc2xlIHJjZiByYWN0IHJsb2MgcnJlcyByd2VpIHJociBydGVtIiwiZXhwIjoxNzE0NjQzODg5LCJpYXQiOjE3MTQ2MTUwODl9.61lwRKwL7daY8_VCviPdXbX7YYZZTCjKJ83tLlg-MDI';

// 디바이스 정보 요청 설정
const deviceConfig = {
    method: 'get',
    url: 'https://api.fitbit.com/1.2/user/-/devices.json',
    headers: { 
        'Authorization': `Bearer ${accessToken}`
    }
};

// 수면 정보 요청 설정
const sleepConfig = {
    method: 'get',
    url: `https://api.fitbit.com/1.2/user/-/sleep/date/${formatDate(sevenDaysAgo)}/${formatDate(today)}.json`,
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
};

// Axios를 사용하여 디바이스 정보 요청을 보내고 응답을 처리합니다.
axios(deviceConfig)
    .then(function (deviceResponse) {
        console.log('Device Data:', JSON.stringify(deviceResponse.data));
        // 수면 정보 요청 및 응답 처리
        axios(sleepConfig)
            .then(function (sleepResponse) {
                console.log('Sleep Data:', JSON.stringify(sleepResponse.data));
            })
            .catch(function (sleepError) {
                console.error('Error fetching sleep data:', sleepError);
            });
    })
    .catch(function (deviceError) {
        console.error('Error fetching device data:', deviceError);
    });
