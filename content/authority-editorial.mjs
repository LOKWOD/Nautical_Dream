const sourceCatalog = {
  uscg: ["U.S. Coast Guard Boating Safety", "https://www.uscgboating.org/"],
  charts: ["NOAA Nautical Charts", "https://nauticalcharts.noaa.gov/"],
  weather: ["National Weather Service Marine Forecasts", "https://www.weather.gov/marine/"],
  tides: ["NOAA Tides and Currents", "https://tidesandcurrents.noaa.gov/"],
  fcc: ["FCC Ship Radio Stations", "https://www.fcc.gov/wireless/bureau-divisions/mobility-division/ship-radio-stations"],
  recalls: ["U.S. Coast Guard Boating Safety Recalls", "https://uscgboating.org/content/recalls.php"],
  lakeGeorge: ["Lake George Park Commission", "https://lgpc.ny.gov/"],
  nysParks: ["New York State Parks Boating", "https://parks.ny.gov/boating/"],
};

const kindProfiles = {
  destination: {
    context: "A destination guide is useful only when it connects the chart to the day: launch access, exposure, refuge, crew comfort, shore options and the point at which the original itinerary should change.",
    constraints: ["current access and operating rules", "weather exposure and usable shelter", "fuel, daylight and return distance", "crew tolerance and a shorter alternate route"],
    proof: "A sound destination plan still works when one dock is full, one stop is closed or the afternoon forecast arrives early.",
    sources: [sourceCatalog.charts, sourceCatalog.weather, sourceCatalog.uscg],
  },
  gear: {
    context: "Marine equipment earns its place by solving a defined job on the actual boat. Compatibility, installation, power demand, visibility, service access and crew training matter more than a long feature list.",
    constraints: ["the job the equipment must perform", "electrical and physical compatibility", "installation and service access", "failure behavior and a usable backup"],
    proof: "A good equipment choice is easy to operate underway, supported by the rest of the system and still serviceable after the novelty wears off.",
    sources: [sourceCatalog.uscg, sourceCatalog.recalls],
  },
  ownership: {
    context: "Boat ownership works best as a managed system of money, time, records and preventive decisions. Purchase price is only the entry point; storage, service, insurance, fuel and lost weekends determine the real experience.",
    constraints: ["annual fixed and variable costs", "service and storage capacity", "records, deadlines and seasonal work", "the owner's realistic time and skill"],
    proof: "A sustainable ownership plan protects both the boating calendar and the household budget without depending on perfect weather or zero repairs.",
    sources: [sourceCatalog.uscg, sourceCatalog.recalls],
  },
  maintenance: {
    context: "Marine maintenance is condition control, not a collection of chores. The useful questions are what is deteriorating, how early it can be detected, what evidence should be recorded and when the work belongs with a qualified technician.",
    constraints: ["manufacturer intervals and procedures", "freshwater, saltwater and storage exposure", "access, tools and safe isolation", "records that reveal trends rather than guesses"],
    proof: "The maintenance plan is working when inspections find small changes before they become breakdowns and the next service decision is supported by records.",
    sources: [sourceCatalog.uscg, sourceCatalog.recalls],
  },
  seamanship: {
    context: "Seamanship is workload management. The operator reads the developing situation, slows the sequence down, gives the crew simple jobs and keeps an exit available before wind, traffic or equipment trouble removes it.",
    constraints: ["boat handling at the lowest controllable speed", "wind, current, traffic and visibility", "crew communication and reachable equipment", "a clear abort point and recovery plan"],
    proof: "A good maneuver or safety plan looks unhurried because the important decisions were made before the boat entered the tightest part of the problem.",
    sources: [sourceCatalog.uscg, sourceCatalog.charts, sourceCatalog.weather],
  },
  family: {
    context: "Family boating succeeds when the day is built around attention spans, temperature, food, rest, safe movement and predictable transitions—not around the maximum range of the boat.",
    constraints: ["properly fitted flotation and supervision", "short legs with clear destinations", "shade, warmth, food and bathroom planning", "simple crew routines children can repeat"],
    proof: "The strongest family plan leaves enough time and energy to end the day calmly, even after a delay, spill, missed nap or sudden weather change.",
    sources: [sourceCatalog.uscg, sourceCatalog.weather],
  },
  "boat-type": {
    context: "A boat type should be judged against its mission, not its showroom appeal. Layout, load, water conditions, storage, maintenance access and low-speed handling shape ownership more than a best-in-class label.",
    constraints: ["primary use and normal passenger load", "local water and weather exposure", "storage, trailering and service", "total ownership cost and resale fit"],
    proof: "The right boat continues to fit after the first season, when the crew knows which spaces, systems and compromises affect every trip.",
    sources: [sourceCatalog.uscg, sourceCatalog.recalls],
  },
};

