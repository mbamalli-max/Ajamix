# Basic Science P1–P6 Full-Batch QA Result
Date: 2026-07-21
Scope: 91 images (Basic Science P1–P6, `tools/image-pipeline/output/raw/style-b-<id>.png`), excluding the 10 already-accepted validation-subset images (p1-bsci-01, p1-bsci-14, p2-bsci-01, p3-bsci-06, p3-bsci-13, p5-bsci-15, p6-bsci-06, p6-bsci-07, p6-bsci-09, p6-bsci-12).

**Verdict counts: 73 ACCEPT / 4 BORDERLINE / 14 FAIL**

The dominant defect by far is the recurring pattern flagged going into this review: the model inserting mosque-specific architecture (dome, minaret, toron spikes, arched mosque windows) into background townscapes where the manifest never called for it. This accounts for 13 of the 14 FAILs. One FAIL (p4-bsci-18) also has a secondary issue with an overly graphic/anatomically colored digestive-system rendering.

## Summary Table

| ID | Module | Verdict |
|---|---|---|
| p1-bsci-02 | The Senses – Hearing | ACCEPT |
| p1-bsci-03 | The Senses – Touch | ACCEPT |
| p1-bsci-04 | The Senses – Smell and Taste | ACCEPT |
| p1-bsci-05 | The Five Senses Review | ACCEPT |
| p1-bsci-06 | Living Things – Animals | ACCEPT |
| p1-bsci-07 | Living Things – Plants | ACCEPT |
| p1-bsci-08 | Non-Living Things | ACCEPT |
| p1-bsci-09 | Water – Sources and Uses | BORDERLINE |
| p1-bsci-10 | Air – What is Air? | FAIL |
| p1-bsci-11 | The Weather | ACCEPT |
| p1-bsci-12 | Simple Machines – Lever | ACCEPT |
| p1-bsci-13 | Simple Machines – Wheel and Axle | ACCEPT |
| p1-bsci-15 | Revision and Assessment | ACCEPT |
| p2-bsci-02 | Parts of a Plant | ACCEPT |
| p2-bsci-03 | Domestic Animals | ACCEPT |
| p2-bsci-04 | Weather | FAIL |
| p2-bsci-05 | Uses of Water | ACCEPT |
| p2-bsci-06 | Personal Hygiene | ACCEPT |
| p2-bsci-07 | Food Groups | ACCEPT |
| p2-bsci-08 | The Five Senses | ACCEPT |
| p2-bsci-09 | Safety at Home | ACCEPT |
| p2-bsci-10 | Clean Environment | ACCEPT |
| p2-bsci-11 | Simple Machines at Home | ACCEPT |
| p2-bsci-12 | Sources of Light | FAIL |
| p2-bsci-13 | Sound Around Us | ACCEPT |
| p2-bsci-14 | Care of Plants and Animals | ACCEPT |
| p2-bsci-15 | Keeping Water Safe | ACCEPT |
| p2-bsci-16 | What Plants Need to Grow | ACCEPT |
| p2-bsci-17 | Habitats and Their Differences | ACCEPT |
| p2-bsci-18 | Materials, Their Properties and Uses | ACCEPT |
| p2-bsci-19 | Clay and Moulding Shapes | ACCEPT |
| p3-bsci-01 | Classifying Living Things | ACCEPT |
| p3-bsci-02 | Parts of the Body and Their Functions | BORDERLINE |
| p3-bsci-03 | Growth and Life Cycles | ACCEPT |
| p3-bsci-04 | Our Environment | ACCEPT |
| p3-bsci-05 | The Water Cycle | FAIL |
| p3-bsci-07 | Measuring Length and Mass | ACCEPT |
| p3-bsci-08 | Measuring Time | ACCEPT |
| p3-bsci-09 | Soil and Its Uses | ACCEPT |
| p3-bsci-10 | Air in Motion | ACCEPT |
| p3-bsci-11 | Traditional and Modern Technology | ACCEPT |
| p3-bsci-12 | Light and Mirrors | BORDERLINE |
| p3-bsci-14 | Animal Habitats and Shelters | ACCEPT |
| p3-bsci-15 | Balanced Meals | ACCEPT |
| p3-bsci-16 | Plant Parts and Functions (Deeper Study) | ACCEPT |
| p4-bsci-01 | Plant Groups: Trees, Shrubs, and Herbs | ACCEPT |
| p4-bsci-02 | Animal Groups: Vertebrates and Invertebrates | ACCEPT |
| p4-bsci-03 | Types of Soil | ACCEPT |
| p4-bsci-04 | Soil and Farming | ACCEPT |
| p4-bsci-05 | Everyday Sources of Energy | FAIL |
| p4-bsci-06 | Simple Electricity Safety | ACCEPT |
| p4-bsci-07 | Push and Pull | FAIL |
| p4-bsci-08 | Movement and Friction | FAIL |
| p4-bsci-09 | Personal Hygiene and Health | ACCEPT |
| p4-bsci-10 | Clean Surroundings | ACCEPT |
| p4-bsci-11 | Malaria Prevention | BORDERLINE |
| p4-bsci-12 | Preventing Diarrhoea | ACCEPT |
| p4-bsci-13 | Weather Instruments | ACCEPT |
| p4-bsci-14 | Keeping Weather Records | ACCEPT |
| p4-bsci-15 | Fire, Heat, and Safety | ACCEPT |
| p4-bsci-16 | Temporary and Permanent Changes; Heating and Cooling | ACCEPT |
| p4-bsci-17 | Plant and Animal Life-Cycle Changes | ACCEPT |
| p4-bsci-18 | Digestive System and Teeth | FAIL |
| p4-bsci-19 | How Sound Is Produced and Travels | ACCEPT |
| p4-bsci-20 | Vehicles, External Parts and Safe Technology Use | ACCEPT |
| p4-bsci-21 | Nutrition and Healthy Growth | ACCEPT |
| p5-bsci-01 | Environmental Changes, Pollution, and Environmental Quality | ACCEPT |
| p5-bsci-02 | Waste Disposal, Reuse, and Recycling | ACCEPT |
| p5-bsci-03 | Human Skeleton, Joints, and Movement | FAIL |
| p5-bsci-04 | Flower Parts, Pollination, and Seed and Fruit Formation | ACCEPT |
| p5-bsci-05 | Rocks: Properties, Groups, and Uses | ACCEPT |
| p5-bsci-06 | Acids, Bases, and Household Substances | ACCEPT |
| p5-bsci-07 | Materials, Maintenance, and Drawing Instruments | ACCEPT |
| p5-bsci-08 | Vehicle Parts, Functions, and Safety | ACCEPT |
| p5-bsci-09 | Energy Conversion | ACCEPT |
| p5-bsci-10 | Heat and Temperature | FAIL |
| p5-bsci-11 | Battery, Insulated Wire, and Bulb: Simple Circuits | ACCEPT |
| p5-bsci-12 | Magnets and Magnetic Materials | ACCEPT |
| p5-bsci-13 | Nutrients, Healthy Growth, and Deficiency Prevention | ACCEPT |
| p5-bsci-14 | Diseases and Prevention | ACCEPT |
| p6-bsci-01 | The Solar System and Gravity | ACCEPT |
| p6-bsci-02 | Earth's Movements, Day and Night | ACCEPT |
| p6-bsci-03 | Weather Symbols, Climate Records, and Change | FAIL |
| p6-bsci-04 | Forces and Friction | FAIL |
| p6-bsci-05 | The Heart, Blood Vessels, and Circulation | ACCEPT |
| p6-bsci-08 | Air Pressure and Its Uses | ACCEPT |
| p6-bsci-10 | White Light, Primary Colours, and Pigments | FAIL |
| p6-bsci-11 | Drawing Instruments and Accurate Technical Lines | ACCEPT |
| p6-bsci-13 | Maintenance, Workshop Safety, and Road Safety | FAIL |
| p6-bsci-14 | Levers and Pulleys | ACCEPT |
| p6-bsci-15 | Inclined Planes and P6 Science Consolidation | ACCEPT |

