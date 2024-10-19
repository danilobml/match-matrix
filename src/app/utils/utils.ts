import type { RaSmorgasboardData } from "../types/smorgasboard.types";
import { RASmorgasboardOptions } from "./constants";

interface RAFormValues {
    physicalIntimacy?: {
      'No touch'?: number | null;
      'Platonic touch'?: number | null;
      'Erotic touch'?: number | null;
      'Safer sex'?: number | null;
      'Shared fluids'?: number | null;
    };
    kink?: {
      BDSM?: number | null;
      'Power exchange'?: number | null;
      Roleplaying?: number | null;
      Taboo?: number | null;
    };
    emotionalIntimacy?: {
      Venting?: number | null;
      Support?: number | null;
      'Attend to love languages'?: number | null;
    };
    communicationFrequency?: {
      'Most days'?: number | null;
      'A few times per week'?: number | null;
      'Most weeks'?: number | null;
      '1-2 times per month'?: number | null;
      'Most months'?: number | null;
    };
    communicationResponse?: {
      'Always immediate'?: number | null;
      'Priority response'?: number | null;
      'Considerate response'?: number | null;
      Asynchronous?: number | null;
    };
    togetherFrequency?: {
      'Most days'?: number | null;
      'A few times per week'?: number | null;
      'Most weeks'?: number | null;
      '1-2 times per month'?: number | null;
      'Most months'?: number | null;
    };
    togetherQuality?: {
      Adjacent?: number | null;
      Collaborative?: number | null;
      'Focused on one another'?: number | null;
    };
    domestic?: {
      'Chores and duties'?: number | null;
      'Cooking together'?: number | null;
      Housemates?: number | null;
      Roommates?: number | null;
    };
    relationshipPublicity?: {
      Secret?: number | null;
      Family?: number | null;
      Community?: number | null;
      Work?: number | null;
      'Social media'?: number | null;
    };
    labels?: {
      Friends?: number | null;
      Lovers?: number | null;
      Partners?: number | null;
      'Chosen family'?: number | null;
    };
    lifePartners?: {
      'Long term goals'?: number | null;
      'Political alignment'?: number | null;
      'Embracing change'?: number | null;
      'Emergency contacts'?: number | null;
    };
    structure?: {
      'Open & non-hierarchical'?: number | null;
      'Open & hierarchical'?: number | null;
      'Closed/exclusive'?: number | null;
    };
    caregiving?: {
      Plants?: number | null;
      Pets?: number | null;
      Children?: number | null;
      'Adults needing care'?: number | null;
    };
    finances?: {
      Support?: number | null;
      'Shared expenses'?: number | null;
      'Shared possessions'?: number | null;
      'Shared accounts'?: number | null;
      'Shared property'?: number | null;
      'Inheritor/beneficiary'?: number | null;
    };
    legal?: {
      Marriage?: number | null;
      Adoption?: number | null;
      'Power of attorney'?: number | null;
      'Corporate/professional'?: number | null;
    };
    relationshipWithName?: string;
    relationshipWithId?: string | null;
  }
  

  export const getCleanData = (values: RAFormValues) => {
    return {
        physicalIntimacyNoTouch: values.physicalIntimacy?.['No touch'] || null,
        physicalIntimacyPlatonicTouch: values.physicalIntimacy?.['Platonic touch'] || null,
        physicalIntimacyEroticTouch: values.physicalIntimacy?.['Erotic touch'] || null,
        physicalIntimacySaferSex: values.physicalIntimacy?.['Safer sex'] || null,
        physicalIntimacySharedFluids: values.physicalIntimacy?.['Shared fluids'] || null,
        kinkBdsm: values.kink?.BDSM || null,
        kinkPowerExchange: values.kink?.['Power exchange'] || null,
        kinkRoleplaying: values.kink?.Roleplaying || null,
        kinkTaboo: values.kink?.Taboo || null,
        emotionalIntimacyVenting: values.emotionalIntimacy?.Venting || null,
        emotionalIntimacySupport: values.emotionalIntimacy?.Support || null,
        emotionalIntimacyLoveLanguages: values.emotionalIntimacy?.['Attend to love languages'] || null,
        communicationFrequencyMostDays: values.communicationFrequency?.['Most days'] || null,
        communicationFrequencyFewTimesPerWeek: values.communicationFrequency?.['A few times per week'] || null,
        communicationFrequencyMostWeeks: values.communicationFrequency?.['Most weeks'] || null,
        communicationFrequencyOnceTwicePerMonth: values.communicationFrequency?.['1-2 times per month'] || null,
        communicationFrequencyMostMonths: values.communicationFrequency?.['Most months'] || null,
        communicationResponseImmediate: values.communicationResponse?.['Always immediate'] || null,
        communicationResponsePriority: values.communicationResponse?.['Priority response'] || null,
        communicationResponseConsiderate: values.communicationResponse?.['Considerate response'] || null,
        communicationResponseAsynchronous: values.communicationResponse?.Asynchronous || null,
        togetherFrequencyMostDays: values.togetherFrequency?.['Most days'] || null,
        togetherFrequencyFewTimesPerWeek: values.togetherFrequency?.['A few times per week'] || null,
        togetherFrequencyMostWeeks: values.togetherFrequency?.['Most weeks'] || null,
        togetherFrequencyOnceTwicePerMonth: values.togetherFrequency?.['1-2 times per month'] || null,
        togetherFrequencyMostMonths: values.togetherFrequency?.['Most months'] || null,
        togetherQualityAdjacent: values.togetherQuality?.Adjacent || null,
        togetherQualityCollaborative: values.togetherQuality?.Collaborative || null,
        togetherQualityFocused: values.togetherQuality?.['Focused on one another'] || null,
        domesticChores: values.domestic?.['Chores and duties'] || null,
        domesticCooking: values.domestic?.['Cooking together'] || null,
        domesticHousemates: values.domestic?.Housemates || null,
        domesticRoommates: values.domestic?.Roommates || null,
        relationshipPublicitySecret: values.relationshipPublicity?.Secret || null,
        relationshipPublicityFamily: values.relationshipPublicity?.Family || null,
        relationshipPublicityCommunity: values.relationshipPublicity?.Community || null,
        relationshipPublicityWork: values.relationshipPublicity?.Work || null,
        relationshipPublicitySocialMedia: values.relationshipPublicity?.['Social media'] || null,
        labelsFriends: values.labels?.Friends || null,
        labelsLovers: values.labels?.Lovers || null,
        labelsPartners: values.labels?.Partners || null,
        labelsChosenFamily: values.labels?.['Chosen family'] || null,
        lifePartnersLongTermGoals: values.lifePartners?.['Long term goals'] || null,
        lifePartnersPoliticalAlignment: values.lifePartners?.['Political alignment'] || null,
        lifePartnersEmbracingChange: values.lifePartners?.['Embracing change'] || null,
        lifePartnersEmergencyContacts: values.lifePartners?.['Emergency contacts'] || null,
        structureOpenNonHierarchical: values.structure?.['Open & non-hierarchical'] || null,
        structureOpenHierarchical: values.structure?.['Open & hierarchical'] || null,
        structureClosedExclusive: values.structure?.['Closed/exclusive'] || null,
        caregivingPlants: values.caregiving?.Plants || null,
        caregivingPets: values.caregiving?.Pets || null,
        caregivingChildren: values.caregiving?.Children || null,
        caregivingAdults: values.caregiving?.['Adults needing care'] || null,
        financesSupport: values.finances?.Support || null,
        financesSharedExpenses: values.finances?.['Shared expenses'] || null,
        financesSharedPossessions: values.finances?.['Shared possessions'] || null,
        financesSharedAccounts: values.finances?.['Shared accounts'] || null,
        financesSharedProperty: values.finances?.['Shared property'] || null,
        financesInheritorBeneficiary: values.finances?.['Inheritor/beneficiary'] || null,
        legalMarriage: values.legal?.Marriage || null,
        legalAdoption: values.legal?.Adoption || null,
        legalPowerOfAttorney: values.legal?.['Power of attorney'] || null,
        legalCorporateProfessional: values.legal?.['Corporate/professional'] || null,
    };
};

