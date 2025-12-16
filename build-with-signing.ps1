# Build script with signing for auto-updates
# Run interactively to enter password

Write-Host "Building Calcul with auto-update support..." -ForegroundColor Cyan
Write-Host ""

# Set the private key
$env:TAURI_SIGNING_PRIVATE_KEY = Get-Content "$env:USERPROFILE\.tauri\myapp.key" -Raw

# Prompt for password
$password = Read-Host "Enter your signing key password"
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD = $password

Write-Host ""
Write-Host "Cleaning previous build..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "src-tauri\target" -ErrorAction SilentlyContinue

Write-Host "Starting build..." -ForegroundColor Green

# Build
bun tauri:build

# Check if signature files were created
Write-Host ""
Write-Host "Checking for signature files..." -ForegroundColor Yellow
$sigFiles = Get-ChildItem "src-tauri\target\release\bundle" -Recurse -Filter "*.sig"
if ($sigFiles.Count -gt 0) {
    Write-Host "✓ Signature files created successfully!" -ForegroundColor Green
    $sigFiles | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor White }
} else {
    Write-Host "✗ No signature files found - signing may have failed!" -ForegroundColor Red
}

# Check for latest.json
$jsonFile = Get-ChildItem "src-tauri\target\release\bundle" -Recurse -Filter "latest.json"
if ($jsonFile) {
    Write-Host "✓ latest.json created!" -ForegroundColor Green
} else {
    Write-Host "✗ latest.json not found!" -ForegroundColor Red
}