## Detail: FAIL

### p1-bsci-10 — Air – What is Air?
A clear Djenné-style mud mosque with toron sticks and conical minaret towers occupies the right third of the background, unrequested by the manifest (which calls only for "an outdoor scene... tree's leaves and a flag blown sideways"). Recurring mosque-architecture pattern.

### p2-bsci-04 — Weather
Two of the four weather panels (cloudy, and rain/umbrella) show a clear green-domed mosque with minaret directly behind the subjects. Not called for anywhere in the manifest.

### p2-bsci-12 — Sources of Light
A very large, prominent Djenné-style mosque with many spires dominates the middle background behind the child, much larger/more central than prior instances.

### p3-bsci-05 — The Water Cycle
A minaret tower with a small dome/finial cap and arched window is visible in the middle-background townscape, unrequested.

### p4-bsci-05 — Everyday Sources of Energy
A clear mosque minaret (conical spire, arched windows, green roof, pointed finial) sits in the left background of the fire-tending scene.

### p4-bsci-07 — Push and Pull
A mosque dome with an onion/finial top and scalloped merlon decoration is directly behind the child pulling the well bucket.

### p4-bsci-08 — Movement and Friction
A minaret with a green dome and crescent-like finial appears in the background of the wet-path/shoe panel.

### p4-bsci-18 — Digestive System and Teeth
Two issues: (1) A very large, detailed replica of the Great Mosque of Djenné dominates the left third of the image — the most extreme instance of the recurring mosque pattern in this batch. (2) The digestive organs (stomach, coiled intestines) are rendered in fairly vivid pink/red anatomical color and detail, more graphic than the "non-graphic educational outline only... no exposed organs" safety note calls for.

