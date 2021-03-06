const admin = require('../services/firebase')
const parkingsRef = admin.firestore().collection('Parkings');

module.exports = {
   
   async index(request, response) {
      const { parkingId, regionId } = request.params;

      console.log('Procurando spots...')
      const snapshot = await parkingsRef.doc(parkingId).collection('Regions').doc(regionId).collection('Spots').get();
      

      const spotsList = []
      snapshot.forEach(doc => {
         spotsList.push({id: doc.id, ... doc.data()})
      })

      console.log("Spots: ", spotsList)
      
      return response.json(spotsList);
   },

   async create(request, response) {
      const { parkingId, regionId } = request.params;
      const { id, type, coordinates } = request.body;

      await parkingsRef.doc(parkingId).collection('Regions').doc(regionId).collection('Spots').doc(id).set({
         coordinates,
         type
      })
      return response.json({ message: "Success" });
   },

   async delete(request, response) {
      const { parkingId, regionId, spotId } = request.params;

      await parkingsRef.doc(parkingId).collection('Regions').doc(regionId).collection('Spots').doc(spotId).delete()
      return response.json({ message: "Success" });
   }
}