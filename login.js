
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

function handleCredentialResponse(response) {
        
    const userProfile = parseJwt(response.credential);
    localStorage.setItem("userName", userProfile.name);
    localStorage.setItem("userEmail", userProfile.email);
    localStorage.setItem("userPicture", userProfile.picture);

    const totalDays = 7;
    const cookieExpirationDate = new Date();
    cookieExpirationDate.setTime(cookieExpirationDate.getTime() + (totalDays * 24 * 60 * 60 * 1000));
    const expiresText = "; expires=" + cookieExpirationDate.toUTCString();
    document.cookie = "userName=" + userProfile.name + expiresText;
    document.cookie = "userEmail=" + userProfile.email + expiresText;
    document.cookie = "userPicture=" + userProfile.picture + expiresText;
    window.location.href = "examples/test.html";
}

window.onload = async function () {
    const res = await fetch('/api/get-google-id');
    const data = await res.json();
    const googleClientId = data.client_id;
    google.accounts.id.initialize({
        client_id: googleClientId  ,
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("googleBtn"), { theme: "filled_blue", size: "large", width: 260 } 
    );

    google.accounts.id.prompt(); 
}