const hubProfiles = {
  "Lake George": {
    context: "Lake George combines Adirondack mountain weather, island groups, busy summer traffic and shorelines where protected water can give way quickly to a choppy open reach.",
    constraints: ["Lake George Park Commission registration and inspection requirements", "marked hazards, no-wake areas and island traffic", "launch parking and peak-hour congestion", "rapid wind or thunderstorm changes along the lake"],
    practice: "Confirm the current Park Commission requirements before towing, choose the launch and return window together, and identify a protected alternate stop before leaving the dock.",
    sources: [sourceCatalog.lakeGeorge, sourceCatalog.nysParks],
  },
  "Thousand Islands": {
    context: "The Thousand Islands puts recreational routes beside current, international-border procedures, narrow island passages and the St. Lawrence shipping channel.",
    constraints: ["current and commercial traffic near the navigation channel", "U.S. and Canadian reporting requirements when crossing", "rocky shoals and visually confusing island passages", "limited room to improvise near docks and tour traffic"],
    practice: "Prebuild the route on a current chart, keep the border plan separate from the sightseeing plan and brief the crew before entering current or a tight island approach.",
  },
  "Finger Lakes": {
    context: "The Finger Lakes are long, narrow and individually different. Wind aligned with a lake can build an uncomfortable return leg while launch access and transient dock options vary widely from one lake to the next.",
    constraints: ["which lake actually fits the boat and crew", "wind direction across long exposed reaches", "launch, fuel and shore-access availability", "cold water outside the warmest summer period"],
    practice: "Choose the lake before choosing the itinerary, keep the first run short and plan the return around wind direction rather than distance alone.",
  },
  "Great Lakes": {
    context: "The Great Lakes demand open-water thinking: long fetch, cold water, fast-changing visibility and weather, commercial traffic and harbors that may be many miles apart.",
    constraints: ["water temperature and realistic recovery time", "wave period, direction and harbor-entry conditions", "distance between dependable refuge and fuel", "weather changes that outpace a small boat's return"],
    practice: "Treat each exposed leg as a coastal passage, establish conservative limits before departure and never let a reservation erase the option to remain in harbor.",
  },
  "Hudson River": {
    context: "Hudson River boating combines tidal current, commercial traffic, bridge and shoreline effects, floating debris and marina approaches that change character with wind and tide.",
    constraints: ["current direction and timing", "large-vessel traffic and wake", "debris after rain or high flow", "marina approach geometry and fuel range"],
    practice: "Pair the route with current predictions, keep clear of commercial traffic and call unfamiliar marinas early enough to understand the approach before arrival.",
    sources: [sourceCatalog.tides],
  },
  "Intracoastal Waterway": {
    context: "The Intracoastal Waterway is a connected route, not a uniformly maintained canal. Shoaling, bridge timing, tidal current, local traffic and limited stopping choices change the workable mileage each day.",
    constraints: ["current chart and notice information", "controlling depth and recent shoaling reports", "bridge schedules and tidal current", "fuel, reservations and a reachable alternate stop"],
    practice: "Plan by safe stopping options rather than maximum speed, verify the next constrained segment each morning and preserve daylight for an unfamiliar approach.",
    sources: [sourceCatalog.tides],
  },
  "Weekend Trips": {
    context: "A two-day boating trip is an exercise in protecting usable hours. Towing, launching, loading, meals, weather and the return trip consume more of the weekend than the route line suggests.",
    constraints: ["door-to-dock travel time", "a realistic launch and recovery window", "one primary experience rather than too many stops", "a weather-proof family alternative"],
    practice: "Choose one anchor experience, shorten the first and final day, and decide in advance what gets removed when the schedule slips.",
  },
  Marinas: {
    context: "A marina is part parking place, part utility system and part operating environment. Depth, exposure, power, access, security, service capability and contract language can matter more than the view.",
    constraints: ["approach depth and wind exposure", "shore power, water and fire-safety condition", "access hours, parking and security", "contract terms, storm policy and service limits"],
    practice: "Inspect from both land and water when possible, ask how the facility behaves in a strong prevailing wind and put every promised service or fee in writing.",
  },
  "Boat Ramps": {
    context: "Ramp success is determined before the trailer blocks the lane. Grade, water depth, dock position, wind, parking, traffic pattern and tow-vehicle traction all affect whether the launch remains controlled.",
    constraints: ["ramp grade, edge and underwater condition", "dock location relative to wind", "parking and turnaround capacity", "water level and trailer depth"],
    practice: "Stage away from the lane, walk the ramp before backing and agree on a stop signal that either adult can use without debate.",
  },
  "Northeast Cruising": {
    context: "Northeast cruising compresses fog, cold water, strong seasonal traffic, tide, commercial routes and short weather windows into passages that may look modest on a chart.",
    constraints: ["water temperature and visibility", "tide, current and harbor-entry timing", "refuge spacing and reservation pressure", "crew endurance across consecutive days"],
    practice: "Begin with short harbor-to-harbor legs, protect an extra weather day and make each overnight stop optional until the morning forecast is checked.",
    sources: [sourceCatalog.tides],
  },
};