### p5-bsci-03 — Human Skeleton, Joints, and Movement
An unmistakable, highly detailed replica of the Great Mosque of Djenné (twin conical minarets, torons) fills the left background — one of the most blatant instances in the batch. Otherwise the skeleton diagram itself is appropriately non-graphic and friendly.

### p5-bsci-10 — Heat and Temperature
The "sunny hot day" comparison panel, instead of a generic hot scene, depicts an iconic mosque minaret (Djenné/Timbuktu style with toron sticks) as the main subject — unrequested religious architecture replacing the intended generic weather-comparison content.

### p6-bsci-03 — Weather Symbols, Climate Records, and Change
The most repeated instance in the batch: the same large mosque (green-domed minaret, mud-brick tower) appears as the dominant landmark in all three panels (window view, rainy-season panel, harmattan panel), despite the manifest only asking for a generic Northern Nigerian setting.

### p6-bsci-04 — Forces and Friction
Left panel background shows both a small domed turret and a mosque-style conical mud minaret with an arched doorway, unrequested by the manifest's push/friction-toy demonstration.

### p6-bsci-10 — White Light, Primary Colours, and Pigments
A large, detailed mosque (dome, toron-spiked minaret, arched green-trimmed doorway) is the dominant background element on the left, unrequested by a manifest that only calls for a prism-and-paint demonstration.

### p6-bsci-13 — Maintenance, Workshop Safety, and Road Safety
The road-safety panel's background skyline is dominated by a large mosque with dome and multiple minarets, unrequested by the manifest (which specifies only a pedestrian crossing, traffic light, and reflective triangle).

## Detail: BORDERLINE

### p1-bsci-09 — Water – Sources and Uses
The "rain" panel shows fairly heavy, dark storm clouds with water pooling substantially around/against the house — visually closer to a flood scene than the "rain falling" the manifest describes as one of four calm water sources. Not an explicit safetyNote violation (that note is specifically about dirty water for drinking, which isn't shown), but the intensity is inconsistent with the generally mild-weather pattern established across other modules and could read as mild storm-damage imagery for young children.

### p3-bsci-02 — Parts of the Body and Their Functions
The manifest calls for "simple labeled pointer lines" pointing to eyes, ears, nose, mouth, hands, and legs/feet on a diagram-style figure. The delivered image is a naturalistic illustration of a child (holding a book, hand cupped to ear) with no pointer-line/callout structure at all. Content is safe (fully clothed, non-graphic), but it doesn't fulfill the diagram format the manifest specifies, which may matter for how the deterministic label-overlay step anchors its callouts.

### p3-bsci-12 — Light and Mirrors
A small, stray blue graphical artifact (an irregular glyph-like mark, not clearly any recognizable object) appears floating in the sky near the tree in the shadow-length panel. It doesn't read as legible text but is an out-of-place mark consistent with the "gibberish/artifact" defect category worth a second look before acceptance.

### p4-bsci-11 — Malaria Prevention
A subtle building silhouette with a dome-and-finial shape appears in the night skyline visible through the window, consistent with (but a much milder instance of) the recurring mosque-motif pattern. Given it's silhouette-only and small, this is a softer call than the FAILs above, but worth flagging per the standing instruction to catch even incidental instances.

## Notes
- No other safety-note violations were found across the batch — hazard scenes (fire, sockets, sharp tools, wells, chemicals, wild animals) were consistently handled with correct safe distancing, adult supervision, or "pointed out not touched" framing per each module's manifest.
- No baked-in numerals/text were found in the top band or side margins in any of the 91 images; the isolated numeral-bearing props found (ruler zero mark, protractor scale) were explicitly called for by their manifests and are ordinary object detail, not overlay-conflicting artifacts.
- No caricature, distorted anatomy, watermark, or gender-stereotyping issues were observed elsewhere in the batch.
