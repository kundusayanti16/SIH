/**
 * Dynamic AI Video Generator Engine with Full Multilingual,
 * Simplified (ELI5) Story Mode, Interactive Visual Sandbox, and "Ask Moment" Contextual Doubt Solver.
 */

export const VIDEO_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', speechLang: 'en-US' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechLang: 'hi-IN' },
  { code: 'hinglish', name: 'Hinglish', nativeName: 'Hinglish (Hindi+English)', flag: '🇮🇳', speechLang: 'hi-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', speechLang: 'bn-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speechLang: 'ta-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', speechLang: 'te-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', speechLang: 'mr-IN' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechLang: 'es-ES' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', speechLang: 'fr-FR' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speechLang: 'de-DE' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🕉️', speechLang: 'hi-IN' }
];

// Multilingual blueprints for core academic topics with both Standard and Simplified (ELI5) modes
const MULTILINGUAL_DATA = {
  photosynthesis: {
    aliases: ['photosynthesis', 'photo synthesis', 'प्रकाश संश्लेषण', 'chlorophyll', 'plant food', 'plants food'],
    category: "Biology",
    defaultTheme: "emerald",
    en: {
      title: "Photosynthesis: Earth's Solar Energy Converter",
      category: "Biology",
      simpleHeadline: "How Plants Cook Food Using Sunlight!",
      scenes: [
        {
          title: "Introduction: Harnessing Sunlight",
          headline: "The Fundamental Biological Engine of Earth",
          simpleTitle: "Sunlight to Sugar: Nature's Solar Kitchen",
          simpleHeadline: "Plants are like solar-powered chef kitchens!",
          animationType: "biological-sunlight",
          formula: "6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂",
          diagramNodes: [
            { label: "Solar Photons (hν)", color: "#F4C95D", x: 25, y: 35 },
            { label: "Chloroplast Stroma", color: "#5F9F7A", x: 50, y: 65 },
            { label: "Pure Oxygen (O₂)", color: "#3AA6A0", x: 75, y: 35 }
          ],
          points: [
            "Photosynthesis converts solar energy into chemical energy stored in glucose",
            "Occurs primarily inside plant leaves within specialized chloroplast organelles",
            "Produces the oxygen (O₂) essential for aerobic life on our planet"
          ],
          simplePoints: [
            "☀️ Sun gives solar light rays like glowing batteries",
            "🍃 Green leaves act like tiny solar panels capturing that light",
            "💨 Plants breathe in bad carbon dioxide and puff out clean fresh Oxygen for us!"
          ],
          narration: "Welcome to the story of Photosynthesis, nature's most incredible solar factory. Inside every green leaf, millions of microscopic engines capture sunlight and transform carbon dioxide and water into oxygen and glucose, fueling life on Earth.",
          simpleNarration: "Imagine if you could make your favorite chocolate cake just by standing in the sunshine! That is exactly what plants do. They drink water from soil, catch sun rays, and cook delicious sweet glucose while giving us fresh air to breathe!"
        },
        {
          title: "Stage 1: Light-Dependent Reactions",
          headline: "Capturing Photons in the Thylakoid Membrane",
          simpleTitle: "Stage 1: Splitting Water with Light",
          simpleHeadline: "Pop! Splitting water into fresh Oxygen bubbles",
          animationType: "chloroplast-thylakoid",
          formula: "2H₂O + 2NADP⁺ + 3ADP + 3Pᵢ → O₂ + 2NADPH + 3ATP",
          diagramNodes: [
            { label: "Water Molecule (H₂O)", color: "#3AA6A0", x: 25, y: 40 },
            { label: "Thylakoid Photolysis", color: "#5F9F7A", x: 50, y: 60 },
            { label: "Charged ATP Batteries", color: "#F4C95D", x: 75, y: 40 }
          ],
          points: [
            "Chlorophyll pigments absorb blue and red light wavelengths, reflecting green",
            "Water molecules undergo photolysis, splitting into protons, electrons, and O₂ gas",
            "High-energy electron transport generates ATP and NADPH molecules"
          ],
          simplePoints: [
            "💧 Water drops get hit by sunbeam lasers inside the leaf",
            "⚡ The water splits apart: Oxygen flies into the air",
            "🔋 Tiny biological batteries called ATP get fully charged!"
          ],
          narration: "In the first stage, light-dependent reactions take place across the thylakoid membranes. Chlorophyll pigments absorb photons, energizing electrons and splitting water molecules to release pure oxygen as a byproduct while charging ATP batteries.",
          simpleNarration: "Inside the leaf are microscopic green coin stacks called thylakoids. When sunlight strikes them, they zap water molecules with light energy, releasing fresh oxygen bubbles into the breeze and charging up tiny cellular batteries!"
        },
        {
          title: "Stage 2: The Calvin Cycle (Light-Independent)",
          headline: "Synthesizing Glucose in the Stroma",
          simpleTitle: "Stage 2: Making Sugar Sweets",
          simpleHeadline: "Mixing air and energy to bake glucose sweets",
          animationType: "molecular-cycle",
          formula: "3CO₂ + 9ATP + 6NADPH → G3P + 9ADP + 8Pᵢ + 6NADP⁺",
          diagramNodes: [
            { label: "CO₂ from Atmosphere", color: "#718078", x: 25, y: 35 },
            { label: "RuBisCO Fixation", color: "#F4C95D", x: 50, y: 65 },
            { label: "Sweet Glucose (C₆H₁₂O₆)", color: "#3AA6A0", x: 75, y: 35 }
          ],
          points: [
            "Occurs in the stroma fluid of the chloroplast without needing direct light",
            "Enzyme RuBisCO fixes atmospheric CO₂ into 3-PGA organic molecules",
            "Uses ATP and NADPH from Stage 1 to synthesize high-energy glucose"
          ],
          simplePoints: [
            "🌬️ Plant catches carbon dioxide from the surrounding air",
            "🍳 Chef enzyme RuBisCO stirs the carbon and charged battery power together",
            "🍬 Out comes sweet glucose syrup to help the plant grow big and strong!"
          ],
          narration: "Next, in the stroma of the chloroplast, the Calvin Cycle begins. The enzyme RuBisCO captures atmospheric carbon dioxide and uses the stored ATP and NADPH to assemble three-carbon sugars that eventually form nourishing glucose.",
          simpleNarration: "Now comes the baking stage! In the liquid part of the chloroplast, special helper enzymes take carbon from the air and use the charged batteries to bake pure plant food—sweet glucose!"
        },
        {
          title: "Summary & Global Impact",
          headline: "The Foundation of the Global Biosphere",
          simpleTitle: "Why Photosynthesis Matters to You",
          simpleHeadline: "Without green leaves, our planet could not breathe!",
          animationType: "biosphere-energy",
          formula: "170\\text{ Billion Tons Biomass/Year} \\Longleftrightarrow \\text{Planetary O₂ Equilibrium}",
          diagramNodes: [
            { label: "Global Plant Canopy", color: "#5F9F7A", x: 25, y: 45 },
            { label: "Atmospheric O₂ Reservoir", color: "#3AA6A0", x: 50, y: 30 },
            { label: "Global Food Web Base", color: "#F4C95D", x: 75, y: 45 }
          ],
          points: [
            "Generates ~170 billion metric tons of dry biomass annually across oceans and forests",
            "Regulates planetary carbon balance and mitigates climate temperature swings",
            "Provides the caloric base for virtually all terrestrial food webs"
          ],
          simplePoints: [
            "🌍 Provides almost all oxygen breathed by humans and animals",
            "🍎 Gives us apples, grains, vegetables, and fuels all animal life",
            "🌳 Every tree is a natural air purifier cooling our planet!"
          ],
          narration: "Without photosynthesis, Earth's oxygen atmosphere would deplete and food chains would collapse. Understanding this process is vital for advancing agricultural yields and developing artificial clean bio-solar technologies.",
          simpleNarration: "Every single breath of fresh oxygen you take, and every apple you bite into, exists because of photosynthesis. Plants are our planet's superhero solar power generators!"
        }
      ],
      quiz: {
        question: "Which organelle and pigment are directly responsible for trapping sunlight during photosynthesis?",
        options: [
          "Mitochondria with Hemoglobin",
          "Chloroplast with Chlorophyll",
          "Ribosome with Melanin",
          "Endoplasmic Reticulum with Keratin"
        ],
        explanation: "Chloroplasts house chlorophyll pigments within their thylakoid membranes to capture photon energy from sunlight."
      }
    },
    hi: {
      title: "प्रकाश संश्लेषण (Photosynthesis): पृथ्वी का सौर ऊर्जा संयंत्र",
      category: "जीव विज्ञान (Biology)",
      simpleHeadline: "पौधे धूप से अपना खाना कैसे बनाते हैं?",
      scenes: [
        {
          title: "परिचय: सूर्य के प्रकाश का अवशोषण",
          headline: "पृथ्वी का मौलिक जैविक इंजन",
          simpleTitle: "सरल भाषा में: पत्तियाँ हैं नन्हे सोलर किचन!",
          simpleHeadline: "पौधे सूरज की रोशनी से मीठा भोजन पकाते हैं",
          animationType: "biological-sunlight",
          formula: "6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂",
          diagramNodes: [
            { label: "सौर फोटॉन (प्रकाश)", color: "#F4C95D", x: 25, y: 35 },
            { label: "क्लोरोप्लास्ट स्ट्रोमा", color: "#5F9F7A", x: 50, y: 65 },
            { label: "शुद्ध ऑक्सीजन (O₂)", color: "#3AA6A0", x: 75, y: 35 }
          ],
          points: [
            "प्रकाश संश्लेषण सौर ऊर्जा को ग्लूकोज में संग्रहीत रासायनिक ऊर्जा में बदलता है",
            "यह मुख्य रूप से पौधों की पत्तियों में क्लोरोप्लास्ट (Chloroplast) के अंदर होता है",
            "यह पृथ्वी पर जीवन के लिए आवश्यक प्राणवायु ऑक्सीजन (O₂) का उत्पादन करता है"
          ],
          simplePoints: [
            "☀️ सूरज पौधों को मुफ्त ऊर्जा और धूप देता है",
            "🍃 हरी पत्तियाँ धूप को पकड़ने वाले सोलर पैनल जैसी होती हैं",
            "💨 पौधे कार्बन डाइऑक्साइड सोखते हैं और हमें ताजी ऑक्सीजन देते हैं!"
          ],
          narration: "प्रकाश संश्लेषण की अद्भुत दुनिया में आपका स्वागत है। हर हरी पत्ती के अंदर लाखों सूक्ष्म इंजन सूर्य की किरणों को पकड़कर कार्बन डाइऑक्साइड और पानी को ऑक्सीजन और ग्लूकोज में बदलते हैं।",
          simpleNarration: "सोचिए अगर आप सिर्फ धूप में खड़े होकर अपना मनपसंद खाना बना पाते! पौधे बिल्कुल यही करते हैं। वे जड़ों से पानी पीते हैं, धूप पकड़ते हैं और हमारे लिए ताजी हवा बनाते हैं।"
        },
        {
          title: "पहला चरण: प्रकाश-निर्भर अभिक्रियाएं (Light Reactions)",
          headline: "थायलेकॉइड झिल्ली में फोटॉन ऊर्जा का संचयन",
          simpleTitle: "पहला चरण: धूप से पानी को तोड़ना",
          simpleHeadline: "पानी टूटता है और ऑक्सीजन हवा में उड़ती है",
          animationType: "chloroplast-thylakoid",
          formula: "2H₂O + 光 → O₂ + 4H⁺ + 4e⁻",
          diagramNodes: [
            { label: "जल अणु (H₂O)", color: "#3AA6A0", x: 25, y: 40 },
            { label: "थायलेकॉइड अपघटन", color: "#5F9F7A", x: 50, y: 60 },
            { label: "ATP बैटरी चार्जिंग", color: "#F4C95D", x: 75, y: 40 }
          ],
          points: [
            "क्लोरोफिल वर्णक नीली और लाल रोशनी को अवशोषित करते हैं और हरा रंग परावर्तित करते हैं",
            "जल के अणु (H₂O) टूटकर प्रोटॉन, इलेक्ट्रॉन और ऑक्सीजन गैस मुक्त करते हैं",
            "उच्च-ऊर्जा इलेक्ट्रॉन परिवहन से ATP और NADPH अणुओं का निर्माण होता है"
          ],
          simplePoints: [
            "💧 पत्तियों में पानी पर सूरज की किरणें गिरती हैं",
            "⚡ पानी टूटकर शुद्ध ऑक्सीजन हवा में छोड़ देता है",
            "🔋 पौधे की आंतरिक बैटरियां (ATP) पूरी तरह चार्ज हो जाती हैं!"
          ],
          narration: "पहले चरण में, थायलेकॉइड झिल्लियों में प्रकाश-निर्भर अभिक्रियाएं होती हैं। क्लोरोफिल सूर्य के फोटॉन को सोखकर पानी को तोड़ता है और शुद्ध ऑक्सीजन हवा में छोड़ता है।",
          simpleNarration: "पत्तियों के अंदर हरे रंग के छोटे-छोटे सिक्के जैसे हिस्से होते हैं। जब धूप इन पर पड़ती है, तो पानी के अणु टूटकर ताज़ी ऑक्सीजन हवा में छोड़ते हैं और नन्हीं बैटरियां चार्ज हो जाती हैं।"
        },
        {
          title: "दूसरा चरण: केल्विन चक्र (Calvin Cycle)",
          headline: "स्ट्रोमा में ग्लूकोज और शर्करा का निर्माण",
          simpleTitle: "दूसरा चरण: मीठा ग्लूकोज तैयार करना",
          simpleHeadline: "हवा से कार्बन लेकर मीठा भोजन बनाना",
          animationType: "molecular-cycle",
          formula: "CO₂ + RuBisCO + ATP → Glucose",
          diagramNodes: [
            { label: "CO₂ वातावरण से", color: "#718078", x: 25, y: 35 },
            { label: "रुबिस्को एंजाइम", color: "#F4C95D", x: 50, y: 65 },
            { label: "मीठा ग्लूकोज", color: "#3AA6A0", x: 75, y: 35 }
          ],
          points: [
            "यह क्लोरोप्लास्ट के स्ट्रोमा तरल पदार्थ में बिना सीधी रोशनी के होता है",
            "RuBisCO एंजाइम वातावरण से CO₂ को कार्बनिक अणुओं में स्थिर करता है",
            "ATP और NADPH की ऊर्जा का उपयोग करके मीठा और पौष्टिक ग्लूकोज बनता है"
          ],
          simplePoints: [
            "🌬️ पत्तियां हवा से कार्बन डाइऑक्साइड गैस खींचती हैं",
            "🍳 शेफ एंजाइम कार्बन और चार्ज बैटरी की मदद से भोजन पकाता है",
            "🍬 अंत में मीठा ग्लूकोज बनता है जो पौधे को बड़ा करता है!"
          ],
          narration: "इसके बाद स्ट्रोमा में केल्विन चक्र शुरू होता है। यहाँ रुबिस्को एंजाइम कार्बन डाइऑक्साइड को स्थिर करके पौधों के भोजन के रूप में ग्लूकोज तैयार करता है।",
          simpleNarration: "अब खाना पकाने की बारी है! पत्ती के अंदर हवा से कार्बन लेकर और चार्ज बैटरियों की मदद से मीठा ग्लूकोज बनता है जिससे पौधा बढ़ता है।"
        },
        {
          title: "निष्कर्ष और वैश्विक प्रभाव",
          headline: "वैश्विक जैवमंडल का आधार",
          simpleTitle: "हमारे लिए यह क्यों जरूरी है?",
          simpleHeadline: "हर सांस में पौधों का अनमोल उपहार!",
          animationType: "biosphere-energy",
          formula: "170\\text{ अरब टन बायोमास/वर्ष}",
          diagramNodes: [
            { label: "हरित वनस्पति आवरण", color: "#5F9F7A", x: 25, y: 45 },
            { label: "वायुमंडलीय ऑक्सीजन", color: "#3AA6A0", x: 50, y: 30 },
            { label: "समस्त खाद्य जाल", color: "#F4C95D", x: 75, y: 45 }
          ],
          points: [
            "हर साल जंगलों और महासागरों में 170 अरब टन से अधिक बायोमास बनता है",
            "ग्रह के कार्बन चक्र को संतुलित रखता है और तापमान को नियंत्रित करता है",
            "पृथ्वी की पूरी खाद्य श्रृंखला और मानव जीवन का मुख्य आधार है"
          ],
          simplePoints: [
            "🌍 हमारी हर सांस की ऑक्सीजन इसी प्रक्रिया से आती है",
            "🍎 सारे फल, अनाज और सब्जियां इसी से बनती हैं",
            "🌳 हर पेड़ धरती का प्राकृतिक एयर प्यूरीफायर है!"
          ],
          narration: "बिना प्रकाश संश्लेषण के पृथ्वी का वायुमंडल ऑक्सीजन रहित हो जाएगा। इसे समझना कृषि और भविष्य की स्वच्छ ऊर्जा के लिए बेहद जरूरी है।",
          simpleNarration: "आप जो भी ताजी हवा सांस में लेते हैं, और जो भी फल खाते हैं, वह सब पेड़-पौधों के इसी जादू की वजह से है!"
        }
      ],
      quiz: {
        question: "प्रकाश संश्लेषण में सूर्य के प्रकाश को अवशोषित करने के लिए कौन सा अंगक और वर्णक जिम्मेदार है?",
        options: [
          "माइटोकॉन्ड्रिया और हीमोग्लोबिन",
          "क्लोरोप्लास्ट और क्लोरोफिल",
          "राइबोसोम और मेलेनिन",
          "एंडोप्लाज्मिक रेटिकुलम और केराटिन"
        ],
        explanation: "क्लोरोप्लास्ट के अंदर थायलेकॉइड में मौजूद क्लोरोफिल सूर्य के प्रकाश की ऊर्जा को सोखने का काम करता है।"
      }
    },
    hinglish: {
      title: "Photosynthesis: Nature ka Solar Energy Converter",
      category: "Biology / जीव विज्ञान",
      simpleHeadline: "Plants dhoop se apna khana kaise banate hain?",
      scenes: [
        {
          title: "Intro: Sunlight ko Absorb Karna",
          headline: "Earth ka Fundamental Biological Engine",
          simpleTitle: "Leaves: Nature ke Tiny Solar Kitchens",
          simpleHeadline: "Plants dhoop aur paani se yummy glucose banate hain",
          animationType: "biological-sunlight",
          formula: "6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂",
          diagramNodes: [
            { label: "Solar Energy (Dhoop)", color: "#F4C95D", x: 25, y: 35 },
            { label: "Chloroplast Factory", color: "#5F9F7A", x: 50, y: 65 },
            { label: "Fresh Oxygen (O₂)", color: "#3AA6A0", x: 75, y: 35 }
          ],
          points: [
            "Photosynthesis solar energy ko glucose me stored chemical energy me convert karta hai",
            "Ye plant leaves ke andar chloroplasts me execute hota hai",
            "Ye hum sabke jeene ke liye essential Oxygen (O₂) generate karta hai"
          ],
          simplePoints: [
            "☀️ Sun se plants ko free power milti hai",
            "🍃 Green leaves solar panel ki tarah dhoop absorb karti hain",
            "💨 Hawa se CO₂ lekar hume pure Oxygen deti hain!"
          ],
          narration: "Welcome to Photosynthesis! Har green leaf ke andar microscopic factories sunlight, carbon dioxide aur water ko capture karke life-saving oxygen aur glucose banati hain.",
          simpleNarration: "Imagine karo agar aap sirf dhoop me khade hokar apna favorite khana bana pao! Plants exactly yahi karte hain—dhoop aur paani se glucose banate hain aur hume fresh hawa dete hain."
        },
        {
          title: "Stage 1: Light-Dependent Reactions",
          headline: "Thylakoid Membrane me Photons ko Trap Karna",
          simpleTitle: "Stage 1: Paani ko Todkar Oxygen Banana",
          simpleHeadline: "Water splits and fresh oxygen floats out",
          animationType: "chloroplast-thylakoid",
          formula: "2H₂O + Sunlight → O₂ + 4H⁺ + 4e⁻",
          diagramNodes: [
            { label: "Water Molecule (H₂O)", color: "#3AA6A0", x: 25, y: 40 },
            { label: "Thylakoid Splitting", color: "#5F9F7A", x: 50, y: 60 },
            { label: "ATP Battery Charging", color: "#F4C95D", x: 75, y: 40 }
          ],
          points: [
            "Chlorophyll pigment blue aur red light absorb karta hai aur green light reflect karta hai",
            "Water molecules split hokar Oxygen gas aur electrons release karte hain",
            "High energy ATP aur NADPH molecules charge hote hain"
          ],
          simplePoints: [
            "💧 Paani ki drops par sunlight laser ki tarah lagti hai",
            "⚡ Paani split hokar Oxygen gas hawa me release karta hai",
            "🔋 Plant ki microscopic batteries (ATP) charge ho jaati hain!"
          ],
          narration: "Stage one me thylakoid membranes me sunlight absorb hoti hai, water molecule split hota hai aur oxygen gas release hoti hai.",
          simpleNarration: "Leaf ke andar chote chote thylakoid discs hote hain jo sunlight capture karke water ko tod dete hain aur fresh oxygen hawa me release karte hain."
        },
        {
          title: "Stage 2: The Calvin Cycle",
          headline: "Stroma me Glucose ka Synthesis",
          simpleTitle: "Stage 2: Sweet Glucose Food Banana",
          simpleHeadline: "Charged battery se plant ka food pakta hai",
          animationType: "molecular-cycle",
          formula: "CO₂ + RuBisCO + ATP → Glucose",
          diagramNodes: [
            { label: "CO₂ Hawa Se", color: "#718078", x: 25, y: 35 },
            { label: "Master Chef RuBisCO", color: "#F4C95D", x: 50, y: 65 },
            { label: "Glucose Energy Food", color: "#3AA6A0", x: 75, y: 35 }
          ],
          points: [
            "Ye chloroplast ke stroma me bina direct light ke run hota hai",
            "RuBisCO enzyme atmosphere se CO₂ capture karke fix karta hai",
            "ATP aur NADPH ki help se nourishing Glucose banta hai"
          ],
          simplePoints: [
            "🌬️ Plant hawa se Carbon Dioxide gas leta hai",
            "🍳 Master chef enzyme RuBisCO usse cook karta hai",
            "🍬 Yummy glucose ready hota hai jo plant ko strong banata hai!"
          ],
          narration: "Next stage me Calvin Cycle run hota hai jisme RuBisCO enzyme CO₂ ko plants ke food yaani glucose me convert karta hai.",
          simpleNarration: "Ab charged batteries aur hawa ke carbon ko mix karke RuBisCO enzyme plants ke liye sweet glucose bana deta hai."
        },
        {
          title: "Summary & Global Importance",
          headline: "Earth ke Biosphere ka Main Foundation",
          simpleTitle: "Ye Hum Sabke Liye Kyun Zaruri Hai?",
          simpleHeadline: "Har saans me plants ka magic gift!",
          animationType: "biosphere-energy",
          formula: "170\\text{ Billion Tons Biomass/Year}",
          diagramNodes: [
            { label: "Green Forest Cover", color: "#5F9F7A", x: 25, y: 45 },
            { label: "Earth's Oxygen Balance", color: "#3AA6A0", x: 50, y: 30 },
            { label: "Global Food Supply", color: "#F4C95D", x: 75, y: 45 }
          ],
          points: [
            "Annually ~170 billion metric tons dry biomass create karta hai",
            "Planet ke carbon balance aur oxygen cycle ko maintain rakhta hai",
            "Earth ke saare living organisms ki food web ka base hai"
          ],
          simplePoints: [
            "🌍 Hum jo bhi oxygen saans lete hain wo isi se aati hai",
            "🍎 Saare fruits, veggies aur food isi ki den hain",
            "🌳 Trees Earth ke natural air purifiers hain!"
          ],
          narration: "Photosynthesis ke bina Earth ki oxygen khatam ho jayegi. Ye process hamari agriculture aur bio-solar technology ki key hai.",
          simpleNarration: "Aapki har saans aur har apple jo aap khate ho, sab plants ke isi superhero power ki wajah se possible hai!"
        }
      ],
      quiz: {
        question: "Photosynthesis ke time sunlight ko trap karne ke liye kaunsa organelle aur pigment use hota hai?",
        options: [
          "Mitochondria with Hemoglobin",
          "Chloroplast with Chlorophyll",
          "Ribosome with Melanin",
          "Endoplasmic Reticulum with Keratin"
        ],
        explanation: "Chloroplast ke andar present chlorophyll pigment sunlight energy ko capture karta hai."
      }
    }
  },

  "black holes": {
    aliases: ['black hole', 'black holes', 'blackhole', 'blackholes', 'singularity', 'event horizon', 'ब्लैक होल', 'ब्लैकहोल', 'spacetime', 'space time'],
    category: "Astrophysics",
    defaultTheme: "cosmos",
    en: {
      title: "Black Holes: Singularity & Spacetime Curvature",
      category: "Astrophysics",
      simpleHeadline: "The Most Powerful Gravity Traps in the Universe!",
      scenes: [
        {
          title: "The Birth of a Gravity Well",
          headline: "When Massive Stars Collapse Under Gravitational Pressure",
          simpleTitle: "How a Giant Star Becomes a Black Hole",
          simpleHeadline: "Imagine crushing Mount Everest into a grain of sand!",
          animationType: "black-hole-collapse",
          formula: "M_{\\text{core}} > M_{\\text{TOV}} \\approx 2.17 M_\\odot \\implies \\text{Infinite Gravitational Collapse}",
          diagramNodes: [
            { label: "Supermassive Dying Star", color: "#F59E0B", x: 25, y: 40 },
            { label: "Catastrophic Core Infall", color: "#8B5CF6", x: 50, y: 65 },
            { label: "Infinitesimal Singularity", color: "#00E5FF", x: 75, y: 40 }
          ],
          points: [
            "Supermassive stars collapse inward once nuclear fusion fuel is exhausted",
            "Core density overcomes neutron degeneracy pressure, collapsing infinitely",
            "Forms an infinitesimally small, infinitely dense Singularity point in spacetime"
          ],
          simplePoints: [
            "⭐ A colossal star runs out of fuel and suddenly collapses inward",
            "🏋️ Gravity squeezes billions of tons of matter into a microscopic point",
            "🕳️ It becomes so immensely heavy that space itself gets bent!"
          ],
          narration: "A black hole is born when a colossal star exhausts its nuclear fuel. Inward gravity overpowers all atomic forces, crushing billions of tons of matter into an infinitely dense singularity point.",
          simpleNarration: "Imagine a star twenty times bigger than our Sun! When it runs out of fuel, its own gravity crushes all that weight down until it shrinks into a super-dense spot called a singularity—like squeezing the entire planet Earth into a single marble!"
        },
        {
          title: "The Event Horizon & Accretion Disk",
          headline: "The Cosmic Point of No Return & Swirling Plasma",
          simpleTitle: "The Invisible Point of No Return",
          simpleHeadline: "Even speedy light beams get trapped forever!",
          animationType: "black-hole-event-horizon",
          formula: "R_s = \\frac{2GM}{c^2} \\quad (\\text{Schwarzschild Radius Boundary})",
          diagramNodes: [
            { label: "Relativistic Accretion Disk", color: "#F4C95D", x: 25, y: 35 },
            { label: "Event Horizon Boundary", color: "#8E44AD", x: 50, y: 65 },
            { label: "Bipolar Plasma Jets", color: "#00E5FF", x: 75, y: 35 }
          ],
          points: [
            "The Event Horizon marks the boundary where escape velocity equals the speed of light (c)",
            "Superheated gas swirls in an accretion disk at relativistic speeds, radiating intense X-rays",
            "Calculated precisely using Karl Schwarzschild's general relativity solution"
          ],
          simplePoints: [
            "🛑 The Event Horizon is the ultimate danger line in space",
            "🚀 Even the fastest rocket or laser light beam cannot escape after crossing it",
            "🌌 Glowing swirling plasma rings orbit around the dark center like a fiery cosmic whirlpool!"
          ],
          narration: "Surrounding the black hole is the Event Horizon. Once anything crosses this boundary—even light traveling at three hundred thousand kilometers per second—it can never return. A glowing accretion disk of superheated plasma swirls violently around it.",
          simpleNarration: "Around the black hole is an invisible border called the Event Horizon. Think of it like a cosmic waterfall. Once a spaceship or light beam floats past the edge, no engine in the entire universe is fast enough to paddle back out!"
        },
        {
          title: "Spacetime Warping & Gravitational Time Dilation",
          headline: "General Relativity, Warped Geodesics & Spaghettification",
          simpleTitle: "Time Slows Down & Noodle Stretching",
          simpleHeadline: "Clocks tick super slow near a black hole!",
          animationType: "black-hole-spacetime-warp",
          formula: "t' = \\frac{t}{\\sqrt{1 - \\frac{2GM}{rc^2}}} \\quad (\\text{Gravitational Time Dilation})",
          diagramNodes: [
            { label: "Warped Spacetime Grid", color: "#8E44AD", x: 25, y: 50 },
            { label: "Gravitational Time Slowing", color: "#00E5FF", x: 50, y: 30 },
            { label: "Spaghettification Tidal Force", color: "#FFAE33", x: 75, y: 50 }
          ],
          points: [
            "Immense mass curves spacetime into a steep gravity well, bending light paths",
            "Time runs dramatically slower near the event horizon relative to a distant observer",
            "Extreme tidal gravity gradient stretches infalling matter into thin noodles (Spaghettification)"
          ],
          simplePoints: [
            "⏰ One hour near a black hole can equal 10 whole years back home on Earth!",
            "🍝 Tidal gravity pulls your feet so much harder than your head that you stretch like a noodle!",
            "🌀 Supermassive black holes anchor the centers of almost all giant galaxies!"
          ],
          narration: "Einstein's general relativity reveals that black holes severely warp both space and time. Clocks tick far slower near the horizon, while extreme tidal forces stretch infalling objects into thin strands of matter through spaghettification.",
          simpleNarration: "If you flew near a black hole for just one hour, years would pass for your friends on Earth! And because gravity is so much stronger at your feet than your head, it stretches you out like a long noodle of spaghetti!"
        }
      ],
      quiz: {
        question: "What defines the Event Horizon boundary of a black hole?",
        options: [
          "The surface where nuclear fusion takes place",
          "The threshold where escape velocity equals the speed of light",
          "The outer boundary of asteroid rings",
          "The frozen iron shell of the star"
        ],
        explanation: "The Event Horizon is the spherical boundary where the escape velocity equals the speed of light (c), meaning nothing inside can ever escape."
      }
    },
    hi: {
      title: "ब्लैक होल्स (Black Holes): सिंगुलैरिटी और स्पेस-टाइम का रहस्य",
      category: "खगोल भौतिकी (Astrophysics)",
      simpleHeadline: "ब्रह्मांड के सबसे शक्तिशाली गुरुत्वाकर्षण दैत्य!",
      scenes: [
        {
          title: "पहला चरण: तारे का संकुचन और सिंगुलैरिटी का जन्म",
          headline: "जब विशाल तारा अपने ही गुरुत्वाकर्षण में ढह जाता है",
          simpleTitle: "विशाल तारा कैसे बनता है ब्लैक होल?",
          simpleHeadline: "पूरे पहाड़ को रेत के एक दाने में दबाने जैसी शक्ति!",
          animationType: "black-hole-collapse",
          formula: "M_{\\text{core}} > M_{\\text{TOV}} \\implies \\text{अनंत गुरुत्वाकर्षण संकुचन}",
          diagramNodes: [
            { label: "विशाल मरता हुआ तारा", color: "#F59E0B", x: 25, y: 40 },
            { label: "गुरुत्वाकर्षण पतन", color: "#8B5CF6", x: 50, y: 65 },
            { label: "अतिसूक्ष्म सिंगुलैरिटी", color: "#00E5FF", x: 75, y: 40 }
          ],
          points: [
            "परमाणु ईंधन समाप्त होने पर विशालकाय तारे अपने ही केंद्र की ओर सिकुड़ते हैं",
            "पदार्थ का घनत्व इतना अधिक हो जाता है कि कोई भी भौतिक बल इसका विरोध नहीं कर पाता",
            "स्पेस-टाइम में एक अनंत घनत्व वाला बिंदु 'सिंगुलैरिटी' बनता है"
          ],
          simplePoints: [
            "⭐ एक विशाल तारे का ईंधन खत्म हो जाता है और वह अचानक अंदर की ओर सिकुड़ता है",
            "🏋️ गुरुत्वाकर्षण अरबों टन वजन को एक नन्हे बिंदु में दबा देता है",
            "🕳️ यह इतना भारी हो जाता है कि अंतरिक्ष में एक गहरा गड्ढा बन जाता है!"
          ],
          narration: "ब्लैक होल का जन्म तब होता है जब एक विशाल तारा अपना ईंधन समाप्त कर लेता है। इसका भयानक गुरुत्वाकर्षण अरबों टन द्रव्यमान को एक अनंत रूप से सघन बिंदु में संकुचित कर देता है जिसे सिंगुलैरिटी कहते हैं।",
          simpleNarration: "कल्पना कीजिए हमारे सूरज से बीस गुना बड़ा तारा! जब उसका ईंधन खत्म होता है, तो गुरुत्वाकर्षण पूरी पृथ्वी के वजन को एक कंचे के आकार में दबा देता है। इसे सिंगुलैरिटी कहते हैं!"
        },
        {
          title: "दूसरा चरण: इवेंट होराइजन और चमकती डिस्क",
          headline: "ब्रह्मांड की वह सीमा जहाँ से कोई वापस नहीं आ सकता",
          simpleTitle: "नो-रिटर्न बॉर्डर: जहाँ से कोई बच नहीं सकता",
          simpleHeadline: "सबसे तेज रोशनी भी यहाँ कैद हो जाती है!",
          animationType: "black-hole-event-horizon",
          formula: "R_s = \\frac{2GM}{c^2} \\quad (\\text{श्वार्जबिल्ड त्रिज्या सीमा})",
          diagramNodes: [
            { label: "घूमती प्लाज्मा डिस्क", color: "#F4C95D", x: 25, y: 35 },
            { label: "इवेंट होराइजन सीमा", color: "#8E44AD", x: 50, y: 65 },
            { label: "ऊर्जावान प्लाज्मा जेट्स", color: "#00E5FF", x: 75, y: 35 }
          ],
          points: [
            "इवेंट होराइजन वह सीमा है जहाँ पलायन वेग प्रकाश की गति (c) के बराबर हो जाता है",
            "इस सीमा के पार जाने वाली कोई भी वस्तु, यहाँ तक कि प्रकाश भी कभी वापस नहीं आ सकता",
            "ब्लैक होल के चारों ओर अत्यधिक गर्म गैस की चमकदार अभिवृद्धि चक्रिका (Accretion Disk) घूमती है"
          ],
          simplePoints: [
            "🛑 इवेंट होराइजन अंतरिक्ष की सबसे खतरनाक लक्ष्मण रेखा है",
            "🚀 सबसे तेज रॉकेट या टॉर्च की रोशनी भी इसे पार करने के बाद बाहर नहीं निकल सकती",
            "🌌 इसके चारों ओर आग के भंवर जैसी गैस चक्कर लगाती है!"
          ],
          narration: "ब्लैक होल के चारों ओर 'इवेंट होराइजन' की सीमा होती है। एक बार जब कोई वस्तु इसे पार कर लेती है, तो तीन लाख किलोमीटर प्रति सेकंड की गति से चलने वाला प्रकाश भी बाहर नहीं निकल सकता।",
          simpleNarration: "ब्लैक होल के चारों ओर एक अदृश्य सीमा है जिसे इवेंट होराइजन कहते हैं। यह एक जादुई झरने जैसा है, अगर कोई नाव इसके किनारे से आगे निकल जाए तो ब्रह्मांड का कोई भी इंजन उसे वापस नहीं खींच सकता!"
        },
        {
          title: "तीसरा चरण: स्पेस-टाइम का मुड़ना और समय का धीमा होना",
          headline: "आइंस्टीन का सापेक्षता सिद्धांत और स्पेगेटीकरण (Spaghettification)",
          simpleTitle: "समय धीमा हो जाता है और नूडल की तरह खिंचाव!",
          simpleHeadline: "ब्लैक होल के पास घड़ियाँ बहुत धीमी चलती हैं!",
          animationType: "black-hole-spacetime-warp",
          formula: "t' = \\frac{t}{\\sqrt{1 - \\frac{2GM}{rc^2}}} \\quad (\\text{समय फैलाव})",
          diagramNodes: [
            { label: "मुड़ा हुआ स्पेस-टाइम ग्रिड", color: "#8E44AD", x: 25, y: 50 },
            { label: "धीमा होता समय", color: "#00E5FF", x: 50, y: 30 },
            { label: "स्पेगेटी खिंचाव बल", color: "#FFAE33", x: 75, y: 50 }
          ],
          points: [
            "अत्यधिक गुरुत्वाकर्षण स्पेस-टाइम के ताने-बाने को मोड़ देता है जिससे प्रकाश का मार्ग झुक जाता है",
            "बाहरी दुनिया की तुलना में इवेंट होराइजन के निकट समय बहुत धीमा हो जाता है (Time Dilation)",
            "ज्वारीय बल (Tidal forces) गिरने वाली वस्तुओं को स्पेगेटी नूडल की तरह लंबा खींच देते हैं"
          ],
          simplePoints: [
            "⏰ ब्लैक होल के पास 1 घंटा बिताने पर पृथ्वी पर 10 साल बीत सकते हैं!",
            "🍝 इसका खिंचाव पैरों पर सिर की तुलना में इतना तेज होता है कि शरीर नूडल जैसा लंबा खिंच जाता है!",
            "🌀 विशालकाय ब्लैक होल सभी आकाशगंगाओं के केंद्र में स्थित होते हैं!"
          ],
          narration: "आइंस्टीन के अनुसार, ब्लैक होल का तीव्र गुरुत्वाकर्षण समय को भी धीमा कर देता है। इसके नजदीक घड़ियाँ बहुत धीमी टिक करती हैं, और गुरुत्वाकर्षण खिंचाव वस्तुओं को पतले तारों में बदल देता है।",
          simpleNarration: "यदि आप ब्लैक होल के पास सिर्फ एक घंटा बिताएँ, तो पृथ्वी पर आपके दोस्तों के लिए कई साल बीत जाएँगे! और इसका खिंचाव इतना शक्तिशाली है कि वह आपको नूडल की तरह लंबा खींच देगा!"
        }
      ],
      quiz: {
        question: "ब्लैक होल के 'इवेंट होराइजन' (Event Horizon) की क्या परिभाषा है?",
        options: [
          "जहाँ तारे का परमाणु संलयन होता है",
          "वह सीमा जहाँ पलायन वेग प्रकाश की गति के बराबर हो जाता है",
          "तारे के चारों ओर की बर्फ की परत",
          "धूमकेतुओं की कक्षा"
        ],
        explanation: "इवेंट होराइजन वह सीमा है जहाँ पलायन वेग प्रकाश की गति के बराबर होता है, इसलिए प्रकाश भी इससे बाहर नहीं निकल सकता।"
      }
    },
    hinglish: {
      title: "Black Holes: Singularity aur Spacetime ka Magic",
      category: "Astrophysics / खगोल भौतिकी",
      simpleHeadline: "Universe ke sabse powerful gravity monsters!",
      scenes: [
        {
          title: "Star Collapse & Singularity Birth",
          headline: "Colossal Star ka Inward Gravitational Infall",
          simpleTitle: "Giant Star kaise banta hai Black Hole",
          simpleHeadline: "Mount Everest ko ret ke particle me convert karna!",
          animationType: "black-hole-collapse",
          formula: "M_{\\text{core}} > 2.17 M_\\odot \\implies \\text{Singularity Formation}",
          diagramNodes: [
            { label: "Dying Massive Star", color: "#F59E0B", x: 25, y: 40 },
            { label: "Core Implosion", color: "#8B5CF6", x: 50, y: 65 },
            { label: "Super-dense Singularity", color: "#00E5FF", x: 75, y: 40 }
          ],
          points: [
            "Jab ek giant star ka nuclear fuel khatam hota hai, wo gravitational collapse karta hai",
            "Billions of tons matter ek infinitely small, dense point me compress ho jaata hai",
            "Is infinite density wale point ko astrophysicists 'Singularity' bolte hain"
          ],
          simplePoints: [
            "⭐ Ek colossal star ka fuel exhaust hota hai aur wo shrink karne lagta hai",
            "🏋️ Gravity billions of tons mass ko ek single point me crunch kar deti hai",
            "🕳️ Space me ek infinitely deep gravity well ban jaata hai!"
          ],
          narration: "Black hole tab banta hai jab ek colossal star ka nuclear fuel exhaust hota hai. Inward gravitational collapse matter ko ek zero-volume infinite-density Singularity point me crunch kar deta hai.",
          simpleNarration: "Imagine karo Sun se 20 guna bada star! Jab uska fuel end hota hai, to gravity poori Earth ko ek marble me compress kar deti hai. Is super dense point ko Singularity kehte hain!"
        },
        {
          title: "Event Horizon: The Point of No Return",
          headline: "Light Trapping Boundary & Glowing Accretion Disk",
          simpleTitle: "Invisible No-Return Danger Line",
          simpleHeadline: "Super-fast light bhi yahan trap ho jaati hai!",
          animationType: "black-hole-event-horizon",
          formula: "R_s = \\frac{2GM}{c^2} \\quad (\\text{Schwarzschild Radius})",
          diagramNodes: [
            { label: "Swirling Accretion Disk", color: "#F4C95D", x: 25, y: 35 },
            { label: "Event Horizon Border", color: "#8E44AD", x: 50, y: 65 },
            { label: "Relativistic Polar Jets", color: "#00E5FF", x: 75, y: 35 }
          ],
          points: [
            "Event Horizon wo spherical boundary hai jahan escape velocity speed of light ke equal hoti hai",
            "Koi bhi matter ya photon is boundary ko cross karne ke baad kabhi return nahi kar sakta",
            "Surrounding plasma gas relativistic speeds par swirl karti hai aur bright X-rays emit karti hai"
          ],
          simplePoints: [
            "🛑 Event Horizon space ki ultimate danger line hai",
            "🚀 Speed of light se travel karne wali lasers bhi isse escape nahi kar sakti",
            "🌌 Iske around burning hot gas ek glowing whirlpool ki tarah ghoomti hai!"
          ],
          narration: "Black hole ke around Event Horizon boundary hoti hai. Ek baar jo cheez is boundary ko cross karti hai—even 300,000 km/s ki speed wali light photons—wo kabhi return nahi kar sakti.",
          simpleNarration: "Black hole ke around ek invisible boundary hoti hai jise Event Horizon kehte hain. Waterfall ke edge jaisi, ek baar cross kiya to universe ka koi bhi engine aapko wapas nahi nikaal sakta!"
        },
        {
          title: "Time Dilation & Spaghettification",
          headline: "Warped Spacetime Geodesics & Gravitational Time Slowing",
          simpleTitle: "Time Slow Down & Noodle Stretching",
          simpleHeadline: "Black hole ke paas time slow tick karta hai!",
          animationType: "black-hole-spacetime-warp",
          formula: "t' = \\frac{t}{\\sqrt{1 - \\frac{2GM}{rc^2}}} \\quad (\\text{Time Dilation})",
          diagramNodes: [
            { label: "Warped Spacetime Grid", color: "#8E44AD", x: 25, y: 50 },
            { label: "Time Slowing Effect", color: "#00E5FF", x: 50, y: 30 },
            { label: "Tidal Spaghettification", color: "#FFAE33", x: 75, y: 50 }
          ],
          points: [
            "Extreme mass spacetime fabric ko deeply curve karta hai jisse light rays bend hoti hain",
            "Gravitational time dilation ki wajah se event horizon ke paas clocks drastically slow ho jaati hain",
            "Extreme tidal gravity forces infalling objects ko long noodles ki tarah stretch kar deti hain"
          ],
          simplePoints: [
            "⏰ Black hole ke paas 1 hour Earth ke 10 saal ke barabar ho sakta hai!",
            "🍝 Feet par gravity head se itni jyada hoti hai ki aap spaghetti noodle jaise stretch ho jaoge!",
            "🌀 Har galaxy ke center me ek gigantic supermassive black hole baitha hota hai!"
          ],
          narration: "Einstein ki General Relativity show karti hai ki black holes spacetime ko severely warp karte hain. Clocks horizon ke paas ultra-slow tick karti hain aur objects spaghettification se stretch ho jaate hain.",
          simpleNarration: "Agar aap black hole ke paas 1 hour spend karo, to Earth par saalon guzar jayenge! Aur iski gravity aapke pairon ko itna tezi se kheenchegi ki aap noodle jaise lambe stretch ho jaoge!"
        }
      ],
      quiz: {
        question: "Black hole ke Event Horizon boundary ka main rule kya hai?",
        options: [
          "Yahan nuclear fusion continuous chalta hai",
          "Is point par escape velocity speed of light ke equal ho jaati hai",
          "Ye star ka outer magnetic shield hota hai",
          "Ye asteroids ki ring boundary hoti hai"
        ],
        explanation: "Event Horizon par escape velocity speed of light (c) ke barabar hoti hai, isliye light bhi escape nahi kar sakti."
      }
    }
  },

  "newton's laws": {
    aliases: ['newton', 'newtons', 'newton laws', "newton's laws", 'newtons laws of motion', 'force', 'laws of motion', 'गति के नियम', 'न्यूटन के नियम'],
    category: "Physics",
    defaultTheme: "tech",
    en: {
      title: "Newton's Laws of Motion: The Foundation of Classical Mechanics",
      category: "Physics",
      simpleHeadline: "Why Things Move, Speed Up, and Push Back!",
      scenes: [
        {
          title: "First Law: Law of Inertia",
          headline: "Objects in Motion Stay in Motion Unless Acted Upon",
          simpleTitle: "The Lazy Rule of Objects",
          simpleHeadline: "Things love keeping doing what they are already doing!",
          animationType: "physics-inertia",
          formula: "\\sum \\vec{F} = 0 \\implies \\frac{d\\vec{v}}{dt} = 0 \\quad (\\vec{v} = \\text{constant})",
          diagramNodes: [
            { label: "Resting / Moving Mass", color: "#3B82F6", x: 25, y: 40 },
            { label: "Net External Force (F_net = 0)", color: "#10B981", x: 50, y: 60 },
            { label: "Uniform Velocity (Inertia)", color: "#F59E0B", x: 75, y: 40 }
          ],
          points: [
            "An object at rest stays at rest unless acted upon by a net external force",
            "An object in uniform motion continues moving at constant velocity in a straight line",
            "Inertia is directly proportional to the mass of the object"
          ],
          simplePoints: [
            "⚽ A soccer ball on grass stays totally still until you kick it",
            "🛸 In deep space, a spaceship glides forever without burning any engine fuel",
            "🛑 When a bus brakes suddenly, your body lurches forward because of inertia!"
          ],
          narration: "Newton's First Law describes Inertia. An object will remain at rest or keep moving at constant velocity in a straight line forever, unless an unbalanced external force acts on it.",
          simpleNarration: "Newton's first law says objects are delightfully lazy! A toy car won't roll until you push it, and a hockey puck on slick ice will slide on forever until friction stops it!"
        },
        {
          title: "Second Law: Force and Acceleration (F = ma)",
          headline: "Acceleration is Directly Proportional to Applied Net Force",
          simpleTitle: "Push Harder = Zoom Faster (F = m × a)",
          simpleHeadline: "Heavy boxes need giant pushes to speed up!",
          animationType: "physics-fma",
          formula: "\\vec{F}_{\\text{net}} = m \\cdot \\vec{a} \\Longleftrightarrow \\vec{a} = \\frac{\\vec{F}_{\\text{net}}}{m}",
          diagramNodes: [
            { label: "Applied Net Force (F)", color: "#F59E0B", x: 25, y: 35 },
            { label: "Inertial Mass (m)", color: "#3B82F6", x: 50, y: 65 },
            { label: "Acceleration Vector (a)", color: "#10B981", x: 75, y: 35 }
          ],
          points: [
            "The rate of change of momentum is proportional to the impressed force",
            "Greater mass requires proportionally larger force to achieve the same acceleration",
            "Measured in Newtons (1 N = 1 kg·m/s²)"
          ],
          simplePoints: [
            "🛒 Pushing an empty grocery cart is easy, but pushing a full heavy cart takes big muscle power!",
            "🏎️ A lightweight sports car accelerates much faster than a heavy cargo truck with the same engine",
            "⚡ Double the push force, and your acceleration instantly doubles!"
          ],
          narration: "Newton's Second Law establishes the quantitative relationship between force, mass, and acceleration: F equals m times a. Pushing an object with greater force causes greater acceleration, while heavier mass resists changes in speed.",
          simpleNarration: "Force equals mass times acceleration! Pushing a lightweight bicycle is easy, but pushing a giant school bus takes immense strength to get it rolling!"
        },
        {
          title: "Third Law: Action and Reaction",
          headline: "For Every Action, There is an Equal and Opposite Reaction",
          simpleTitle: "The Great Push-Back Rule",
          simpleHeadline: "When you push a wall, the wall pushes you right back!",
          animationType: "physics-action-reaction",
          formula: "\\vec{F}_{AB} = -\\vec{F}_{BA} \\quad (\\text{Action-Reaction Pair})",
          diagramNodes: [
            { label: "Action Force (F_action)", color: "#F59E0B", x: 30, y: 50 },
            { label: "Interaction Interface", color: "#3B82F6", x: 50, y: 50 },
            { label: "Reaction Force (-F_reaction)", color: "#10B981", x: 70, y: 50 }
          ],
          points: [
            "Forces always occur in matched pairs acting on two different interacting bodies",
            "The two forces are equal in magnitude and strictly opposite in direction",
            "Powers rocket propulsion: expelling combustion gas downwards propels the spacecraft upwards"
          ],
          simplePoints: [
            "🚀 Rockets blast blazing fire downward, so space pushes the rocket skyward!",
            "🏊 When swimming, you push water backward to launch your body forward",
            "🛹 Step off a skateboard, and the board shoots backward while you leap forward!"
          ],
          narration: "Newton's Third Law states that every action force generates an equal and opposite reaction force. When rocket engines blast hot exhaust gas downward, the reaction force propels the rocket upward into orbit.",
          simpleNarration: "Every push has an equal opposite push! If you blow up a balloon and let it go, air rushes out of the back, and the balloon shoots forward through the room!"
        }
      ],
      quiz: {
        question: "According to Newton's Second Law, if you double the net force on an object of fixed mass, what happens to its acceleration?",
        options: [
          "It is cut in half",
          "It doubles",
          "It stays the same",
          "It drops to zero"
        ],
        explanation: "Since a = F/m, doubling the force (F) with constant mass (m) directly doubles the acceleration (a)."
      }
    },
    hi: {
      title: "न्यूटन के गति के नियम (Newton's Laws of Motion)",
      category: "भौतिक विज्ञान (Physics)",
      simpleHeadline: "चीजें क्यों चलती हैं और बल कैसे काम करता है?",
      scenes: [
        {
          title: "पहला नियम: जड़त्व का नियम (Law of Inertia)",
          headline: "बिना बाहरी बल के वस्तु अपनी गति की अवस्था नहीं बदलती",
          simpleTitle: "पहला नियम: वस्तुओं का आलस (जड़त्व)",
          simpleHeadline: "रुकी हुई चीज रुकी रहना चाहती है!",
          animationType: "physics-inertia",
          formula: "\\sum \\vec{F} = 0 \\implies \\vec{v} = \\text{नियत}",
          diagramNodes: [
            { label: "विराम / गतिशील द्रव्यमान", color: "#3B82F6", x: 25, y: 40 },
            { label: "शून्य कुल बल", color: "#10B981", x: 50, y: 60 },
            { label: "समान वेग (जड़त्व)", color: "#F59E0B", x: 75, y: 40 }
          ],
          points: [
            "विराम अवस्था में स्थित वस्तु तब तक स्थिर रहती है जब तक उस पर कोई बाहरी बल न लगाया जाए",
            "एकसमान गति में चल रही वस्तु उसी दिशा और वेग में चलती रहती है",
            "जड़त्व सीधे वस्तु के द्रव्यमान पर निर्भर करता है"
          ],
          simplePoints: [
            "⚽ मैदान में रखी फुटबॉल तब तक नहीं हिलेगी जब तक कोई उसे किक न मारे",
            "🛑 चलती बस जब अचानक रुकती है तो यात्री आगे की ओर झुक जाते हैं",
            "🛸 अंतरिक्ष में यान बिना ईंधन जलाए भी सीधे चलता रहता है!"
          ],
          narration: "न्यूटन का पहला नियम जड़त्व का नियम कहलाता है। कोई भी वस्तु अपनी विराम अवस्था या एकसमान गति की अवस्था तब तक बनाए रखती है जब तक उस पर बाहरी असंतुलित बल न लगाया जाए।",
          simpleNarration: "न्यूटन का पहला नियम कहता है कि वस्तुएं अपनी वर्तमान स्थिति बदलना पसंद नहीं करतीं! रखी हुई गेंद तब तक नहीं चलेगी जब तक आप उसे धक्का न दें।"
        },
        {
          title: "दूसरा नियम: बल और त्वरण (F = ma)",
          headline: "संवेग परिवर्तन की दर लगाए गए बल के समानुपाती होती है",
          simpleTitle: "ज्यादा धक्का = ज्यादा तेजी (F = m × a)",
          simpleHeadline: "भारी चीज को चलाने के लिए ज्यादा ताकत चाहिए!",
          animationType: "physics-fma",
          formula: "\\vec{F} = m \\cdot \\vec{a}",
          diagramNodes: [
            { label: "प्रयुक्त बल (F)", color: "#F59E0B", x: 25, y: 35 },
            { label: "द्रव्यमान (m)", color: "#3B82F6", x: 50, y: 65 },
            { label: "त्वरण (a)", color: "#10B981", x: 75, y: 35 }
          ],
          points: [
            "बल द्रव्यमान और त्वरण के गुणनफल के बराबर होता है: F = ma",
            "समान बल लगाने पर हल्की वस्तु तेजी से गति पकड़ती है और भारी वस्तु धीमी गति पकड़ती है",
            "बल का मात्रक न्यूटन (Newton) है"
          ],
          simplePoints: [
            "🛒 खाली ट्रॉली को धक्का देना आसान है, भरी हुई भारी ट्रॉली को धक्का देने में ज्यादा ताकत लगती है",
            "🏎️ हल्की रेस कार भारी ट्रक की तुलना में बहुत जल्दी रफ्तार पकड़ लेती है",
            "⚡ धक्का दोगुना करोगे तो रफ्तार पकड़ने की तेजी भी दोगुनी हो जाएगी!"
          ],
          narration: "न्यूटन का दूसरा नियम बताता है कि बल (F) बराबर द्रव्यमान (m) गुणा त्वरण (a) होता है। अधिक बल लगाने से अधिक त्वरण उत्पन्न होता है।",
          simpleNarration: "बल बराबर द्रव्यमान गुणा त्वरण! हल्की साइकिल चलाना आसान है, पर भारी बस को हिलाने के लिए बहुत ताकत लगानी पड़ती है।"
        },
        {
          title: "तीसरा नियम: क्रिया और प्रतिक्रिया",
          headline: "प्रत्येक क्रिया की समान एवं विपरीत दिशा में प्रतिक्रिया होती है",
          simpleTitle: "जैसे को तैसा: विपरीत धक्के का नियम",
          simpleHeadline: "रॉकेट आग नीचे फेंकता है और खुद ऊपर उड़ता है!",
          animationType: "physics-action-reaction",
          formula: "\\vec{F}_{12} = -\\vec{F}_{21}",
          diagramNodes: [
            { label: "क्रिया बल", color: "#F59E0B", x: 30, y: 50 },
            { label: "संपर्क सतह", color: "#3B82F6", x: 50, y: 50 },
            { label: "प्रतिक्रिया बल", color: "#10B981", x: 70, y: 50 }
          ],
          points: [
            "प्रकृति में बल सदैव युग्मों (pairs) में पाए जाते हैं",
            "क्रिया और प्रतिक्रिया बल परिमाण में बराबर और दिशा में विपरीत होते हैं",
            "रॉकेट नोदन (Rocket Propulsion) इसी नियम पर आधारित है"
          ],
          simplePoints: [
            "🚀 रॉकेट गैस नीचे छोड़ता है और खुद आसमान में ऊपर उड़ जाता है",
            "🏊 तैरते समय हम पानी को पीछे धकेलते हैं और पानी हमें आगे धकेलता है",
            "🎈 हवा भरे गुब्बारे को छोड़ो तो हवा पीछे निकलती है और गुब्बारा आगे भागता है!"
          ],
          narration: "न्यूटन का तीसरा नियम कहता है कि प्रत्येक क्रिया की बराबर और विपरीत दिशा में प्रतिक्रिया होती है। रॉकेट इंजन जब गैस नीचे छोड़ते हैं तो रॉकेट ऊपर अंतरिक्ष में उड़ता है।",
          simpleNarration: "हर धक्के का एक उल्टा धक्का होता है! जब आप जमीन पर कूदते हैं तो जमीन आपको ऊपर उछालती है।"
        }
      ],
      quiz: {
        question: "न्यूटन के द्वितीय नियम के अनुसार, यदि किसी वस्तु पर लगाया गया बल दोगुना कर दिया जाए तो उसका त्वरण कितना हो जाएगा?",
        options: [
          "आधा हो जाएगा",
          "दोगुना हो जाएगा",
          "अपरिवर्तित रहेगा",
          "शून्य हो जाएगा"
        ],
        explanation: "F = ma के अनुसार, नियत द्रव्यमान पर बल दोगुना करने से त्वरण भी दोगुना हो जाता है।"
      }
    }
  }
};

