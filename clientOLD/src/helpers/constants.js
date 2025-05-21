export const Conditions = {
    Powder: 'Powder',
    Soft: 'Soft',
    Hard: 'Hard',
    Variable: 'Variable',
    Groomed: 'Groomed',
    Moguls: 'Moguls',
    Closed: 'Closed',
};

export const drawerWidth = 200;

export const EquipmentTypes = {
    Toboggan: 'Toboggan',
    AED: 'AED',
    TraumaPack: 'Trauma Pack',
    TailRope: 'Tail Rope',
    VacuumMattress: 'Vacuum Mattress',
    VacuumSplintSmall: 'Vacuum Splint (Small)',
    VacuumSplintMedium: 'Vacuum Splint (Medium)',
    VacuumSplintLarge: 'Vacuum Splint (Large)',
    Backboard: 'Backboard',
    Scoop: 'Scoop',
    Hare: 'Hare',
    PelvicBinder: 'Pelvic Binder',
    SledPack: 'Sled Pack',
    Chair: 'Chair',
    RollCabKit: 'Roll Cab Kit',
    TSeat: 'T-Seat',
    Helmet: 'Helmet',
    Harness: 'Harness',
    Rope: 'Rope',
    ExtraGear: 'Extra Gear',
    OxygenKit: 'Oxygen Kit',
    Other: 'Other',
};

export const locationTypes = ['Trail', 'First Aid Room', 'Lodge', 'Lift', 'Hut', 'Other'];

export const getLocations = (trails, aidRooms, lodges, lifts, huts, others) => ({
    Trail: trails,
    'First Aid Room': aidRooms,
    Lodge: lodges,
    Lift: lifts,
    Hut: huts,
    Other: others,
});