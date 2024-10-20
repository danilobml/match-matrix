import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');
    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    try {
        const smorgasboard = await prisma.raSmorgasboard.findUnique({
            where: { userId: Number(userId) },
            include: {
                Share: true,
            },
        });

        if (!smorgasboard) {
            return NextResponse.json({ error: 'Smorgasboard Data not found' }, { status: 404 });
        }

        return NextResponse.json({ data: smorgasboard }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {

    const body = await req.json();
    const { userId, data, relationshipWithName, relationshipWithId } = body;

    if (!userId || !relationshipWithName) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const dataToSave = {
            relationshipWithName: relationshipWithName || "Everyone",
            relationshipWithId: Number(relationshipWithId) || null,
            physicalIntimacyNoTouch: data.physicalIntimacyNoTouch || null,
            physicalIntimacyPlatonicTouch: data.physicalIntimacyPlatonicTouch || null,
            physicalIntimacyEroticTouch: data.physicalIntimacyEroticTouch || null,
            physicalIntimacySaferSex: data.physicalIntimacySaferSex || null,
            physicalIntimacySharedFluids: data.physicalIntimacySharedFluids || null,
            kinkBdsm: data.kinkBdsm || null,
            kinkPowerExchange: data.kinkPowerExchange || null,
            kinkRoleplaying: data.kinkRoleplaying || null,
            kinkTaboo: data.kinkTaboo || null,
            emotionalIntimacyVenting: data.emotionalIntimacyVenting || null,
            emotionalIntimacySupport: data.emotionalIntimacySupport || null,
            emotionalIntimacyLoveLanguages: data.emotionalIntimacyLoveLanguages || null,
            communicationFrequencyMostDays: data.communicationFrequencyMostDays || null,
            communicationFrequencyFewTimesPerWeek: data.communicationFrequencyFewTimesPerWeek || null,
            communicationFrequencyMostWeeks: data.communicationFrequencyMostWeeks || null,
            communicationFrequencyOnceTwicePerMonth: data.communicationFrequencyOnceTwicePerMonth || null,
            communicationFrequencyMostMonths: data.communicationFrequencyMostMonths || null,
            communicationResponseImmediate: data.communicationResponseImmediate || null,
            communicationResponsePriority: data.communicationResponsePriority || null,
            communicationResponseConsiderate: data.communicationResponseConsiderate || null,
            communicationResponseAsynchronous: data.communicationResponseAsynchronous || null,
            togetherFrequencyMostDays: data.togetherFrequencyMostDays || null,
            togetherFrequencyFewTimesPerWeek: data.togetherFrequencyFewTimesPerWeek || null,
            togetherFrequencyMostWeeks: data.togetherFrequencyMostWeeks || null,
            togetherFrequencyOnceTwicePerMonth: data.togetherFrequencyOnceTwicePerMonth || null,
            togetherFrequencyMostMonths: data.togetherFrequencyMostMonths || null,
            togetherQualityAdjacent: data.togetherQualityAdjacent || null,
            togetherQualityCollaborative: data.togetherQualityCollaborative || null,
            togetherQualityFocused: data.togetherQualityFocused || null,
            domesticChores: data.domesticChores || null,
            domesticCooking: data.domesticCooking || null,
            domesticHousemates: data.domesticHousemates || null,
            domesticRoommates: data.domesticRoommates || null,
            relationshipPublicitySecret: data.relationshipPublicitySecret || null,
            relationshipPublicityFamily: data.relationshipPublicityFamily || null,
            relationshipPublicityCommunity: data.relationshipPublicityCommunity || null,
            relationshipPublicityWork: data.relationshipPublicityWork || null,
            relationshipPublicitySocialMedia: data.relationshipPublicitySocialMedia || null,
            labelsFriends: data.labelsFriends || null,
            labelsLovers: data.labelsLovers || null,
            labelsPartners: data.labelsPartners || null,
            labelsChosenFamily: data.labelsChosenFamily || null,
            lifePartnersLongTermGoals: data.lifePartnersLongTermGoals || null,
            lifePartnersPoliticalAlignment: data.lifePartnersPoliticalAlignment || null,
            lifePartnersEmbracingChange: data.lifePartnersEmbracingChange || null,
            lifePartnersEmergencyContacts: data.lifePartnersEmergencyContacts || null,
            structureOpenNonHierarchical: data.structureOpenNonHierarchical || null,
            structureOpenHierarchical: data.structureOpenHierarchical || null,
            structureClosedExclusive: data.structureClosedExclusive || null,
            caregivingPlants: data.caregivingPlants || null,
            caregivingPets: data.caregivingPets || null,
            caregivingChildren: data.caregivingChildren || null,
            caregivingAdults: data.caregivingAdults || null,
            financesSupport: data.financesSupport || null,
            financesSharedExpenses: data.financesSharedExpenses || null,
            financesSharedPossessions: data.financesSharedPossessions || null,
            financesSharedAccounts: data.financesSharedAccounts || null,
            financesSharedProperty: data.financesSharedProperty || null,
            financesInheritorBeneficiary: data.financesInheritorBeneficiary || null,
            legalMarriage: data.legalMarriage || null,
            legalAdoption: data.legalAdoption || null,
            legalPowerOfAttorney: data.legalPowerOfAttorney || null,
            legalCorporateProfessional: data.legalCorporateProfessional || null,
        };

        const raSmorgasboard = await prisma.raSmorgasboard.upsert({
            where: {
                userId: Number(userId),
            },
            create: {
                userId: Number(userId),
                ...dataToSave
            },
            update: {
                ...dataToSave
            }

        });

        return NextResponse.json({ message: 'Preferences saved successfully', raSmorgasboardId: raSmorgasboard.id }, { status: 200 });
    } catch (error: unknown) {
        console.error('Prisma error:', JSON.stringify(error, null, 2));
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }
}