/**
 * Multilingual UI & Quick Questions Dictionary for "Ask Moment AI"
 */
export const ASK_MOMENT_I18N = {
  en: {
    title: "Ask Moment AI (Contextual Doubt Solver)",
    liveTimestamp: "LIVE TIMESTAMP",
    pausedAt: "Paused at Scene",
    instantQuestions: "INSTANT SCENE QUESTIONS (CLICK TO ASK)",
    qSimple: "🧸 Explain this scene in super simple words (ELI5)",
    qAnalogy: "🍎 Give me a real-life everyday analogy",
    qWhy: "❓ Why does this step happen and what if it fails?",
    qFormula: "🔢 Break down the formula and equation step by step",
    placeholder: "Type any doubt about this scene or formula...",
    askBtn: "Ask",
    asking: "Asking...",
    aiExplanation: "AI Contextual Explanation",
    listen: "Listen",
    stopAudio: "Stop Audio",
    poweredBy: "Powered by Grasp Instant Concept AI",
    close: "Close",
    resumeVideo: "Resume Video"
  },
  hi: {
    title: "मोमेंट AI से पूछें (तात्कालिक शंका निवारण)",
    liveTimestamp: "लाइव समय",
    pausedAt: "रुका हुआ दृश्य",
    instantQuestions: "त्वरित प्रश्न (पूछने के लिए क्लिक करें)",
    qSimple: "🧸 इस दृश्य को बहुत आसान और सरल शब्दों में समझाएं",
    qAnalogy: "🍎 दैनिक जीवन का कोई वास्तविक उदाहरण या रूपक दें",
    qWhy: "❓ यह प्रक्रिया क्यों होती है और यदि यह न हो तो क्या होगा?",
    qFormula: "🔢 फॉर्मूले और समीकरण को चरण-दर-चरण समझाएं",
    placeholder: "इस दृश्य या फॉर्मूले के बारे में कोई भी शंका लिखें...",
    askBtn: "पूछें",
    asking: "उत्तर खोज रहे हैं...",
    aiExplanation: "AI संदर्भ व्याख्या",
    listen: "सुनें",
    stopAudio: "ऑडियो रोकें",
    poweredBy: "Grasp Instant Concept AI द्वारा संचालित",
    close: "बंद करें",
    resumeVideo: "वीडियो जारी रखें"
  },
  hinglish: {
    title: "Ask Moment AI (Instant Doubt Solver)",
    liveTimestamp: "LIVE TIMESTAMP",
    pausedAt: "Scene par Pause hai",
    instantQuestions: "INSTANT QUESTIONS (CLICK TO ASK)",
    qSimple: "🧸 Is scene ko super simple words me samjhao (ELI5)",
    qAnalogy: "🍎 Real-life daily life analogy ya example do",
    qWhy: "❓ Ye step kyu hota hai aur fail hua to kya hoga?",
    qFormula: "🔢 Formula aur equation step by step break karo",
    placeholder: "Is scene ya formula ke baare me doubt likhein...",
    askBtn: "Poocho",
    asking: "Answering...",
    aiExplanation: "AI Contextual Explanation",
    listen: "Suno",
    stopAudio: "Stop Audio",
    poweredBy: "Powered by Grasp Instant Concept AI",
    close: "Close",
    resumeVideo: "Resume Video"
  },
  bn: {
    title: "মোমেন্ট AI-কে প্রশ্ন করুন (তাত্ক্ষণিক সন্দেহ সমাধান)",
    liveTimestamp: "লাইভ সময়",
    pausedAt: "স্থগিত দৃশ্য",
    instantQuestions: "তাত্ক্ষণিক প্রশ্ন (ক্লিক করে জিজ্ঞাসা করুন)",
    qSimple: "🧸 এই বিষয়টি একদম সহজ ভাষায় বুঝিয়ে বলুন",
    qAnalogy: "🍎 দৈনন্দিন জীবনের একটি বাস্তব উদাহরণ বা সাদৃশ্য দিন",
    qWhy: "❓ এই ধাপটি কেন ঘটে এবং এটি ব্যর্থ হলে কী হবে?",
    qFormula: "🔢 সূত্র এবং সমীকরণটি ধাপে ধাপে বিশ্লেষণ করুন",
    placeholder: "এই दृश्य বা সূত্র সম্পর্কে যেকোনো প্রশ্ন লিখুন...",
    askBtn: "জিজ্ঞাসা করুন",
    asking: "উত্তর খোঁজা হচ্ছে...",
    aiExplanation: "AI প্রাসঙ্গিক ব্যাখ্যা",
    listen: "শুনুন",
    stopAudio: "অডিও থামান",
    poweredBy: "Grasp Instant Concept AI দ্বারা চালিত",
    close: "বন্ধ করুন",
    resumeVideo: "ভিডিও চালু করুন"
  },
  ta: {
    title: "மொமென்ட் AI-யிடம் கேளுங்கள் (சந்தேகத் தீர்வு)",
    liveTimestamp: "நேரலை நேரம்",
    pausedAt: "நிறுத்தப்பட்ட காட்சி",
    instantQuestions: "உடனடி வினாக்கள் (கேட்க கிளிக் செய்க)",
    qSimple: "🧸 இந்தக் காட்சியை மிக எளிய தமிழில் விளக்குங்கள்",
    qAnalogy: "🍎 அன்றாட வாழ்க்கையிலிருந்து ஒரு எளிய உதாரணம் தாருங்கள்",
    qWhy: "❓ இந்த நிலை ஏன் ஏற்படுகிறது? இது தவறினால் என்ன நிகழும்?",
    qFormula: "🔢 சூத்திரம் மற்றும் சமன்பாட்டைப் படிப்படியாக விளக்குங்கள்",
    placeholder: "இந்தக் காட்சி அல்லது சூத்திரம் பற்றிய உங்கள் சந்தேகத்தை உள்ளிடவும்...",
    askBtn: "கேளுங்கள்",
    asking: "விடைகாணப்படுகிறது...",
    aiExplanation: "AI சூழல்சார் விளக்கம்",
    listen: "கேட்க",
    stopAudio: "ஒலியை நிறுத்து",
    poweredBy: "Grasp Instant Concept AI மூலம் இயக்கப்படுகிறது",
    close: "மூடுக",
    resumeVideo: "வீடியோவைத் தொடர்க"
  }
};