const archetypes = [
  { name: "emergency", match: /(emergency|fire|engine fails|engine failure|taking on water|person overboard|first-aid|first aid|distress)/i, label: "response plan", first: "Stabilize people and the boat before diagnosing the original failure" },
  { name: "maintenance", match: /(maintenance|winterization|commissioning|cleaning|repair|restoration|care|rinse|stabilizer|anode|corrosion|wax|ventilation|bearing)/i, label: "maintenance procedure", first: "Inspect and document the starting condition before cleaning, adjusting or replacing anything" },
  { name: "route", match: /(trip|itinerary|cruis|harbor-hopping|route|navigation|chart|shoaling|current|tide|fog|weekend|camping|marina|launch|ramp)/i, label: "route plan", first: "Identify the controlling condition and the nearest uncomplicated alternate" },
  { name: "procedure", match: /(checklist|how to|procedure|setup|placement|installation|docking|anchoring|fueling|retrieving|trailering|packing|records|logbook)/i, label: "operating sequence", first: "Stage the tools, crew roles and stop points before the high-workload step begins" },
  { name: "buyer", match: /(buying|buy |choose|choosing|which lake|guide$|vs\.|vs |first boat|first yacht)/i, label: "selection decision", first: "Define the non-negotiable job and eliminate incompatible options" },
  { name: "explainer", match: /(explained|basics|understanding|what is|systems|rules|markers|lines|range calculation)/i, label: "working explanation", first: "Connect each term or display to the decision it changes on the boat" },
  { name: "planning", match: /.*/, label: "practical plan", first: "State the desired result, the limiting condition and the safe fallback" },
];