interface MappedData {
  x: string;
  y: string;
  value: number;
}

type SectionMapping = {
  [K in keyof typeof RASmorgasboardOptions]: (number | null)[];
};

export const getTransformedSmorgasboardData = (data: RaSmorgasboardData) => {
const mappedData: MappedData[] = [];

const sectionMapping: SectionMapping = {
  physicalIntimacy: [
    data.physicalIntimacyNoTouch, 
    data.physicalIntimacyPlatonicTouch, 
    data.physicalIntimacyEroticTouch, 
    data.physicalIntimacySaferSex, 
    data.physicalIntimacySharedFluids
  ],
  kink: [data.kinkBdsm, data.kinkPowerExchange, data.kinkRoleplaying, data.kinkTaboo],
  emotionalIntimacy: [data.emotionalIntimacyVenting, data.emotionalIntimacySupport, data.emotionalIntimacyLoveLanguages],
  communicationFrequency: [
    data.communicationFrequencyMostDays, 
    data.communicationFrequencyFewTimesPerWeek, 
    data.communicationFrequencyMostWeeks, 
    data.communicationFrequencyOnceTwicePerMonth, 
    data.communicationFrequencyMostMonths
  ],
  communicationResponse: [
    data.communicationResponseImmediate, 
    data.communicationResponsePriority, 
    data.communicationResponseConsiderate, 
    data.communicationResponseAsynchronous
  ],
  togetherFrequency: [
    data.togetherFrequencyMostDays, 
    data.togetherFrequencyFewTimesPerWeek, 
    data.togetherFrequencyMostWeeks, 
    data.togetherFrequencyOnceTwicePerMonth, 
    data.togetherFrequencyMostMonths
  ],
  togetherQuality: [
    data.togetherQualityAdjacent, 
    data.togetherQualityCollaborative, 
    data.togetherQualityFocused
  ],
  domestic: [data.domesticChores, data.domesticCooking, data.domesticHousemates, data.domesticRoommates],
  relationshipPublicity: [
    data.relationshipPublicitySecret, 
    data.relationshipPublicityFamily, 
    data.relationshipPublicityCommunity, 
    data.relationshipPublicityWork, 
    data.relationshipPublicitySocialMedia
  ],
  labels: [data.labelsFriends, data.labelsLovers, data.labelsPartners, data.labelsChosenFamily],
  lifePartners: [
    data.lifePartnersLongTermGoals, 
    data.lifePartnersPoliticalAlignment, 
    data.lifePartnersEmbracingChange, 
    data.lifePartnersEmergencyContacts
  ],
  structure: [
    data.structureOpenNonHierarchical, 
    data.structureOpenHierarchical, 
    data.structureClosedExclusive
  ],
  caregiving: [
    data.caregivingPlants, 
    data.caregivingPets, 
    data.caregivingChildren, 
    data.caregivingAdults
  ],
  finances: [
    data.financesSupport, 
    data.financesSharedExpenses, 
    data.financesSharedPossessions, 
    data.financesSharedAccounts, 
    data.financesSharedProperty, 
    data.financesInheritorBeneficiary
  ],
  legal: [
    data.legalMarriage, 
    data.legalAdoption, 
    data.legalPowerOfAttorney, 
    data.legalCorporateProfessional
  ]
};

Object.entries(RASmorgasboardOptions).forEach(([section, items]) => {
  items.forEach((item, index) => {
    const value = sectionMapping[section as keyof SectionMapping][index];
    if (value !== null && value !== undefined) {
      mappedData.push({ x: section, y: item, value });
    }
  });
});

return mappedData;
};

