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
 mutation updateVillageDemographic($name: String!, $village: VillageInput!) {
    updateVillageDemographic(name: $name, village: $village) {
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

export const SIGNUP_MUTATION = gql`
  mutation Signup($fullName: String!, $username: String!, $password: String!) {
    signup(fullName: $fullName, username: $username, password: $password) {
      fullName
      username
      role
    }
  }
`;


export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        fullName
        username
        role
      }
    }
  }
`;

export const GET_MAP_VILLAGES = gql`
  query GetMapVillages {
    mapVillages {
      name
      latitude
      longitude
    }
  }
`;

export const GET_IMAGES = gql`
  query GetImages {
    images {
      url
      id
      description
    }
  }
`;


export const ADD_IMAGE = gql`
  mutation AddImage($url: String!, $description: String!) {
    addImage(url: $url, description: $description) {
      id
      url
      description
    }
  }
`;
