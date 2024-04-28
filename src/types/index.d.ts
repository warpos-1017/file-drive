declare type CreateUserParams = {
  clerkId: string
  email: string
  username: string
  firstName: string
  lastName: string
  photo: string
}

declare type CheckPoint = {
  id: string
  userId: string
  trackerId: string
  location: {
    lat: number
    lng: number
    address: string
    radius: number
  }
  label: string
  description: string
  createdAt: Date
  from: Date
  to: Date
  externalId: string
  status: 'assigned' | 'pending'
  updatedAt: Date
  maxDelay: number
  min_stay_duration: number
  arrivedAt: Date
  stayDuration: number
  // "tags": [1, 2],
  // "type": "checkpoint",
  // "form": <form_object>,
  // "form_template_id": 13245
}
/*
{
  "id": 111,
  "user_id": 3,
  "tracker_id": 22,
  "location": {
      "lat": 51.283546,
      "lng": 7.301086,
      "address": "Fichtenstrasse 11",
      "radius": 150
  },
  "label": "Deliver parcels",
  "description": "Quickly",
  "creation_date": "2014-01-02 03:04:05",
  "from": "2014-02-03 04:05:06",
  "to": "2014-03-04 05:06:07",
  "external_id": null,
  "status": "assigned",
  "status_change_date": "2014-01-02 03:04:05",
  "max_delay" : 5,
  "min_stay_duration": 0,
  "arrival_date": "2014-01-02 03:04:05",
  "stay_duration": 0,
  "origin": "imported",
  "tags": [1, 2],
  "type": "checkpoint",
  "form": <form_object>,
  "form_template_id": 13245
} */
