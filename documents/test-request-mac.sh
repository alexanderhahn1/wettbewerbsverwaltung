#!/bin/bash

# Step 1: Request access token
response=$(curl -s -X POST "http://localhost:8081/realms/demo/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=password&client_id=quarkus-client&username=ahahn&password=admin")

# Step 2: Extract access token
accessToken=$(echo "$response" | jq -r '.access_token')

# Step 3: Use the token in a request
curl -H "Authorization: Bearer $accessToken" http://127.0.0.1:8080/api/security
echo