const topicRules = [
  {
    match: /\b(?:trailer|trailers|trailering|tow|towing|hitch|bearings)\b/i,
    focus: "treat the tow vehicle, hitch, trailer, load and road route as one transportation system",
    inspect: ["tow ratings, loaded weight and tongue-weight setup", "coupler, chains, breakaway equipment and jack", "tires, bearings, brakes and suspension", "lights, straps, drain plug and road clearance"],
    actions: ["confirm ratings before loading the boat", "inspect tire condition and pressure cold", "couple, latch and cross the safety chains", "connect breakaway equipment independently", "secure bow, stern and loose equipment", "test lights and brakes", "stop early to recheck hubs and straps", "adjust speed and following distance for the loaded rig"],
    cautions: ["using dry boat weight as total towing weight", "trusting tire appearance without age and pressure", "letting the winch strap serve as the only bow restraint", "continuing after a hot hub, loose strap or braking change"],
  },
  {
    match: /\b(?:launch|launches|launching|ramp|ramps|retrieve|retrieving|retrieval)\b/i,
    focus: "control the trailer lane, boat and crew as three separate moving parts",
    inspect: ["lane grade, surface, edge and water depth", "wind direction relative to the dock", "parking, payment and turnaround pattern", "winch, strap, plug, lights and tow-vehicle traction"],
    actions: ["finish loading and remove transom restraints in the staging area", "walk the ramp and identify the usable edge", "assign one driver and one boat handler", "use a bow line before the boat is free", "move away from the lane before reorganizing gear", "recheck the tie-down and lighting setup before road speed"],
    cautions: ["backing farther because the boat did not float without checking the ramp end", "unhooking the bow before the boat is controlled", "letting wind pin the boat between trailer and dock", "using the active lane for coolers, covers or passenger boarding"],
  },
  {
    match: /\b(?:dock|docks|docking|dockline|docklines|fender|fenders|boarding)\b/i,
    focus: "use low speed, spring-line geometry and early crew communication instead of force",
    inspect: ["wind and current at the slip entrance", "the first line that can stop unwanted motion", "fender height against the actual dock", "cleats, pilings, neighboring boats and a clear abort path"],
    actions: ["pause outside the fairway and read drift", "rig lines and fenders on the working side", "brief one line at a time by name", "approach only fast enough to retain steerage", "use a spring line to control fore-and-aft movement", "back out early when the geometry stops working"],
    cautions: ["asking a crew member to jump", "putting hands or feet between boat and dock", "approaching faster to overcome wind", "throwing every line ashore without a sequence"],
  },
  {
    match: /\b(?:anchor|anchors|anchoring|scope|rode)\b/i,
    focus: "match anchor, bottom, rode and scope to the load and room available",
    inspect: ["charted depth plus tide or water-level change", "bottom type and holding history", "swing room and nearby hazards", "rode condition, markings and windlass limitations"],
    actions: ["select a drop point that includes the full swing circle", "lower rather than throw the anchor", "pay out measured rode while moving astern slowly", "set with increasing reverse power", "take visual and electronic bearings", "reset immediately when position does not stabilize"],
    cautions: ["calculating scope from charted depth alone", "assuming a heavy anchor is automatically the right pattern", "setting across another boat's rode", "going below before proving the set"],
  },
  {
    match: /\b(?:weather|forecast|wind|winds|wave|waves|fetch|thunderstorm|thunderstorms|fog)\b|cold[- ]water/i,
    focus: "translate the forecast into exposure, timing and an explicit turn-around limit",
    inspect: ["wind direction as well as speed", "wave period, fetch and shoreline shelter", "water temperature and visibility", "warning timing, radar trend and safe-harbor distance"],
    actions: ["read the full zone forecast and synopsis", "compare conditions at departure, midpoint and return", "mark the exposed legs and shelter options", "set a conservative wind, wave or visibility limit", "recheck before the farthest point", "turn while the return route remains straightforward"],
    cautions: ["treating a generic phone icon as a marine forecast", "looking only at peak wind speed", "assuming the morning crossing predicts the afternoon return", "waiting for visible lightning before leaving exposed water"],
  },
  {
    match: /\b(?:chart|charts|navigation|buoy|buoys|marker|markers|ais|current|currents|tide|tides|shoal|shoaling)\b|rules of (?:the )?road|night boating|float plan/i,
    focus: "combine an updated chart, lookout, position checks and conservative speed",
    inspect: ["chart edition and recent navigation updates", "depth, draft and under-keel margin", "aids to navigation, traffic lanes and restricted areas", "visual references that can confirm the electronic position"],
    actions: ["review the route at planning scale and close scale", "mark hazards and decision points", "verify position with more than one cue", "slow before uncertainty becomes urgent", "keep a dedicated lookout in traffic or poor visibility", "return to known safe water rather than pressing into doubt"],
    cautions: ["following a magenta route line without checking the chart", "treating AIS as a complete traffic picture", "passing a marker from memory instead of verifying the system", "using speed to reduce time in a confusing area"],
    sources: [sourceCatalog.charts, sourceCatalog.tides],
  },
  {
    match: /\b(?:vhf|dsc|mmsi|radio|radios|communication|communications|communicator|communicators|satellite)\b/i,
    focus: "build a communication chain that the crew can use when cell coverage or attention is poor",
    inspect: ["radio power, antenna, cable and connector condition", "MMSI registration and GPS position input", "working and distress-channel procedure", "portable, cellular and satellite backup coverage"],
    actions: ["register and enter identity information accurately", "confirm position data reaches the radio", "perform a lawful radio check without using the distress channel", "teach the crew where the distress control is", "keep a concise call script near the helm", "test portable charging and waterproof storage"],
    cautions: ["installing a feature without completing registration", "assuming a handheld has fixed-mount range", "placing the antenna where structure blocks it", "waiting for an emergency to explain the radio"],
    sources: [sourceCatalog.fcc],
  },
  {
    match: /fish finder|\b(?:sonar|transducer|transducers)\b|side-imaging|side imaging|down imaging/i,
    focus: "treat display, sonar frequency, transducer location and interpretation as one system",
    inspect: ["target depth, species and normal boat speed", "transducer type and clean-water location", "screen size, sunlight visibility and helm distance", "power quality, networking and mapping compatibility"],
    actions: ["define the fishing decisions the display must support", "choose the transducer before finalizing the head unit", "mock up screen and cable locations", "protect wiring from noise and water intrusion", "calibrate basic settings on known structure", "save useful waypoints with descriptive names"],
    cautions: ["buying from demonstration screenshots alone", "mounting in aerated or turbulent water", "turning sensitivity down until clutter disappears", "adding features before learning traditional sonar"],
  },
  {
    match: /\b(?:battery|batteries|charging|electrical|wiring)\b|shore power/i,
    focus: "start with a measured load, compatible charging profile and safe circuit protection",
    inspect: ["starting demand and house amp-hour use", "battery chemistry and temperature limits", "charger, alternator and solar compatibility", "cable size, overcurrent protection, ventilation and access"],
    actions: ["inventory every meaningful DC load", "separate starting reliability from house capacity", "verify charging settings for the chemistry", "size conductors for current and run length", "protect circuits close to the energy source", "record resting and charging voltages as a baseline"],
    cautions: ["replacing lead-acid with lithium without system review", "using automotive wire or unprotected connections", "sizing a bank from nameplate capacity alone", "hiding batteries where inspection and isolation are difficult"],
  },
  {
    match: /\b(?:fuel|fueling|range)\b/i,
    focus: "manage fuel as a quality, capacity, ventilation and reserve system",
    inspect: ["measured consumption at normal cruise", "usable rather than advertised tank capacity", "filter condition and signs of water", "ventilation, fill, vent and hose condition"],
    actions: ["calculate range from actual fuel logs", "reserve fuel for detours and changing conditions", "shut down ignition sources before fueling", "control passengers and spills at the fill", "inspect the sample or separator for water", "investigate repeated contamination before replacing filters again"],
    cautions: ["planning from the fuel gauge alone", "using the entire tank as usable range", "trying to repair stale fuel with additive", "starting machinery before vapors are cleared"],
  },
  {
    match: /\b(?:cover|covers|covering|canvas|shade|bimini|biminis)\b/i,
    focus: "balance weather protection with support, drainage, ventilation and chafe control",
    inspect: ["fabric purpose and fit", "support points and drainage path", "air movement through enclosed spaces", "straps, edges and surfaces that can abrade"],
    actions: ["choose the cover for storage, mooring or trailering duty", "create a ridge that cannot pond water", "pad sharp hardware and windshield edges", "vent without opening a direct weather path", "tension evenly and recheck after the first storm", "clean and dry fabric before long storage"],
    cautions: ["using a loose storage cover at road speed", "allowing snow or rain to create pockets", "sealing damp upholstery inside", "letting straps rub gelcoat in wind"],
  },
  {
    match: /\b(?:corrosion|anode|anodes|saltwater)\b/i,
    exclusive: true,
    focus: "separate ordinary exposure, galvanic action and electrical faults before choosing a remedy",
    inspect: ["anode material, location and consumption pattern", "dissimilar metals in contact with the electrolyte", "bonding and shore-power condition", "rapid or localized damage that suggests stray current"],
    actions: ["photograph and date anode condition", "verify the correct anode material for the water", "clean salt from prioritized systems", "inspect grounds and connections for heat or damage", "compare deterioration across underwater metals", "involve a qualified marine electrician when loss is rapid"],
    cautions: ["painting anodes or isolating their electrical contact", "adding more anode without diagnosing the system", "confusing galvanic damage with stray current", "ignoring corrosion because the hardware is labeled stainless"],
  },
  {
    match: /\b(?:gelcoat|fiberglass|wax|sealant|ceramic|oxidation|crack|cracks)\b/i,
    focus: "identify whether the issue is surface contamination, oxidation, coating failure or structural movement",
    inspect: ["crack pattern, location and whether it changes under load", "gelcoat thickness and prior repairs", "oxidation depth and a small test area", "moisture pathways around fittings and core"],
    actions: ["wash and decontaminate before judging finish", "test the least aggressive correction", "document cracks before opening or filling them", "remove loose material and prepare sound edges", "match protection to the corrected surface", "refer movement, moisture or recurring cracks for professional evaluation"],
    cautions: ["polishing contamination into the surface", "filling a stress crack without finding movement", "sanding through thin gelcoat", "coating over residue that prevents adhesion"],
  },
  {
    match: /\b(?:winter|winterization|storage|commissioning|ventilation)\b/i,
    focus: "control freeze damage, moisture, battery state, pests and missed recommissioning steps",
    inspect: ["all raw-water and potable-water paths", "fuel condition and engine-specific layup procedure", "battery storage and charging environment", "cover support, ventilation and access for periodic checks"],
    actions: ["build the checklist from the boat's actual systems", "complete manufacturer engine and generator procedures", "drain or protect every water-holding component", "clean and dry food, fabric and lockers", "label disconnected or winterized equipment", "schedule cover and bilge inspections through the off-season"],
    cautions: ["assuming gravity drained a hidden low point", "forgetting air conditioners, washdowns or livewells", "closing damp compartments tightly", "launching before reversing every layup tag"],
  },
  {
    match: /\b(?:child|children|kid|kids|toddler|toddlers|family)\b|life jacket/i,
    focus: "reduce supervision gaps with fitted equipment, short routines and age-appropriate jobs",
    inspect: ["life-jacket fit and label for each child", "rail, ladder, hatch and boarding hazards", "shade, clothing, food, water and bathroom timing", "which adult owns supervision during each transition"],
    actions: ["fit and test flotation before the trip", "establish seated zones for departure and docking", "give children one repeatable boat job", "schedule food and bathroom stops before they become urgent", "keep the first legs short", "end while the crew still has patience for recovery and unloading"],
    cautions: ["treating supervision as everyone's shared job", "using an outgrown or riding-up life jacket", "letting children move during docking", "planning adult-length legs without shade or stops"],
  },
  {
    match: /\b(?:fire|emergency|emergencies)\b|engine fail|taking[- ]on[- ]water|water intrusion|person[- ]overboard|first-aid|first aid/i,
    focus: "protect life, stop the escalation, communicate early and move toward the simplest safe recovery",
    inspect: ["reachable flotation, extinguishers and dewatering tools", "fuel, electrical and machinery shutoffs", "VHF/DSC and position information", "crew roles for lookout, communication and first aid"],
    actions: ["put flotation on and account for everyone", "stabilize the boat relative to traffic, shore and weather", "control fuel, electricity or water only when safe", "send an early, clear call with position and people aboard", "use the practiced equipment within its limits", "prepare for outside assistance before the situation worsens"],
    cautions: ["keeping the problem quiet while options disappear", "sending an unprotected person into a hazardous space", "fixating on the failed component instead of drift or fire spread", "continuing the trip after the immediate symptom stops"],
  },
  {
    match: /\b(?:buy|buying|choose|choosing|selection|which|insurance|financing|finance|budget|cost|costs|inspection|survey)\b|sea trial|first boat|first yacht/i,
    generic: true,
    focus: "compare complete ownership fit rather than purchase price or headline features",
    inspect: ["the boat's primary mission and normal crew", "survey, condition, records and known defects", "storage, service and insurance availability", "year-one upgrades plus recurring annual cost"],
    actions: ["write a one-sentence mission before shopping", "rank non-negotiables separately from preferences", "price storage, insurance and service before making an offer", "inspect records and identity information", "use an independent survey or specialist where appropriate", "preserve cash and time for the first season's corrections"],
    cautions: ["buying the largest boat the payment permits", "using a clean interior as evidence of mechanical condition", "treating an online estimate as a complete ownership budget", "skipping sea trial conditions that reveal handling or vibration"],
  },
  {
    match: /\b(?:maintenance|service|repair|repairs|diy|install|installing|installation|cleaning)\b/i,
    generic: true,
    focus: "define the condition, safe isolation and acceptance test before beginning work",
    inspect: ["manufacturer procedure and required tools", "energy, fuel, pressure and moving-part hazards", "access to the complete system rather than one component", "how the repair will be tested under realistic load"],
    actions: ["record symptoms before disassembly", "isolate and verify every energy source", "photograph routing and label connections", "change one variable at a time", "test first at low consequence and then under normal load", "log parts, measurements and the next inspection date"],
    cautions: ["replacing parts before confirming the failure", "working from color alone on electrical wiring", "burying a connection that needs inspection", "calling a repair complete because it works once at the dock"],
  },
  {
    match: /\b(?:outboard|outboards|sterndrive|sterndrives|inboard|inboards|horsepower)\b|single vs twin/i,
    focus: "match propulsion, service access and redundancy to load, water and operating pattern",
    inspect: ["manufacturer maintenance history and diagnostic evidence", "cooling flow, fluids, corrosion and mounting condition", "propeller, gearcase and vibration clues", "loaded performance rather than lightly equipped speed"],
    actions: ["verify identity, hours and service records", "inspect cold-start behavior when possible", "compare engine data at idle and under load", "confirm the boat reaches the correct operating range", "price deferred service before valuing upgrades", "plan routine access before adding surrounding equipment"],
    cautions: ["judging condition from paint and cleanliness", "accepting a warmed engine as a cold-start test", "choosing horsepower without loaded use", "treating twin engines as complete redundancy when systems are shared"],
  },
  {
    match: /\b(?:camping|overnight|provisioning|packing|charter|marina|marinas|slip|slips)\b|spare-parts/i,
    focus: "coordinate reservations, boat systems, shore access and a weather-safe overnight alternative",
    inspect: ["arrival window, cancellation policy and after-hours procedure", "depth, power, water and boarding arrangement", "food, sanitation, sleeping and charging loads", "weather exposure and a reachable backup stop"],
    actions: ["confirm the reservation directly", "ask for approach and dock-assignment details", "test sleeping and galley systems before departure", "pack by use sequence rather than room", "arrive with daylight for the first visit", "keep a shore or home fallback that does not depend on finding another slip"],
    cautions: ["treating a reservation as proof of safe access", "arriving after dark without approach notes", "overloading the electrical system with comfort gear", "packing every locker until safety equipment is buried"],
  },
  {
    match: /\b(?:seating|seat|seats|comfort)\b/i,
    focus: "improve comfort without blocking movement, access, visibility or safe passenger positions",
    inspect: ["support and pressure points during normal run time", "walkways, hatches and emergency access", "mounting structure and fastener condition", "materials exposed to water, ultraviolet light and cleaning products"],
    actions: ["identify the discomfort before choosing hardware", "mock up the occupied position", "verify access with every seat in use", "inspect the mounting structure", "choose marine-suitable materials", "install without hiding service points", "test movement at idle before normal speed", "recheck fasteners after use"],
    cautions: ["adding cushions that obstruct controls", "mounting into unsupported thin surfaces", "reducing safe movement for a showroom appearance", "using household materials that retain water or degrade outside"],
  },
  {
    match: /cross[- ]border|\bborder crossing\b|\bcustoms\b/i,
    exclusive: true,
    focus: "separate route planning from the document and reporting process required for an international crossing",
    inspect: ["identity and vessel documents for everyone aboard", "current U.S. and Canadian reporting requirements", "where and when contact must be made", "crew, goods, pets and plans that can change admissibility questions"],
    actions: ["verify both countries' official instructions", "collect documents before departure day", "brief the crew not to improvise the itinerary", "record arrival and reporting steps", "keep communication available at the reporting point", "answer official questions accurately", "retain confirmation information", "use a domestic alternate if the process cannot be completed"],
    cautions: ["relying on another boater's old crossing routine", "assuming a short sightseeing pass is exempt", "letting documents remain in an inaccessible vehicle", "changing landing plans without rechecking reporting obligations"],
  },
];

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function selectRules(title, description, hub) {
  const titleMatched = topicRules.filter((rule) => rule.match.test(title));
  const exclusive = titleMatched.find((rule) => rule.exclusive);
  if (exclusive) return [exclusive];
  const matched = titleMatched.length ? titleMatched : topicRules.filter((rule) => rule.match.test(description));
  const concrete = matched.filter((rule) => !rule.generic);
  if (concrete.length) return concrete.slice(0, 2);
  return matched.length ? matched.slice(0, 2) : [{
    focus: hub.kind === "destination" ? `build ${title.toLowerCase()} around route exposure, access, shore options and a conservative return` : `turn ${title.toLowerCase()} into a repeatable decision rather than a one-time guess`,
    inspect: kindProfiles[hub.kind].constraints,
    actions: ["define the desired result", "identify the limiting condition", "verify current information", "prepare the boat and crew", "test the plan at low consequence", "record what should change next time"],
    cautions: ["starting without a stop point", "adding complexity before the basics work", "depending on one source of information", "continuing after the safety margin is gone"],
  }];
}

