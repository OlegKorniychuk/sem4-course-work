// Save the token to localStorage
localStorage.setItem("token", jwtToken);

// Extract the username from the token
const decodedToken = parseJwt(jwtToken);
const username = decodedToken.username;

// Redirect to the user's profile page
window.location.href = `/user/${username}`;

// Helper function to parse the JWT token and extract the payload
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}