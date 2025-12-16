# Update Version Script for Calcul Desktop App
# Usage: .\update-version.ps1 -Version "0.5.0"

param(
    [Parameter(Mandatory=$true)]
    [string]$Version
)

Write-Host "Updating version to $Version..." -ForegroundColor Cyan

# Update version in tauri.conf.json
$tauriConfig = Get-Content "src-tauri\tauri.conf.json" -Raw | ConvertFrom-Json
$tauriConfig.version = $Version
$tauriConfig | ConvertTo-Json -Depth 10 | Set-Content "src-tauri\tauri.conf.json"

# Update version in Cargo.toml
$cargoContent = Get-Content "src-tauri\Cargo.toml" -Raw
$cargoContent = $cargoContent -replace '(?<=\[package\][^\[]*version\s*=\s*")[\d\.]+', $Version
$cargoContent | Set-Content "src-tauri\Cargo.toml"

# Update version in package.json
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
$packageJson.version = $Version
$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"

Write-Host "Version updated successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Build the app: bun tauri:build" -ForegroundColor White
Write-Host "2. Create git tag: git tag v$Version && git push origin v$Version" -ForegroundColor White
Write-Host "3. Create GitHub release and upload installers" -ForegroundColor White
