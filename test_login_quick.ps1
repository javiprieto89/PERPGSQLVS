# Test Login GraphQL
$body = @{
    query = "mutation Login(`$input: LoginInput!) { login(input: `$input) { success message token refreshToken refreshExpiresAt sessionId user { UserID Nickname FullName IsActive IsFullAdmin UserPermissions { CompanyID BranchID RoleID } } } }"
    variables = @{
        input = @{
            nickname = "javierp"
            password = "Estronci@"
        }
    }
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8000/graphql/" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ Login exitoso!" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error en login:" -ForegroundColor Red
    $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host $responseBody
    }
}
