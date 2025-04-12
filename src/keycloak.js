import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8082', // URL ของ Keycloak
    realm: 'auth101',
    clientId: 'my-spa-app',
    checkLoginIframe: false // ปิดการตรวจสอบ iframe เพื่อลดการใช้ Cookie
});

export default keycloak;