
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('carInfo')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('carInfo').insert(generateData());
    });
};

function generateData() {

  return [
    {
      VIN: 'WBABE5329SJA11337',
      make: 'Ford',
      model: 'Escort',
      mileage: '199999',
      transmission: 'V6',
      title: 'clean'
    },
    {
      VIN: 'JN1CV6AR9BM309043',
      make: 'Chevy',
      model: 'Malibu',
      mileage: '99000',
      transmission: 'I4',
      title: 'salvage'
    },
    {
      VIN: '1J8GA59187L135099',
      make: 'Honda',
      model: 'Civic',
      mileage: '69000',
      transmission: 'V6',
      title: 'clean'
    },
    
    
  ]

}