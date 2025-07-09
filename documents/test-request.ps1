# Step 1: Request access token
$response = Invoke-RestMethod -Method Post `
    -Uri "http://localhost:8081/realms/demo/protocol/openid-connect/token" `
    -ContentType "application/x-www-form-urlencoded" `
    -Body "grant_type=password&client_id=quarkus-client&username=IT210157&password=admin"

# Step 2: Store the access token
$accessToken = $response.access_token

# Step 3: Use the token in a curl request
curl.exe -H "Authorization: Bearer $accessToken" http://127.0.0.1:8080/api/security; echo
