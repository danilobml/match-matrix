export interface RAFormValues {
    [key: string]: { [key: string]: number };
}

export interface TransformedData {
    x: string;
    y: string;
    value: number;
}

export type RaSmorgasboardData = {
    relationshipWithName: string;
    relationshipWithId: number | null;
    physicalIntimacyNoTouch: number | null;
    physicalIntimacyPlatonicTouch: number | null;
    physicalIntimacyEroticTouch: number | null;
    physicalIntimacySaferSex: number | null;
    physicalIntimacySharedFluids: number | null;
    kinkBdsm: number | null;
    kinkPowerExchange: number | null;
    kinkRoleplaying: number | null;
    kinkTaboo: number | null;
    emotionalIntimacyVenting: number | null;
    emotionalIntimacySupport: number | null;
    emotionalIntimacyLoveLanguages: number | null;
    communicationFrequencyMostDays: number | null;
    communicationFrequencyFewTimesPerWeek: number | null;
    communicationFrequencyMostWeeks: number | null;
    communicationFrequencyOnceTwicePerMonth: number | null;
    communicationFrequencyMostMonths: number | null;
    communicationResponseImmediate: number | null;
    communicationResponsePriority: number | null;
    communicationResponseConsiderate: number | null;
    communicationResponseAsynchronous: number | null;
    togetherFrequencyMostDays: number | null;
    togetherFrequencyFewTimesPerWeek: number | null;
    togetherFrequencyMostWeeks: number | null;
    togetherFrequencyOnceTwicePerMonth: number | null;
    togetherFrequencyMostMonths: number | null;
    togetherQualityAdjacent: number | null;
    togetherQualityCollaborative: number | null;
    togetherQualityFocused: number | null;
    domesticChores: number | null;
    domesticCooking: number | null;
    domesticHousemates: number | null;
    domesticRoommates: number | null;
    relationshipPublicitySecret: number | null;
    relationshipPublicityFamily: number | null;
    relationshipPublicityCommunity: number | null;
    relationshipPublicityWork: number | null;
    relationshipPublicitySocialMedia: number | null;
    labelsFriends: number | null;
    labelsLovers: number | null;
    labelsPartners: number | null;
    labelsChosenFamily: number | null;
    lifePartnersLongTermGoals: number | null;
    lifePartnersPoliticalAlignment: number | null;
    lifePartnersEmbracingChange: number | null;
    lifePartnersEmergencyContacts: number | null;
    structureOpenNonHierarchical: number | null;
    structureOpenHierarchical: number | null;
    structureClosedExclusive: number | null;
    caregivingPlants: number | null;
    caregivingPets: number | null;
    caregivingChildren: number | null;
    caregivingAdults: number | null;
    financesSupport: number | null;
    financesSharedExpenses: number | null;
    financesSharedPossessions: number | null;
    financesSharedAccounts: number | null;
    financesSharedProperty: number | null;
    financesInheritorBeneficiary: number | null;
    legalMarriage: number | null;
    legalAdoption: number | null;
    legalPowerOfAttorney: number | null;
    legalCorporateProfessional: number | null;
  };
  