export function getHubEditorial(hub) {
  const base = kindProfiles[hub.kind];
  const specific = hubProfiles[hub.label] || {};
  return {
    context: specific.context || base.context,
    constraints: unique([...(specific.constraints || []), ...base.constraints]).slice(0, 5),
    practice: specific.practice || `Build the ${hub.label.toLowerCase()} plan around the normal boat, crew and operating conditions, then identify the one change that would force a simpler option.`,
    proof: specific.proof || base.proof,
    sources: unique([...(specific.sources || []), ...base.sources].map((source) => JSON.stringify(source))).map((source) => JSON.parse(source)),
  };
}

export function getArticleEditorial(hub, article) {
  const [, title, description] = article;
  const base = kindProfiles[hub.kind];
  const hubEditorial = getHubEditorial(hub);
  const rules = selectRules(title, description, hub);
  const archetype = archetypes.find((item) => item.match.test(title)) || archetypes.at(-1);
  const inspect = unique(rules.flatMap((rule) => rule.inspect || [])).slice(0, 6);
  const actions = unique(rules.flatMap((rule) => rule.actions || [])).slice(0, 8);
  const cautions = unique(rules.flatMap((rule) => rule.cautions || [])).slice(0, 6);
  const focuses = unique(rules.map((rule) => rule.focus));
  const sources = unique([
    ...hubEditorial.sources,
    ...rules.flatMap((rule) => rule.sources || []),
    ...base.sources,
  ].map((source) => JSON.stringify(source))).map((source) => JSON.parse(source));

  return {
    archetype,
    context: hubEditorial.context,
    hubPractice: hubEditorial.practice,
    proof: hubEditorial.proof,
    constraints: hubEditorial.constraints,
    focus: focuses.join("; and "),
    inspect,
    actions,
    cautions,
    sources,
    firstMove: `${archetype.first}. For ${title}, that means using the boat, crew and conditions described in this guide rather than a generic best-case scenario.`,
    description,
  };
}