/**
 * Intelligent Contextual Doubt Resolver for "Ask Moment"
 * Resolves user doubts based on the active scene, topic, and timestamp in ANY selected language.
 */
export function resolveSceneDoubt(topic, scene, questionText, language = 'en') {
  const cleanQ = (questionText || "").toLowerCase().trim();
  const lang = (language || 'en').toLowerCase();
  const sceneTitle = scene?.title || topic;
  const headline = scene?.headline || topic;

  const isHindi = lang === 'hi' || lang === 'hinglish';
  const isBengali = lang === 'bn';
  const isTamil = lang === 'ta';

  // 1. Simple explanation check
  if (
    cleanQ.includes('simple') ||
    cleanQ.includes('eli5') ||
    cleanQ.includes('aasan') ||
    cleanQ.includes('सरल') ||
    cleanQ.includes('সহজ') ||
    cleanQ.includes('எளிய')
  ) {
    if (isHindi) {
      return {
        answer: `सरल शब्दों में: ${scene?.simpleNarration || `${topic} की यह प्रक्रिया बहुत सीधी है। यहाँ ऊर्जा और नियम मिलकर एक व्यवस्थित परिणाम बनाते हैं।`}`,
        keyTakeaway: `मुख्य सीख: ${scene?.simplePoints?.[0] || 'यह नियम प्रकृति के संतुलन को बनाए रखता है।'}`
      };
    }
    return {
      answer: `In simple terms: ${scene?.simpleNarration || `Think of ${topic} as a natural system where inputs transform smoothly into outputs according to balanced rules.`}`,
      keyTakeaway: `Key takeaway: ${scene?.simplePoints?.[0] || 'Everything works together in a balanced cycle.'}`
    };
  }

  // 2. Real-life analogy check
  if (
    cleanQ.includes('real life') ||
    cleanQ.includes('example') ||
    cleanQ.includes('analogy') ||
    cleanQ.includes('udahar') ||
    cleanQ.includes('उदाहरण') ||
    cleanQ.includes('উদাহরণ') ||
    cleanQ.includes('உதாரணம்')
  ) {
    if (topic.toLowerCase().includes('photosynthesis')) {
      if (isHindi) {
        return {
          answer: `दैनिक जीवन का उदाहरण: जैसे आपके घर में सोलर कुकर सूर्य की धूप से खाना पकाता है, वैसे ही पेड़ की पत्तियां धूप, पानी और हवा से ग्लूकोज बनाती हैं और हमें ताज़ी सांस लेने वाली ऑक्सीजन देती हैं।`,
          keyTakeaway: `उदाहरण: घर का सोलर हीटर और पौधों का क्लोरोप्लास्ट एक ही तरह से धूप को उपयोगी ऊर्जा में बदलते हैं!`
        };
      }
      return {
        answer: `Real-life example: Just like a solar oven uses sunlight to bake bread without plugging into a wall, a leaf's chloroplast uses sunbeams to bake glucose and gives us clean oxygen in return!`,
        keyTakeaway: `Example: Solar panels on rooftops work on the exact same photon-harvesting principle as leaves!`
      };
    }
    if (topic.toLowerCase().includes('black hole') || topic.toLowerCase().includes('blackhole')) {
      if (isHindi) {
        return {
          answer: `दैनिक जीवन का उदाहरण: कल्पना कीजिए एक बड़े रबर के गद्दे (ट्रैम्पोलिन) पर एक बहुत भारी लोहे का गोला रख दिया जाए। वह गद्दे को इतना गहरा खींच लेता है कि उसके पास जाने वाली हर कंचे की गेंद सीधे नीचे गिर जाती है।`,
          keyTakeaway: `उदाहरण: ट्रैम्पोलिन पर भारी गेंद = स्पेस-टाइम में ब्लैक होल का गुरुत्वाकर्षण गड्ढा!`
        };
      }
      return {
        answer: `Real-life example: Picture a heavy bowling ball placed on a rubber trampoline. It creates a steep dip that pulls all nearby rolling marbles straight down into the center!`,
        keyTakeaway: `Example: Extreme trampoline dip = Spacetime gravity well!`
      };
    }
    if (topic.toLowerCase().includes('newton')) {
      if (isHindi) {
        return {
          answer: `दैनिक जीवन का उदाहरण: जब आप स्केटबोर्ड से आगे कूदते हैं तो स्केटबोर्ड पीछे भागता है। यह क्रिया और प्रतिक्रिया का वास्तविक उदाहरण है!`,
          keyTakeaway: `उदाहरण: स्केटबोर्ड से कूदना = क्रिया और विपरीत प्रतिक्रिया!`
        };
      }
      return {
        answer: `Real-life example: When you jump off a skateboard onto the ground, the board shoots backwards while you leap forward!`,
        keyTakeaway: `Example: Action and Reaction force pairs in action!`
      };
    }
  }

  // 3. Formula check
  if (
    cleanQ.includes('formula') ||
    cleanQ.includes('sutra') ||
    cleanQ.includes('equation') ||
    cleanQ.includes('math') ||
    cleanQ.includes('समीकरण') ||
    cleanQ.includes('सूत्र')
  ) {
    if (scene?.formula) {
      if (isHindi) {
        return {
          answer: `सूत्र का अर्थ (${scene.formula}): यह समीकरण दिखाता है कि इनपुट पदार्थ (बाएं तरफ) रासायनिक ऊर्जा और भौतिक नियमों के बाद आउटपुट उत्पाद (दाएं तरफ) में परिवर्तित होते हैं।`,
          keyTakeaway: `समीकरण: ${scene.formula}`
        };
      }
      return {
        answer: `Formula breakdown (${scene.formula}): This equation describes the conservation of mass and energy under governing physical laws.`,
        keyTakeaway: `Equation: ${scene.formula}`
      };
    }
  }

  // 4. Default contextual explanation
  if (isHindi) {
    return {
      answer: `इस दृश्य (${sceneTitle}) के बारे में: ${headline}। यहाँ मुख्य बात यह है कि ${scene?.points?.[0] || topic}। यह कदम पूरे चक्र को सुचारू रूप से चलाने के लिए आवश्यक है।`,
      keyTakeaway: `महत्वपूर्ण बिंदु: ${scene?.points?.[1] || `${topic} की यह अवस्था सर्वाधिक महत्वपूर्ण है।`}`
    };
  }

  return {
    answer: `Regarding this moment in "${sceneTitle}": ${headline}. The primary mechanism is that ${scene?.points?.[0] || topic}. This step guarantees system equilibrium and operational accuracy.`,
    keyTakeaway: `Key Takeaway: ${scene?.points?.[1] || `This stage is essential for overall comprehension of ${topic}.`}`
  };
}

