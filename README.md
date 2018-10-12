# A First try at Updating Documents in Cosmos with JavaScript and Azure Functions 

Sample local.settings.json: 
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName=sa;AccountKey=/asdfasdfasdf/HPIz4cjylAP+g26tEKbfZSi2FBVeIDr708VcWL04/6F1KO1wspMXvCirTYjlY91tA==;EndpointSuffix=core.windows.net",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "cosmosEndpoint": "https://cosmos.documents.azure.com:443/",
    "cosmosKey": "YNlpMSRAIYbPouQKFd0YKV0qf2zgbuN03Lxfs5xWb7huc5SbXpfQDRWuk7KhRXlD8CeY7oHsKUrjguJV2bBhOA==", 
    "myEventHubReadConnectionAppSetting" : "Endpoint=sb://iothub-spot-840786-a77bf29100.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=vzWgVH34Jo3pQluCzWRx9nHvU2jWTMfVdfN/o8svtho=;EntityPath=hubp",
    "MyAccount_COSMOSDB" : "AccountEndpoint=https://cosmosForYou.documents.azure.com:443/;AccountKey=YNlpMSRAIYbPouQKFd0YKV0qf2zgbuN03Lxfs5xWb7huc5SbXpfQDRWuk7KhRXlD8CeY7oHsKUrjguJV2bBhOA==;"
  }
}
```