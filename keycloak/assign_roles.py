import requests
import json
import time

# === CONFIG ===
KEYCLOAK_BASE_URL = "https://auth.htl-leonding.ac.at"  # Update if hosted elsewhere
REALM = "wettbewerbsdatenbank"                         # Replace with your realm name
ADMIN_USERNAME = "it210157"                # Replace with realm admin username
ADMIN_PASSWORD = "Hoppel.110406"             # Replace with realm admin password
CLIENT_ID = "admin-cli"

# === AUTHENTICATE ===
token_url = f"{KEYCLOAK_BASE_URL}/realms/{REALM}/protocol/openid-connect/token"
token_response = requests.post(token_url, data={
    "grant_type": "password",
    "client_id": CLIENT_ID,
    "username": ADMIN_USERNAME,
    "password": ADMIN_PASSWORD
})

if token_response.status_code != 200:
    print("❌ Failed to get token:", token_response.text)
    exit()

access_token = token_response.json()["access_token"]
headers = {"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"}

# === GET ROLES ===
def get_role(role_name):
    url = f"{KEYCLOAK_BASE_URL}/admin/realms/{REALM}/roles/{role_name}"
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        print(f"❌ Failed to fetch role '{role_name}':", res.text)
        return None
    return res.json()

teacher_role = get_role("teacher")
student_role = get_role("student")

if not teacher_role or not student_role:
    print("❌ Required roles not found.")
    exit()

# === GET ALL USERS WITH PAGINATION ===
print("🔍 Fetching all users...")
all_users = []
first = 0
batch_size = 100

# ...
seen_user_ids = set()
total_fetched = 0

try:
    while True:
        users_url = f"{KEYCLOAK_BASE_URL}/admin/realms/{REALM}/users?first={first}&max={batch_size}&enabled=true"
        print(f"📥 Requesting users from {first} to {first + batch_size}...")
        res = requests.get(users_url, headers=headers)

        if res.status_code != 200:
            print(f"❌ Failed to fetch users at offset {first}: {res.status_code} {res.text}")
            break

        batch = res.json()

        if not batch:
            print("✅ No more users found — finished.")
            break

        new_users = []
        for user in batch:
            if user["id"] in seen_user_ids:
                continue
            if user["username"].startswith("test"):
                print(f"🚫 Skipping test user: {user['username']}")
                continue

            seen_user_ids.add(user["id"])
            new_users.append(user)

        if not new_users:
            print("⚠️ No new users in batch, stopping to prevent infinite loop.")
            break

        all_users.extend(new_users)
        total_fetched += len(new_users)
        print(f"✅ Added {len(new_users)} new users (total: {total_fetched}).")

        # Stop if last batch was smaller than expected
        if len(batch) < batch_size:
            print("✅ Last batch smaller than batch_size — assumed end of users.")
            break

        first += batch_size
        time.sleep(0.1)

except KeyboardInterrupt:
    print("🛑 Script interrupted by user.")

# === ASSIGN ROLES BASED ON EMAIL ===
for user in all_users:
    email = user.get("email")
    username = user.get("username")
    user_id = user["id"]

    if not email:
        print(f"⚠️ Skipping {username} – no email.")
        continue

    email = email.strip().lower()

    role_to_assign = None
    if email.endswith("@htl-leonding.ac.at"):
        role_to_assign = teacher_role
    elif email.endswith("@students.htl-leonding.ac.at"):
        role_to_assign = student_role
    else:
        print(f"ℹ️ Skipping {email} – domain not matched.")
        continue

    assign_url = f"{KEYCLOAK_BASE_URL}/admin/realms/{REALM}/users/{user_id}/role-mappings/realm"
    response = requests.post(assign_url, headers=headers, data=json.dumps([role_to_assign]))

    if response.status_code == 204:
        print(f"✅ Assigned role '{role_to_assign['name']}' to {email}")
    else:
        print(f"❌ Failed to assign role to {email}: {response.status_code} {response.text}")
