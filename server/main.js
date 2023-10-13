import { Meteor } from 'meteor/meteor';

import { PlanesCollection } from '../imports/api/planes';

import api from '../imports/api/flightAPI'

import { ConfigurationCollection } from '../imports/api/configuration';
import process from 'process'


Meteor.startup(async () => {
  await PlanesCollection.removeAsync({})
  await ConfigurationCollection.removeAsync({})

  await ConfigurationCollection.insertAsync({
    mapboxAccessToken: process.env.MAP_BOX_ACCESS_TOKEN
  })

  const planes = await api.getFlightData()

  for (const plane of planes){
    await PlanesCollection.upsertAsync(
      {
        plane:plane.name
      }, plane
    )
  }


  api.subscribeToFlightDataChange(function(plane){
    PlanesCollection.updateAsync(
      {
        name: plane.name
      }, { $set: plane }
    )
  })


  Meteor.publish("configuration", function () {
    return ConfigurationCollection.find();
  });

  Meteor.publish("planes", function () {
    return PlanesCollection.find();
  });

})