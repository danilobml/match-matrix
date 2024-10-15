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
