// Places visitors drive to on Ambergris Caye. One source for the Things to Do
// page and the illustrated island map. x/y are positions on the map drawing
// (viewBox 320x540, illustrated and not to scale).
// Owner review: keep descriptions accurate; avoid unverified distances or rules.
export const PLACES = [
  {
    id: 'town', icon: 'storefront', name: 'San Pedro town', x: 180, y: 392,
    text: 'The heart of Ambergris Caye, with restaurants, shops, bars, grocery stores, and the beachfront. Streets in town are narrow and busy, so park your cart and explore the waterfront on foot.',
  },
  {
    id: 'boca-del-rio', icon: 'wave', name: 'Boca del Rio', x: 186, y: 352,
    text: 'A neighborhood at the north end of town with a public beach area that is popular with locals and visitors for swimming and sunsets. It is an easy, short drive from most San Pedro accommodations.',
  },
  {
    id: 'north', icon: 'cart', name: 'North Ambergris Caye', x: 184, y: 150,
    text: 'Cross the bridge at the north end of town to reach the northern part of the island, with resorts, beach bars, and restaurants spread along the road. Ask whether a bridge pass is included in your rental before you go.',
  },
  {
    id: 'secret-beach', icon: 'palm', name: 'Secret Beach', x: 124, y: 252,
    text: 'One of the most popular golf cart trips on the island, on the calm west (lagoon) side of Ambergris Caye, north of town, with beach clubs and shallow turquoise water. The road can be rough, so allow plenty of time and check current conditions with our team.',
  },
  {
    id: 'south', icon: 'cart-right', name: 'South Ambergris Caye', x: 164, y: 478,
    text: 'South of town the island is quieter, with residential areas, resorts, and lagoon views. It is a relaxed drive for an afternoon or a meal away from the busiest streets.',
  },
  {
    id: 'reef', icon: 'scuba_diving', name: 'Reef and snorkel tour docks', x: 200, y: 412,
    text: 'Snorkeling and diving trips to the Belize Barrier Reef, including Hol Chan Marine Reserve and Shark Ray Alley, leave by boat from docks in San Pedro. Drive your cart to your tour operator, then pick it up when you return.',
  },
  {
    id: 'airstrip', icon: 'flight_land', name: 'San Pedro Airstrip (SPR)', x: 168, y: 434, mapOnly: true,
    text: 'Flying in? Pickup at the San Pedro airstrip (SPR) can be arranged. Send your flight arrival time when you book and we will confirm where to meet.',
  },
];
