import requests
import json

url = 'http://localhost:3000/schools'

data = {
       "name": "School-A",
       "status": "old",
       "startTime": "8:30am",
       "endTime": "1:30pm",
       "shift": "Morning",
       "address": {
           "town": "Nehar Kot",
           "tehsil": "Barkhan",
           "district": "Barkhan",
           "state": "Balochistan",
           "address": "address-1",
           "latitude": 29.79,
           "longitude": 69.47
       },
       "hasProjector": False,
       "hasLaptop": False,
       "organization": {
           "name": "publicschools"
       }
   }

json_data = json.dumps(data)

response = requests.post(url, data=json_data, headers={'Content-Type': 'application/json'})

print(response.text)