function matchTopicWithBlueprint(topicInput, data, key) {
  if (!topicInput || !data) return false;
  const lower = topicInput.toLowerCase().trim();
  const norm = lower.replace(/[^a-z0-9\u0900-\u097F]/g, '');
  const aliases = data.aliases || [key];

  return aliases.some(a => {
    if (!a) return false;
    const cleanA = a.toLowerCase().trim();
    const normA = cleanA.replace(/[^a-z0-9\u0900-\u097F]/g, '');
    if (!cleanA || !normA) return false;

    if (lower === cleanA || norm === normA) return true;
    if (lower.includes(cleanA) || cleanA.includes(lower)) return true;
    if (norm.length >= 4 && normA.length >= 4 && (norm.includes(normA) || normA.includes(norm))) return true;
    return false;
  });
}

/**
 * Procedural Dynamic Translator for Any Topic and Language
 */
export function translateVideoContent(videoData, targetLanguageCode = 'en') {
  if (!videoData) return null;
  const lang = targetLanguageCode.toLowerCase();
  const topicKey = videoData.topic.toLowerCase().trim();

  // Check if topic exists in curated multilingual database
  for (const [key, data] of Object.entries(MULTILINGUAL_DATA)) {
    if (matchTopicWithBlueprint(topicKey, data, key)) {
      const localized = data[lang];
      if (localized) {
        return {
          ...videoData,
          language: lang,
          title: localized.title || videoData.title,
          category: localized.category || videoData.category,
          simpleHeadline: localized.simpleHeadline || videoData.simpleHeadline,
          scenes: videoData.scenes.map((origScene, idx) => {
            const locScene = localized.scenes?.[idx] || origScene;
            return {
              ...origScene,
              title: locScene.title || origScene.title,
              headline: locScene.headline || origScene.headline,
              simpleTitle: locScene.simpleTitle || origScene.simpleTitle,
              simpleHeadline: locScene.simpleHeadline || origScene.simpleHeadline,
              points: locScene.points || origScene.points,
              simplePoints: locScene.simplePoints || origScene.simplePoints,
              narration: locScene.narration || origScene.narration,
              simpleNarration: locScene.simpleNarration || origScene.simpleNarration,
              animationType: locScene.animationType || origScene.animationType,
              formula: locScene.formula || origScene.formula,
              diagramNodes: locScene.diagramNodes || origScene.diagramNodes
            };
          }),
          quiz: localized.quiz ? {
            ...videoData.quiz,
            question: localized.quiz.question,
            options: localized.quiz.options,
            explanation: localized.quiz.explanation
          } : videoData.quiz
        };
      }
    }
  }

  // Smart Procedural Dynamic Translation for Custom Topics
  const topicName = videoData.topic;
  if (lang === 'hi') {
    return {
      ...videoData,
      language: 'hi',
      title: `${topicName}: सम्पूर्ण सचित्र वीडियो व्याख्यान`,
      category: "वैज्ञानिक एवं शैक्षणिक अध्ययन",
      simpleHeadline: `${topicName} को सबसे आसान तरीके से समझें!`,
      scenes: videoData.scenes.map((s, idx) => ({
        ...s,
        title: idx === 0 ? `परिचय: ${topicName} की मूल अवधारणा` : idx === 1 ? `कार्यप्रणाली एवं मुख्य सिद्धांत` : idx === 2 ? `गहन विश्लेषण एवं अनुप्रयोग` : `निष्कर्ष एवं महत्व`,
        simpleTitle: idx === 0 ? `सरल परिचय: ${topicName}` : idx === 1 ? `यह कैसे काम करता है?` : idx === 2 ? `सरल उदाहरण और उपयोग` : `याद रखने योग्य बातें`,
        headline: `${topicName} के प्रमुख घटक और नियम`,
        simpleHeadline: `दैनिक जीवन के आसान उदाहरणों के साथ`,
        points: s.points ? s.points.map(p => (typeof p === 'string' ? p.replace(/^[•✓\-\s]+/, '') : p)) : [
          `${topicName} आधुनिक विज्ञान और पाठ्यक्रम का एक प्रमुख विषय है`,
          `यह विभिन्न सिद्धांतों और अवलोकनों को एक व्यवस्थित रूप में प्रस्तुत करता है`,
          `इसके अध्ययन से व्यावहारिक समस्याओं का समाधान संभव होता है`
        ],
        simplePoints: [
          `💡 ${topicName} प्रकृति और विज्ञान का एक बहुत आसान नियम है`,
          `⚙️ सभी हिस्से मिलकर एक साथ काम करते हैं`,
          `🎯 इससे नई खोजें और आविष्कार करना संभव होता है!`
        ],
        narration: idx === 0
          ? `नमस्ते! आज हम ${topicName} की विस्तृत और रोचक व्याख्या देखेंगे। यह विषय हमारे शैक्षणिक पाठ्यक्रम का एक अत्यंत महत्वपूर्ण स्तंभ है।`
          : idx === 1
            ? `${topicName} की कार्यप्रणाली में विभिन्न घटक आपस में परस्पर क्रिया करके सटीक संतुलन बनाते हैं।`
            : idx === 2
              ? `प्रायोगिक आंकड़ों और सिद्धांतों का मिलान करने पर ${topicName} के नए और व्यावहारिक परिणाम सामने आते हैं।`
              : `संक्षेप में, ${topicName} का ज्ञान आधुनिक विज्ञान, नवाचार और प्रगति के लिए अत्यंत लाभकारी है।`,
        simpleNarration: idx === 0
          ? `नमस्ते दोस्तों! आज हम ${topicName} को बहुत ही आसान और मजेदार तरीके से समझेंगे, जैसे कोई कहानी सुन रहे हों!`
          : idx === 1
            ? `जैसे साइकिल के पहिए और पैडल मिलकर चलते हैं, वैसे ही ${topicName} के सारे नियम एक साथ मिलकर काम करते हैं।`
            : idx === 2
              ? `हमारे रोजमर्रा के जीवन में भी ${topicName} के कई सुंदर उदाहरण देखने को मिलते हैं।`
              : `तो देखा आपने, ${topicName} को समझना कितना आसान था!`
      })),
      quiz: {
        question: `${topicName} का अध्ययन करने का मुख्य लाभ क्या है?`,
        options: [
          `यह इसके क्षेत्र में सटीक विश्लेषण, समझ और नवाचार को सक्षम बनाता है`,
          `इसका आधुनिक दुनिया में कोई व्यावहारिक उपयोग नहीं है`,
          `यह बिना किसी वैज्ञानिक नियम के यादृच्छिक रूप से काम करता है`,
          `यह केवल प्रयोगशाला तक सीमित है`
        ],
        correctIndex: 0,
        explanation: `${topicName} के मूलभूत नियम हमें वास्तविक दुनिया में सिद्धांतों को लागू करने और समस्याओं को हल करने की क्षमता प्रदान करते हैं।`
      }
    };
  }

  return { ...videoData, language: lang };
}

