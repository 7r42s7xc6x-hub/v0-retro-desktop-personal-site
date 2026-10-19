export interface TravelPlace {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
  visits?: number
  lived?: string
  note?: string
}

export const travelPlaces: TravelPlace[] = [
  // Portugal
  { name: "Lisbon", country: "Portugal", lat: 38.7223, lon: -9.1393, lived: "Lived here 16 years" },
  { name: "Porto", country: "Portugal", lat: 41.1579, lon: -8.6291, visits: 4 },
  { name: "Algarve", country: "Portugal", lat: 37.0194, lon: -7.9304, visits: 20, note: "All over — 20+ times" },
  { name: "Alentejo", country: "Portugal", lat: 38.015, lon: -7.8632, visits: 6, note: "All over the region" },
  { name: "Évora", country: "Portugal", lat: 38.5667, lon: -7.9, visits: 4 },
  { name: "Viana do Castelo", country: "Portugal", lat: 41.6932, lon: -8.8329, visits: 1 },
  { name: "Braga", country: "Portugal", lat: 41.5454, lon: -8.4265, visits: 1 },
  { name: "Aveiro", country: "Portugal", lat: 40.6405, lon: -8.6538, visits: 1 },
  { name: "Madeira", country: "Portugal", lat: 32.6669, lon: -16.9241, visits: 2 },
  { name: "Porto Santo", country: "Portugal", lat: 33.0642, lon: -16.3389, visits: 1 },
  { name: "São Miguel", country: "Portugal", lat: 37.7412, lon: -25.6756, visits: 3, note: "Azores" },

  // Spain
  { name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038, visits: 3 },
  { name: "Barcelona", country: "Spain", lat: 41.3851, lon: 2.1734, visits: 1 },
  { name: "Seville", country: "Spain", lat: 37.3891, lon: -5.9845, visits: 3 },
  { name: "Mallorca", country: "Spain", lat: 39.5696, lon: 2.6502, visits: 1 },
  { name: "Menorca", country: "Spain", lat: 39.8885, lon: 4.2658, visits: 1 },
  { name: "Ibiza", country: "Spain", lat: 38.9067, lon: 1.4206, visits: 1 },
  { name: "Formentera", country: "Spain", lat: 38.699, lon: 1.432, visits: 1 },
  { name: "Andorra", country: "Andorra", lat: 42.5063, lon: 1.5218, visits: 1 },

  // Italy
  { name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964, visits: 1 },
  { name: "Milan", country: "Italy", lat: 45.4642, lon: 9.19, visits: 2 },
  { name: "Venice", country: "Italy", lat: 45.4408, lon: 12.3155, visits: 1 },
  { name: "Florence", country: "Italy", lat: 43.7696, lon: 11.2558, visits: 1 },
  { name: "Naples", country: "Italy", lat: 40.8518, lon: 14.2681, visits: 1 },
  { name: "Capri", country: "Italy", lat: 40.5532, lon: 14.2429, visits: 1 },
  { name: "Sicily", country: "Italy", lat: 38.1157, lon: 13.3615, visits: 1 },
  { name: "Puglia", country: "Italy", lat: 41.1171, lon: 16.8719, visits: 1 },
  { name: "Lago di Como", country: "Italy", lat: 45.9868, lon: 9.2575, visits: 1 },

  // Rest of Europe
  { name: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278, visits: 1 },
  { name: "Manchester", country: "United Kingdom", lat: 53.4808, lon: -2.2426, visits: 1 },
  { name: "Berlin", country: "Germany", lat: 52.52, lon: 13.405, visits: 1 },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, visits: 2 },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041, visits: 1 },
  { name: "Copenhagen", country: "Denmark", lat: 55.6761, lon: 12.5683, visits: 1 },
  { name: "Billund", country: "Denmark", lat: 55.7308, lon: 9.1216, visits: 1 },
  { name: "Athens", country: "Greece", lat: 37.9838, lon: 23.7275, visits: 1 },

  // Africa
  { name: "Tangier", country: "Morocco", lat: 35.7595, lon: -5.834, visits: 1 },
  { name: "Marrakesh", country: "Morocco", lat: 31.6295, lon: -7.9811, visits: 1 },
  { name: "Praia", country: "Cabo Verde", lat: 14.933, lon: -23.5133, visits: 1 },

  // Brazil / Mexico
  { name: "Salvador", country: "Brazil", lat: -12.9777, lon: -38.5016, visits: 1 },
  { name: "Monterrey", country: "Mexico", lat: 25.6866, lon: -100.3161, visits: 1 },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lon: -99.1332, visits: 1 },

  // United States
  { name: "New York City", country: "United States", state: "New York", lat: 40.7128, lon: -74.006, visits: 1 },
  { name: "Boston", country: "United States", state: "Massachusetts", lat: 42.3601, lon: -71.0589, visits: 1 },
  { name: "Omaha", country: "United States", state: "Nebraska", lat: 41.2565, lon: -95.9345, lived: "Lived here for a year" },
  { name: "Lincoln", country: "United States", state: "Nebraska", lat: 40.8136, lon: -96.7026, visits: 4, note: "+ everywhere in between Lincoln and Omaha" },
  { name: "Nebraska City", country: "United States", state: "Nebraska", lat: 40.675, lon: -95.8608, visits: 1 },
  { name: "Des Moines", country: "United States", state: "Iowa", lat: 41.5868, lon: -93.625, visits: 1 },
  { name: "Portland", country: "United States", state: "Oregon", lat: 45.5152, lon: -122.6784, visits: 1 },
  { name: "DC Area", country: "United States", lat: 38.9072, lon: -77.0369, visits: 2, note: "Including Alexandria and Arlington, Virginia" },
  { name: "Miami", country: "United States", state: "Florida", lat: 25.7617, lon: -80.1918, visits: 1 },
  { name: "Florida Keys", country: "United States", state: "Florida", lat: 24.5551, lon: -81.78, visits: 1 },
  { name: "Kansas City", country: "United States", state: "Missouri", lat: 39.0997, lon: -94.5786, visits: 2 },
  { name: "Topeka", country: "United States", state: "Kansas", lat: 39.0473, lon: -95.6752, visits: 1 },
  { name: "Wichita", country: "United States", state: "Kansas", lat: 37.6872, lon: -97.3301, visits: 1 },
  { name: "Tulsa", country: "United States", state: "Oklahoma", lat: 36.154, lon: -95.9928, visits: 1 },
  { name: "Oklahoma City", country: "United States", state: "Oklahoma", lat: 35.4676, lon: -97.5164, visits: 1 },
  { name: "Dallas–Fort Worth", country: "United States", state: "Texas", lat: 32.7767, lon: -96.797, visits: 1 },
  { name: "Las Vegas", country: "United States", state: "Nevada", lat: 36.1699, lon: -115.1398, visits: 1, note: "+ everything in between to San Francisco" },
  { name: "San Francisco Bay Area", country: "United States", state: "California", lat: 37.7749, lon: -122.4194, visits: 2 },
  { name: "Eureka", country: "United States", state: "California", lat: 40.8021, lon: -124.1637, visits: 1, note: "+ everything in between from San Francisco" },
  { name: "Honolulu", country: "United States", state: "Hawaii", lat: 21.3069, lon: -157.8583, visits: 1, note: "Oʻahu" },
]
