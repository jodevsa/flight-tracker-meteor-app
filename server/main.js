import { Meteor } from 'meteor/meteor';

import { PlanesCollection } from '../imports/api/planes';
import { ConfigurationCollection } from '../imports/api/configuration';
import process from 'process'


const planesCount = 50
const planes = []
for (let i = 0; i < planesCount; i++) {
  a = "xx_" + i
  planes[a] = { plane: [a], location: { long: 90, lat: 90 } }
}

function generateLocation(location, max = 2000) {
  let latitude = location.lat
  let longitude = location.long

  if (Math.abs(longitude) >= 90) {
    longitude = Math.random() * 90 * (Math.round(Math.random()) ? 1 : -1)
  }
  if (Math.abs(latitude) >= 90) {
    latitude = Math.random() * 90 * (Math.round(Math.random()) ? 1 : -1)
  }

  let inc = Math.random() * 0.1
  const newLatitude = Math.min(90, latitude + inc)
  const newLongitude = Math.min(90, longitude + inc)

  return {
    lat: newLatitude,
    long: newLongitude,

  };
}



Meteor.startup(async () => {
  await PlanesCollection.removeAsync({})
  await ConfigurationCollection.removeAsync({})

  await ConfigurationCollection.insertAsync({
    mapboxAccessToken: process.env.MAP_BOX_ACCESS_TOKEN
  })

  for (const plane of Object.keys(planes)) {
    const planeObject = planes[plane]
    planeObject.location = generateLocation(planeObject.location)

    PlanesCollection.upsertAsync(
      {
        plane
      }, planeObject
    )

  }

  setInterval(async function () {
    for (const plane of Object.keys(planes)) {
      const planeObject = planes[plane]
      planeObject.location = generateLocation(planeObject.location)

      PlanesCollection.updateAsync(
        {
          plane
        }, { $set: planeObject }
      )

    }

  }, 1000)


  Meteor.publish("configuration", function () {
    return ConfigurationCollection.find();
  });

  Meteor.publish("planes", function () {
    return PlanesCollection.find();
  });

})