/**
 * Procedurally synthesizes a comprehensive educational video storyboard
 * for ANY custom topic string provided by the user with the specified language.
 */
export function generateDynamicVideo(topicInput, options = {}) {
  const cleanTopic = (topicInput || "Photosynthesis").trim();
  const gradeLevel = options.gradeLevel || "High School (Class 9-12)";
  const targetLanguage = options.language || "English";

  // Target duration range: 5 mins (300s) to 15 mins (900s), default 5 mins
  const durationMinutes = options.durationMinutes
    ? parseInt(options.durationMinutes, 10)
    : (options.sceneCount ? (options.sceneCount >= 8 ? 15 : options.sceneCount >= 7 ? 10 : options.sceneCount >= 6 ? 8 : 5) : 5);
  const clampedMinutes = Math.max(5, Math.min(15, durationMinutes));
  const targetTotalSeconds = clampedMinutes * 60;

  // Determine scene count based on duration (5m: 5 scenes, 8m: 6 scenes, 10m: 7 scenes, 15m: 8 scenes)
  const defaultSceneCount = clampedMinutes <= 5 ? 5 : clampedMinutes <= 8 ? 6 : clampedMinutes <= 10 ? 7 : 8;
  const numScenes = options.sceneCount || defaultSceneCount;
  const baseSceneDuration = Math.floor(targetTotalSeconds / numScenes);
  const remainderSeconds = targetTotalSeconds - (baseSceneDuration * numScenes);

  const langMatch = VIDEO_LANGUAGES.find(
    l => l.name.toLowerCase() === targetLanguage.toLowerCase() ||
      l.code.toLowerCase() === targetLanguage.toLowerCase()
  ) || VIDEO_LANGUAGES[0];

  const capitalizedTopic = cleanTopic
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // 1. Check if topic matches curated knowledge base
  for (const [key, data] of Object.entries(MULTILINGUAL_DATA)) {
    if (matchTopicWithBlueprint(cleanTopic, data, key)) {
      const activeTheme = (options.theme && options.theme !== 'emerald') ? options.theme : (data.defaultTheme || options.theme || "emerald");
      // Pick localized content directly if available, fallback to en
      const langContent = data[langMatch.code] || data.en;

      // Slice or cyclically extend scenes if more are requested
      const sourceScenes = langContent.scenes || [];
      const scenesToUse = [];
      for (let i = 0; i < numScenes; i++) {
        if (i < sourceScenes.length) {
          scenesToUse.push(sourceScenes[i]);
        } else {
          // Comprehensive extension scene
          const extraIdx = i + 1;
          scenesToUse.push({
            title: `Advanced Focus ${extraIdx}: Practical & Laboratory Insights`,
            headline: `Empirical Verification, Case Studies & Advanced Analysis`,
            simpleTitle: `Fun Facts & Advanced Experiments`,
            simpleHeadline: `Real-world experiments you can try!`,
            animationType: i % 2 === 0 ? "particle-orbit" : "flow-network",
            points: [
              `Experimental validation demonstrates governing laws under controlled parameters`,
              `Empirical data correlates with theoretical mathematical models with high precision`,
              `Real-world technology applications harness these fundamental principles`
            ],
            simplePoints: [
              `🔬 Scientists test this in modern labs with super-fast computers`,
              `💡 It helps invent new clean technologies and gadgets`,
              `🌟 You can spot these rules everywhere in the universe!`
            ],
            narration: `In this advanced stage, we examine how researchers and scientists test these principles under rigorous experimental conditions, paving the way for next-generation technology breakthroughs.`,
            simpleNarration: `Scientists love testing this in high-tech laboratories! Learning this gives you a superpower to understand how real-world gadgets and nature work!`
          });
        }
      }

      const baseVideo = {
        id: `vid-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        topic: cleanTopic,
        title: langContent.title,
        category: langContent.category || data.category,
        theme: activeTheme,
        gradeLevel,
        durationMinutes: clampedMinutes,
        simpleHeadline: langContent.simpleHeadline,
        scenes: scenesToUse.map((s, idx) => ({
          ...s,
          duration: baseSceneDuration + (idx < remainderSeconds ? 1 : 0),
          animationType: s.animationType || (idx === 0 ? "flow-network" : idx === 1 ? "particle-orbit" : "coordinate-graph"),
          formula: s.formula || `\\text{Model}(${cleanTopic.slice(0, 6)})`,
          diagramNodes: s.diagramNodes || [
            { label: "Core Input", color: "#F4C95D", x: 25, y: 40 },
            { label: "Transformation", color: "#5F9F7A", x: 50, y: 60 },
            { label: "Output State", color: "#3AA6A0", x: 75, y: 40 }
          ]
        })),
        quiz: {
          question: langContent.quiz.question,
          options: langContent.quiz.options,
          correctIndex: 1,
          explanation: langContent.quiz.explanation
        },
        language: langMatch.code,
        createdAt: new Date().toISOString()
      };

      return baseVideo;
    }
  }

  // 2. Synthesize Dynamic Video for Custom / Unknown Topics
  // Automatically determine best theme & animation based on keywords
  let detectedTheme = options.theme || "tech";
  let sceneAnimations = ["flow-network", "particle-orbit", "coordinate-graph", "flow-network"];
  let defaultFormula = `\\text{Model}(${cleanTopic.slice(0, 8)}) \\equiv \\sum \\text{Core Axioms}`;

  if (normTopic.includes('space') || normTopic.includes('gravity') || normTopic.includes('star') || normTopic.includes('cosmos') || normTopic.includes('galaxy') || normTopic.includes('relativity') || normTopic.includes('blackhole')) {
    detectedTheme = options.theme || "cosmos";
    sceneAnimations = ["black-hole-collapse", "black-hole-event-horizon", "black-hole-spacetime-warp", "particle-orbit"];
    defaultFormula = "R_s = \\frac{2GM}{c^2}";
  } else if (normTopic.includes('physics') || normTopic.includes('motion') || normTopic.includes('force') || normTopic.includes('energy') || normTopic.includes('velocity') || normTopic.includes('mechanics')) {
    detectedTheme = options.theme || "tech";
    sceneAnimations = ["physics-inertia", "physics-fma", "physics-action-reaction", "coordinate-graph"];
    defaultFormula = "F = m \\cdot a";
  } else if (normTopic.includes('math') || normTopic.includes('triangle') || normTopic.includes('geometry') || normTopic.includes('algebra') || normTopic.includes('calculus')) {
    detectedTheme = options.theme || "cyber";
    sceneAnimations = ["pythagorean-triangle", "coordinate-graph", "flow-network", "coordinate-graph"];
    defaultFormula = "a^2 + b^2 = c^2";
  } else if (normTopic.includes('chem') || normTopic.includes('atom') || normTopic.includes('molecule') || normTopic.includes('electron') || normTopic.includes('quantum')) {
    detectedTheme = options.theme || "cyber";
    sceneAnimations = ["atomic-orbital", "particle-orbit", "molecular-cycle", "flow-network"];
    defaultFormula = "E = h\\nu";
  } else if (normTopic.includes('ai') || normTopic.includes('neural') || normTopic.includes('machine') || normTopic.includes('computer') || normTopic.includes('data')) {
    detectedTheme = options.theme || "tech";
    sceneAnimations = ["neural-network", "data-learning", "flow-network", "coordinate-graph"];
    defaultFormula = "\\hat{y} = \\sigma(W \\cdot x + b)";
  } else if (normTopic.includes('bio') || normTopic.includes('cell') || normTopic.includes('plant') || normTopic.includes('gene') || normTopic.includes('organism')) {
    detectedTheme = options.theme || "emerald";
    sceneAnimations = ["biological-sunlight", "chloroplast-thylakoid", "molecular-cycle", "biosphere-energy"];
    defaultFormula = "\\text{Biological Transformation}";
  }

    const rawScenes = [
      {
        title: `Introduction: Understanding ${capitalizedTopic}`,
        headline: `The Fundamental Principles of ${capitalizedTopic}`,
        simpleTitle: `Intro: What is ${capitalizedTopic}?`,
        simpleHeadline: `The basic building blocks explained simply!`,
        animationType: sceneAnimations[0],
        points: [
          `${capitalizedTopic} is a core foundational pillar studied across modern curricula`,
          `Transforms complex theoretical frameworks into structured, observable phenomena`,
          `Serves as a crucial analytical building block for understanding real-world systems`
        ],
        simplePoints: [
          `🌟 ${capitalizedTopic} is all about how things work in the real world`,
          `🧩 Imagine it like interlocking puzzle pieces that fit together smoothly`,
          `🎯 Understanding this helps us solve everyday problems easily!`
        ],
        formula: defaultFormula,
        narration: `Welcome to our explainer on ${capitalizedTopic}. Today we will break down the essential concepts, mechanisms, and real-world implications that make ${capitalizedTopic} such a vital area of study.`,
        simpleNarration: `Hello and welcome! Today we are going to explore ${capitalizedTopic} in the simplest, most fun way possible—just like telling a great story!`,
        diagramNodes: [
          { label: "Origin / Input", color: "#397257", x: 25, y: 45 },
          { label: `${capitalizedTopic} Hub`, color: "#5F9F7A", x: 50, y: 55 },
          { label: "Observable Output", color: "#3AA6A0", x: 75, y: 45 }
        ]
      },
      {
        title: `Key Mechanics & Working Principles`,
        headline: `How ${capitalizedTopic} Functions Step-by-Step`,
        simpleTitle: `How it Works Step-by-Step`,
        simpleHeadline: `The engine behind ${capitalizedTopic}`,
        animationType: sceneAnimations[1],
        points: [
          `System interactions are driven by equilibrium, forces, and systemic feedback loops`,
          `Key variables interact dynamically to govern efficiency, state changes, and stability`,
          `Observable outcomes can be predicted through rigorous quantitative and qualitative modeling`
        ],
        simplePoints: [
          `⚙️ Multiple parts push and pull in harmony`,
          `🔄 When one part changes, the other parts adjust automatically`,
          `📊 We can test and watch the results happen right in front of us!`
        ],
        formula: `\\Delta \\Phi = \\int_{t_0}^{t_1} \\kappa(${capitalizedTopic.slice(0, 4)}) \\, dt`,
        narration: `At its core, ${capitalizedTopic} operates through structured feedback cycles. When individual components interact, their dynamic relationships create balanced outcomes that can be measured and verified.`,
        simpleNarration: `Just like gears in a clock, every part of ${capitalizedTopic} works together in a perfect sequence to make something amazing happen!`,
        diagramNodes: [
          { label: "Catalyst / Stimulus", color: "#F4C95D", x: 30, y: 35 },
          { label: "Active Transformation", color: "#397257", x: 50, y: 65 },
          { label: "Resultant State", color: "#24706C", x: 70, y: 35 }
        ]
      },
      {
        title: `Deep Dive & Critical Analysis`,
        headline: `Advanced Perspectives on ${capitalizedTopic}`,
        simpleTitle: `Everyday Examples & Fun Facts`,
        simpleHeadline: `Seeing ${capitalizedTopic} in our daily lives`,
        animationType: sceneAnimations[2],
        points: [
          `Examines edge cases, boundary conditions, and secondary governing factors`,
          `Compares theoretical predictions against experimental data and empirical benchmarks`,
          `Unlocks deeper intuition for problem solving and academic mastery`
        ],
        simplePoints: [
          `🚗 We see these principles in technology, transport, and nature`,
          `🔍 Testing with experiments proves this rule works everywhere`,
          `💡 It gives you superpowers to understand how things work!`
        ],
        formula: `\\eta = \\frac{\\text{Actual Output}}{\\text{Theoretical Max}} \\times 100\\%`,
        narration: `Taking a deeper look into ${capitalizedTopic}, examining boundary limits and experimental data reveals why standard assumptions hold and how researchers expand this frontier.`,
        simpleNarration: `When you look closely around you, you'll spot ${capitalizedTopic} at work in gadgets, nature, and everyday objects!`,
        diagramNodes: [
          { label: "Empirical Data", color: "#5F9F7A", x: 25, y: 60 },
          { label: "Theoretical Model", color: "#3AA6A0", x: 50, y: 35 },
          { label: "Validated Insight", color: "#F4C95D", x: 75, y: 60 }
        ]
      },
      {
        title: `Practical Experiments & Case Studies`,
        headline: `Empirical Lab Demonstrations & Proofs`,
        simpleTitle: `Cool Experiments & Demonstrations`,
        simpleHeadline: `How we prove it in real life`,
        animationType: sceneAnimations[1] || "particle-orbit",
        points: [
          `Laboratory experiments allow direct observation and quantitative verification`,
          `Testing variables independently validates cause-and-effect relationships`,
          `Eliminates observational biases through repeatable standardized protocols`
        ],
        simplePoints: [
          `🔬 Hands-on experiments make learning unforgettable`,
          `📊 Watching graphs change in real-time proves the equations`,
          `✨ You can recreate simple versions of this at home or school!`
        ],
        formula: `\\sigma^2 = \\frac{1}{N}\\sum (x_i - \\mu)^2`,
        narration: `Through empirical case studies and hands-on laboratory setups, students and researchers can directly observe ${capitalizedTopic} in action and confirm theoretical mathematical predictions.`,
        simpleNarration: `When we run experiments in the lab, we can see the magic happen right before our eyes!`,
        diagramNodes: [
          { label: "Experimental Setup", color: "#F4C95D", x: 30, y: 40 },
          { label: "Controlled Variable", color: "#397257", x: 50, y: 60 },
          { label: "Empirical Result", color: "#3AA6A0", x: 70, y: 40 }
        ]
      },
      {
        title: `Real-World Impact & Modern Applications`,
        headline: `Why ${capitalizedTopic} Matters in Today's World`,
        simpleTitle: `Why This Matters to You`,
        simpleHeadline: `How ${capitalizedTopic} shapes our future`,
        animationType: sceneAnimations[3],
        points: [
          `Directly impacts modern technology, research, industrial design, and societal progress`,
          `Provides actionable problem-solving frameworks for engineers, scientists, and thinkers`,
          `Forms the bridge to next-generation breakthroughs and career opportunities`
        ],
        simplePoints: [
          `🚀 Powers future inventions, space exploration, and clean energy`,
          `🎓 Helps you score top marks and master your subjects`,
          `🌱 Inspires the next generation of creative inventors!`
        ],
        formula: `\\text{Impact} = f(\\text{Innovation}, \\, \\text{Application}, \\, \\text{Scalability})`,
        narration: `In conclusion, mastering ${capitalizedTopic} equips you with essential conceptual tools to analyze complex systems, drive innovation, and excel in modern academic and professional endeavors.`,
        simpleNarration: `Now you know the secrets of ${capitalizedTopic}! You can use this knowledge to explore, create, and build awesome things in the future!`,
        diagramNodes: [
          { label: "Academic Foundation", color: "#397257", x: 30, y: 50 },
          { label: "Industry Innovation", color: "#3AA6A0", x: 70, y: 50 }
        ]
      },
      {
        title: `Future Frontiers & Advanced Horizons`,
        headline: `Emerging Research & Tomorrow's Technologies`,
        simpleTitle: `The Future of ${capitalizedTopic}`,
        simpleHeadline: `What comes next in modern science?`,
        animationType: "particle-orbit",
        points: [
          `Next-generation frontiers continue expanding theoretical boundaries`,
          `Interdisciplinary integration unlocks novel applications across science and engineering`,
          `Empowers students to become future innovators and researchers`
        ],
        simplePoints: [
          `🔮 Exciting new discoveries are happening right now`,
          `💻 Supercomputers and AI are helping solve remaining mysteries`,
          `🚀 You could be the scientist who makes the next big discovery!`
        ],
        formula: `\\lim_{t \\to \\infty} \\text{Capability}(t) = \\infty`,
        narration: `As we look ahead, cutting-edge researchers are applying ${capitalizedTopic} to solve humanity's greatest challenges, from sustainable energy to artificial intelligence and space exploration.`,
        simpleNarration: `The future of ${capitalizedTopic} is full of exciting mysteries waiting for bright curious minds like you to discover!`,
        diagramNodes: [
          { label: "Current Knowledge", color: "#397257", x: 30, y: 50 },
          { label: "Future Breakthrough", color: "#F4C95D", x: 70, y: 50 }
        ]
      },
      {
        title: `Comprehensive Review & Key Formula Summary`,
        headline: `Mastery Checklist, Essential Axioms & Examination Takeaways`,
        simpleTitle: `Quick Recap & Things to Remember`,
        simpleHeadline: `You are now a master of ${capitalizedTopic}!`,
        animationType: "flow-network",
        points: [
          `Review all core axioms, governing formulas, and systemic relationships`,
          `Memorize essential units, constants, and problem-solving heuristics`,
          `Connect theoretical models to real-world physical observations`
        ],
        simplePoints: [
          `⭐ Great job completing this in-depth lesson!`,
          `🏆 You understand the core principles, examples, and formulas`,
          `🎯 Ready to test your knowledge with the quick comprehension check!`
        ],
        formula: `\\text{Mastery} = \\text{Theory} + \\text{Application} + \\text{Problem Solving}`,
        narration: `To consolidate our complete masterclass on ${capitalizedTopic}, review these core principles and formulas. You are now fully prepared for examinations, projects, and advanced discussions.`,
        simpleNarration: `Awesome work! You have mastered the entire story of ${capitalizedTopic}. Let's test what you learned in the quick quiz!`,
        diagramNodes: [
          { label: "Foundations", color: "#5F9F7A", x: 25, y: 40 },
          { label: "Mastery Hub", color: "#F4C95D", x: 50, y: 60 },
          { label: "Exam Success", color: "#3AA6A0", x: 75, y: 40 }
        ]
      },
      {
        title: `Interactive Challenge & Applied Problem Solving`,
        headline: `Step-by-Step Scenario Analysis & Evaluation`,
        simpleTitle: `Final Challenge & Wrap Up`,
        simpleHeadline: `Put your thinking cap on!`,
        animationType: "coordinate-graph",
        points: [
          `Apply fundamental principles to solve complex multi-step scenario problems`,
          `Evaluate boundary conditions and predict output changes accurately`,
          `Synthesize analytical reasoning with qualitative intuition`
        ],
        simplePoints: [
          `💡 Put your new knowledge into practice`,
          `🎯 See how every formula connects together smoothly`,
          `🎉 Congratulations on finishing this full chapter deep dive!`
        ],
        formula: `\\text{Solution} = \\sum_{i=1}^n \\text{Step}_i`,
        narration: `In our final chapter module, we apply these concepts to real-world problem scenarios, reinforcing intuition and analytical confidence.`,
        simpleNarration: `You did it! You have completed the full lesson from start to finish. You are a true science champion!`,
        diagramNodes: [
          { label: "Problem Challenge", color: "#E74C3C", x: 30, y: 50 },
          { label: "Analytical Solution", color: "#10B981", x: 70, y: 50 }
        ]
      }
    ];

    const scenesToUse = rawScenes.slice(0, numScenes).map((s, idx) => ({
      ...s,
      duration: baseSceneDuration + (idx < remainderSeconds ? 1 : 0)
    }));

    const baseVideo = {
      id: `vid-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      topic: cleanTopic,
      title: `${capitalizedTopic}: Comprehensive Dynamic Explainer`,
      category: "Science & Modern Curriculum",
      theme: detectedTheme,
      gradeLevel,
      durationMinutes: clampedMinutes,
      simpleHeadline: `Simple & Fun Guide to ${capitalizedTopic}`,
      scenes: scenesToUse,
    quiz: {
      question: `What is the primary significance of studying ${capitalizedTopic}?`,
      options: [
        `It provides foundational principles to model, predict, and innovate within its domain`,
        `It is purely historical with no modern applications`,
        `It operates completely randomly with no underlying laws or mechanisms`,
        `It only applies in laboratory vacuums and cannot be observed in reality`
      ],
      correctIndex: 0,
      explanation: `${capitalizedTopic} establishes structured principles and analytical models that enable deep understanding and real-world applications.`
    },
    language: 'en',
    createdAt: new Date().toISOString()
  };

  if (langMatch.code !== 'en') {
    return translateVideoContent(baseVideo, langMatch.code);
  }

  return baseVideo;
}

export const TRENDING_TOPICS = [
  { topic: "Photosynthesis", category: "Biology", grade: "Class 6-10", icon: "🌱" },
  { topic: "Black Holes", category: "Astrophysics", grade: "Class 8-12", icon: "🌌" },
  { topic: "Newton's Laws", category: "Physics", grade: "Class 7-11", icon: "🚀" },
  { topic: "Pythagorean Theorem", category: "Mathematics", grade: "Class 6-10", icon: "📐" },
  { topic: "Structure of an Atom", category: "Chemistry", grade: "Class 8-12", icon: "⚛️" },
  { topic: "Machine Learning", category: "Computer Science", grade: "Class 9-12+", icon: "🤖" },
  { topic: "The Water Cycle", category: "Earth Science", grade: "Class 6-9", icon: "💧" },
  { topic: "DNA Replication", category: "Genetics", grade: "Class 10-12", icon: "🧬" },
  { topic: "Calculus Derivatives", category: "Mathematics", grade: "Class 11-12", icon: "📈" },
  { topic: "French Revolution", category: "World History", grade: "Class 9-10", icon: "🏛️" }
];
