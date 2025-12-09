import requests
import json

url = "http://computron.selfip.com:8000/graphql/"
headers = {"Content-Type": "application/json"}
query = """
mutation Login($input: LoginInput!) {
  login(input: $input) {
    success
    message
    token
    refreshToken
    refreshExpiresAt
    sessionId
    user {
      UserID
      Nickname
      IsFullAdmin
      UserPermissions {
        UserID
        CompanyID
        CompanyName
        BranchID
        BranchName
        RoleID
        RoleName
      }
    }
  }
}
"""
variables = {"input": {"nickname": "javierp", "password": "Estronci@"}}
payload = {"query": query, "variables": variables}

resp = requests.post(url, headers=headers, data=json.dumps(payload))
print("status:", resp.status_code)
print("body:", resp.text)
