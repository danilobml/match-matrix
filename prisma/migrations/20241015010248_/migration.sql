-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hasRaSmorgasboard" BOOLEAN NOT NULL DEFAULT false,
    "connectedUserId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaSmorgasboard" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "physicalIntimacyNoTouch" INTEGER,
    "physicalIntimacyPlatonicTouch" INTEGER,
    "physicalIntimacyEroticTouch" INTEGER,
    "physicalIntimacySaferSex" INTEGER,
    "physicalIntimacySharedFluids" INTEGER,
    "kinkBdsm" INTEGER,
    "kinkPowerExchange" INTEGER,
    "kinkRoleplaying" INTEGER,
    "kinkTaboo" INTEGER,
    "emotionalIntimacyVenting" INTEGER,
    "emotionalIntimacySupport" INTEGER,
    "emotionalIntimacyLoveLanguages" INTEGER,
    "communicationFrequencyMostDays" INTEGER,
    "communicationFrequencyFewTimesPerWeek" INTEGER,
    "communicationFrequencyMostWeeks" INTEGER,
    "communicationFrequencyOnceTwicePerMonth" INTEGER,
    "communicationFrequencyMostMonths" INTEGER,
    "communicationResponseImmediate" INTEGER,
    "communicationResponsePriority" INTEGER,
    "communicationResponseConsiderate" INTEGER,
    "communicationResponseAsynchronous" INTEGER,
    "togetherFrequencyMostDays" INTEGER,
    "togetherFrequencyFewTimesPerWeek" INTEGER,
    "togetherFrequencyMostWeeks" INTEGER,
    "togetherFrequencyOnceTwicePerMonth" INTEGER,
    "togetherFrequencyMostMonths" INTEGER,
    "togetherQualityAdjacent" INTEGER,
    "togetherQualityCollaborative" INTEGER,
    "togetherQualityFocused" INTEGER,
    "domesticChores" INTEGER,
    "domesticCooking" INTEGER,
    "domesticHousemates" INTEGER,
    "domesticRoommates" INTEGER,
    "relationshipPublicitySecret" INTEGER,
    "relationshipPublicityFamily" INTEGER,
    "relationshipPublicityCommunity" INTEGER,
    "relationshipPublicityWork" INTEGER,
    "relationshipPublicitySocialMedia" INTEGER,
    "labelsFriends" INTEGER,
    "labelsLovers" INTEGER,
    "labelsPartners" INTEGER,
    "labelsChosenFamily" INTEGER,
    "lifePartnersLongTermGoals" INTEGER,
    "lifePartnersPoliticalAlignment" INTEGER,
    "lifePartnersEmbracingChange" INTEGER,
    "lifePartnersEmergencyContacts" INTEGER,
    "structureOpenNonHierarchical" INTEGER,
    "structureOpenHierarchical" INTEGER,
    "structureClosedExclusive" INTEGER,
    "caregivingPlants" INTEGER,
    "caregivingPets" INTEGER,
    "caregivingChildren" INTEGER,
    "caregivingAdults" INTEGER,
    "financesSupport" INTEGER,
    "financesSharedExpenses" INTEGER,
    "financesSharedPossessions" INTEGER,
    "financesSharedAccounts" INTEGER,
    "financesSharedProperty" INTEGER,
    "financesInheritorBeneficiary" INTEGER,
    "legalMarriage" INTEGER,
    "legalAdoption" INTEGER,
    "legalPowerOfAttorney" INTEGER,
    "legalCorporateProfessional" INTEGER,

    CONSTRAINT "RaSmorgasboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_connectedUserId_key" ON "User"("connectedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "RaSmorgasboard_userId_key" ON "RaSmorgasboard"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_connectedUserId_fkey" FOREIGN KEY ("connectedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaSmorgasboard" ADD CONSTRAINT "RaSmorgasboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
