



const planesCount = 50

const planes = []
for (let i = 0; i < planesCount; i++) {
    a = "xx_" + i
    planes[a] = { name: a, location: { long: 90, lat: 90 } }
}

export async function getFlightData() {
    const array = []
    for (const plane of Object.keys(planes)) {
        const planeObject = planes[plane]
        planeObject.location = generateLocation(planeObject.location)
        array.push(planeObject)
    }
    return array;
}
export function subscribeToFlightDataChange(cb) {

    setInterval(async function () {
        const planes = await getFlightData()
        for (const plane of planes) {
            cb(plane)
        }
    }, 1000)


}

function generateLocation(location) {
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


export default {
    getFlightData,
    subscribeToFlightDataChange
}