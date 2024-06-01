param(
    [Parameter(Mandatory = $true)]
    [string]$Url,
    [Parameter(Mandatory = $true)]
    [string]$ClientId,
    [Parameter(Mandatory = $true)]
    [string]$Tenant,
    [Parameter(Mandatory = $true)]
    [string]$CertificateBase64Encoded,
    [Parameter(Mandatory = $true)]
    [string]$SppkgFilePath
)



try {
    Write-Output "Connecting to SharePoint Online..."
    $connection = Connect-PnPOnline -Url $Url -ClientId $ClientId  -Tenant $Tenant -CertificateBase64Encoded $CertificateBase64Encoded -ReturnConnection
    Write-Output "Connection: $connection"
    Write-Output "Connection successful."
    Write-Output "Adding the app to the App Catalog..."
    Add-PnPApp -Path $SppkgFilePath -Scope Tenant -Overwrite -Publish -SkipFeatureDeployment -Connection $connection
    Write-Output "App added successfully."
}
catch {
    Write-Error "An error occurred: $_"
}
finally {
    $connection = $null
    Write-Output "Script completed."
}