export const getTransformedSavedToRAFormValues = (data: RaSmorgasboardData): RAFormValues => {
  return {
    physicalIntimacy: {
      'No touch': data.physicalIntimacyNoTouch,
      'Platonic touch': data.physicalIntimacyPlatonicTouch,
      'Erotic touch': data.physicalIntimacyEroticTouch,
      'Safer sex': data.physicalIntimacySaferSex,
      'Shared fluids': data.physicalIntimacySharedFluids,
    },
    kink: {
      BDSM: data.kinkBdsm,
      'Power exchange': data.kinkPowerExchange,
      Roleplaying: data.kinkRoleplaying,
      Taboo: data.kinkTaboo,
    },
    emotionalIntimacy: {
      Venting: data.emotionalIntimacyVenting,
      Support: data.emotionalIntimacySupport,
      'Attend to love languages': data.emotionalIntimacyLoveLanguages,
    },
    communicationFrequency: {
      'Most days': data.communicationFrequencyMostDays,
      'A few times per week': data.communicationFrequencyFewTimesPerWeek,
      'Most weeks': data.communicationFrequencyMostWeeks,
      '1-2 times per month': data.communicationFrequencyOnceTwicePerMonth,
      'Most months': data.communicationFrequencyMostMonths,
    },
    communicationResponse: {
      'Always immediate': data.communicationResponseImmediate,
      'Priority response': data.communicationResponsePriority,
      'Considerate response': data.communicationResponseConsiderate,
      Asynchronous: data.communicationResponseAsynchronous,
    },
    togetherFrequency: {
      'Most days': data.togetherFrequencyMostDays,
      'A few times per week': data.togetherFrequencyFewTimesPerWeek,
      'Most weeks': data.togetherFrequencyMostWeeks,
      '1-2 times per month': data.togetherFrequencyOnceTwicePerMonth,
      'Most months': data.togetherFrequencyMostMonths,
    },
    togetherQuality: {
      Adjacent: data.togetherQualityAdjacent,
      Collaborative: data.togetherQualityCollaborative,
      'Focused on one another': data.togetherQualityFocused,
    },
    domestic: {
      'Chores and duties': data.domesticChores,
      'Cooking together': data.domesticCooking,
      Housemates: data.domesticHousemates,
      Roommates: data.domesticRoommates,
    },
    relationshipPublicity: {
      Secret: data.relationshipPublicitySecret,
      Family: data.relationshipPublicityFamily,
      Community: data.relationshipPublicityCommunity,
      Work: data.relationshipPublicityWork,
      'Social media': data.relationshipPublicitySocialMedia,
    },
    labels: {
      Friends: data.labelsFriends,
      Lovers: data.labelsLovers,
      Partners: data.labelsPartners,
      'Chosen family': data.labelsChosenFamily,
    },
    lifePartners: {
      'Long term goals': data.lifePartnersLongTermGoals,
      'Political alignment': data.lifePartnersPoliticalAlignment,
      'Embracing change': data.lifePartnersEmbracingChange,
      'Emergency contacts': data.lifePartnersEmergencyContacts,
    },
    structure: {
      'Open & non-hierarchical': data.structureOpenNonHierarchical,
      'Open & hierarchical': data.structureOpenHierarchical,
      'Closed/exclusive': data.structureClosedExclusive,
    },
    caregiving: {
      Plants: data.caregivingPlants,
      Pets: data.caregivingPets,
      Children: data.caregivingChildren,
      'Adults needing care': data.caregivingAdults,
    },
    finances: {
      Support: data.financesSupport,
      'Shared expenses': data.financesSharedExpenses,
      'Shared possessions': data.financesSharedPossessions,
      'Shared accounts': data.financesSharedAccounts,
      'Shared property': data.financesSharedProperty,
      'Inheritor/beneficiary': data.financesInheritorBeneficiary,
    },
    legal: {
      Marriage: data.legalMarriage,
      Adoption: data.legalAdoption,
      'Power of attorney': data.legalPowerOfAttorney,
      'Corporate/professional': data.legalCorporateProfessional,
    },
    relationshipWithName: data.relationshipWithName,
    relationshipWithId: data.relationshipWithId ? String(data.relationshipWithId) : null,
  };
};

