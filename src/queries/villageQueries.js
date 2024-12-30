import { gql } from "@apollo/client";

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
