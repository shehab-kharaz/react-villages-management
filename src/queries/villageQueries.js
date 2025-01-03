import { gql } from "@apollo/client";

export const GET_STATISTICS = gql`
  query GetStatistics {
    statistics {
      totalVillages
      totalUrbanAreas
      totalPopulation
      averageLandAreaInSqKm
      ageDistribution {
        age_0_18
        age_19_35
        age_36_50
        age_51_65
        age_65_plus
      }
      genderRatio {
        male
        female
      }
      populationDistribution {
        name
        population
      }
    }
  }
`;

export const GET_VILLAGES = gql`
  query GetVillages {
    villages {
      name
      region
      landArea
      latitude
      longitude
      image
      categories
      demographic {
        populationSize
        ageDistribution {
          age_0_18
          age_19_35
          age_36_50
          age_51_65
          age_65_plus
        }
        genderRatio {
          male
          female
        }
        populationGrowthRate
      }
    }
  }
`;

export const ADD_VILLAGE = gql`
  mutation AddVillage($village: VillageInput!) {
    addVillage(village: $village) {
      name
      region
      landArea
      latitude
      longitude
      image
      categories
      demographic {
        populationSize
        ageDistribution {
          age_0_18
          age_19_35
          age_36_50
          age_51_65
          age_65_plus
        }
        genderRatio {
          male
          female
        }
        populationGrowthRate
      }
    }
  }
`;


export const GET_VILLAGE = gql`
  query GetVillage($name: String!) {
    village(name: $name) {
      name
      region
      landArea
      latitude
      longitude
      image
      categories
      demographic {
        populationSize
        ageDistribution {
          age_0_18
          age_19_35
          age_36_50
          age_51_65
          age_65_plus
        }
        genderRatio {
          male
          female
        }
        populationGrowthRate
      }
    }
  }
`;

export const UPDATE_VILLAGE = gql`
  mutation UpdateVillage($name: String!, $village: VillageInput!) {
    updateVillage(name: $name, village: $village) {
      name
      region
      landArea
      latitude
      longitude
      image
      categories
      demographic {
        populationSize
        ageDistribution {
          age_0_18
          age_19_35
          age_36_50
          age_51_65
          age_65_plus
        }
        genderRatio {
          male
          female
        }
        populationGrowthRate
      }
    }
  }
`;

export const DELETE_VILLAGE = gql`
  mutation DeleteVillage($name: String!) {
    deleteVillage(name: $name) {
      name
    }
  }
`;

export const UPDATE_DEMOGRAPHIC = gql`
  mutation UpdateVillage($name: String!, $village: VillageInput!) {
    updateVillage(name: $name, village: $village) {
      name
      demographic {
        populationSize
        ageDistribution {
          age_0_18
          age_19_35
          age_36_50
          age_51_65
          age_65_plus
        }
        genderRatio {
          male
          female
        }
        populationGrowthRate
      }
    }
  }
`;
