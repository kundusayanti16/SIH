/**
 * Dynamic AI Video Generator Engine with Full Multilingual Support,
 * Simplified (ELI5) Story Mode, Interactive Visual Sandbox, Contextual Doubt Solver,
 * and Strict Language-Specific TTS Voice Resolution.
 */

export const LANGUAGE_CONFIG = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    locale: 'en-US',
    speechLang: 'en-US',
    voiceNames: ['Samantha', 'Alex', 'Victoria', 'Karen', 'Google US English']
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    locale: 'hi-IN',
    speechLang: 'hi-IN',
    voiceNames: ['Lekha', 'Google हिन्दी', 'Hindi']
  },
  mr: {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    locale: 'mr-IN',
    speechLang: 'mr-IN',
    voiceNames: ['Google मराठी', 'Marathi']
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    locale: 'bn-IN',
    speechLang: 'bn-IN',
    voiceNames: ['Piya', 'Google বাংলা', 'Bengali']
  },
  pa: {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    flag: '🇮🇳',
    locale: 'pa-IN',
    speechLang: 'pa-IN',
    voiceNames: ['Google ਪੰਜਾਬੀ', 'Punjabi']
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    locale: 'ta-IN',
    speechLang: 'ta-IN',
    voiceNames: ['Vani', 'Google தமிழ்', 'Tamil']
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    locale: 'te-IN',
    speechLang: 'te-IN',
    voiceNames: ['Geeta', 'Google తెలుగు', 'Telugu']
  },
  kn: {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    locale: 'kn-IN',
    speechLang: 'kn-IN',
    voiceNames: ['Soumya', 'Google ಕನ್ನಡ', 'Kannada']
  },
  gu: {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳',
    locale: 'gu-IN',
    speechLang: 'gu-IN',
    voiceNames: ['Google ગુજરાતી', 'Gujarati']
  }
};

export const VIDEO_LANGUAGES = Object.values(LANGUAGE_CONFIG);

/**
 * Validates that a requested language code is properly supported.
 */
export function validateLanguageConfig(langCode) {
  const code = (langCode || '').toLowerCase().trim();
  const config = LANGUAGE_CONFIG[code];
  if (!config) {
    return {
      isValid: false,
      error: `Unsupported language: "${langCode}". Supported languages: ${Object.keys(LANGUAGE_CONFIG).join(', ')}`
    };
  }
  return {
    isValid: true,
    config
  };
}

/**
 * Transliterates Brahmic Indic scripts (Devanagari, Bengali, Gurmukhi, Gujarati, Tamil, Telugu, Kannada)
 * to clear, pronounceable phonetic Latin syllables so that when a browser OS lacks a native regional voice,
 * the speech synthesizer can pronounce the native words clearly aloud rather than remaining completely silent.
 */
export function transliterateIndicToPhonetic(text) {
  if (!text) return '';

  const consonants = {
    0x15: 'k', 0x16: 'kh', 0x17: 'g', 0x18: 'gh', 0x19: 'ng',
    0x1a: 'ch', 0x1b: 'chh', 0x1c: 'j', 0x1d: 'jh', 0x1e: 'ny',
    0x1f: 't', 0x20: 'th', 0x21: 'd', 0x22: 'dh', 0x23: 'n',
    0x24: 't', 0x25: 'th', 0x26: 'd', 0x27: 'dh', 0x28: 'n', 0x29: 'nn',
    0x2a: 'p', 0x2b: 'ph', 0x2c: 'b', 0x2d: 'bh', 0x2e: 'm',
    0x2f: 'y', 0x30: 'r', 0x31: 'rr', 0x32: 'l', 0x33: 'l', 0x34: 'll', 0x35: 'v',
    0x36: 'sh', 0x37: 'sh', 0x38: 's', 0x39: 'h',
    0x58: 'q', 0x59: 'kh', 0x5a: 'g', 0x5b: 'z', 0x5c: 'r', 0x5d: 'rh', 0x5e: 'f', 0x5f: 'y'
  };

  const vowels = {
    0x04: 'a', 0x05: 'a', 0x06: 'aa', 0x07: 'i', 0x08: 'ee',
    0x09: 'u', 0x0a: 'oo', 0x0b: 'ri', 0x0c: 'li', 0x0e: 'e', 0x0f: 'e',
    0x10: 'ai', 0x11: 'o', 0x12: 'o', 0x13: 'au', 0x14: 'au'
  };

  const matras = {
    0x3e: 'aa', 0x3f: 'i', 0x40: 'ee', 0x41: 'u', 0x42: 'oo',
    0x43: 'ri', 0x44: 'rri', 0x46: 'e', 0x47: 'e', 0x48: 'ai',
    0x4a: 'o', 0x4b: 'o', 0x4c: 'au'
  };

  const blocks = [
    { start: 0x0900, end: 0x097f }, // Devanagari (Hindi, Marathi)
    { start: 0x0980, end: 0x09ff }, // Bengali
    { start: 0x0a00, end: 0x0a7f }, // Gurmukhi (Punjabi)
    { start: 0x0a80, end: 0x0aff }, // Gujarati
    { start: 0x0b80, end: 0x0bff }, // Tamil
    { start: 0x0c00, end: 0x0c7f }, // Telugu
    { start: 0x0c80, end: 0x0cff }  // Kannada
  ];

  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    const block = blocks.find(b => code >= b.start && code <= b.end);

    if (!block) {
      result += text[i];
      continue;
    }

    const offset = code - block.start;

    // Virama / halant (0x4d) - suppresses default 'a'
    if (offset === 0x4d) {
      if (result.endsWith('a')) {
        result = result.slice(0, -1);
      }
      continue;
    }

    // Anusvara (0x02) / Candrabindu (0x01)
    if (offset === 0x01 || offset === 0x02) {
      result += 'n';
      continue;
    }
    // Visarga (0x03)
    if (offset === 0x03) {
      result += 'h';
      continue;
    }

    // Matra
    if (matras[offset]) {
      if (result.endsWith('a')) {
        result = result.slice(0, -1);
      }
      result += matras[offset];
      continue;
    }

    // Independent Vowel
    if (vowels[offset]) {
      result += vowels[offset];
      continue;
    }

    // Consonant
    if (consonants[offset]) {
      result += consonants[offset] + 'a';
      continue;
    }

    // Numbers
    if (offset >= 0x66 && offset <= 0x6f) {
      result += (offset - 0x66).toString();
      continue;
    }

    result += text[i];
  }

  return result
    .replace(/aa+/g, 'aa')
    .replace(/ee+/g, 'ee')
    .replace(/oo+/g, 'oo')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves the matching TTS voice from the browser's speechSynthesis voice list.
 * CRITICAL RULE: If Marathi (or any other regional language) is selected and no
 * matching voice exists in the browser, DO NOT SILENTLY FALL BACK TO HINDI.
 */
export function resolveTTSVoice(langCode, availableVoices = []) {
  const code = (langCode || 'en').toLowerCase().trim();
  const config = LANGUAGE_CONFIG[code] || LANGUAGE_CONFIG['en'];
  const voices = availableVoices && availableVoices.length > 0
    ? availableVoices
    : (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);

  if (!voices || voices.length === 0) {
    return {
      voice: null,
      isNative: false,
      status: 'VOICES_NOT_LOADED',
      config,
      speechLang: config.speechLang,
      targetLocale: config.locale
    };
  }

  // 1. Exact locale match (e.g. 'mr-in', 'mr_in', 'bn-in')
  const targetLocale = config.locale.toLowerCase();
  const exactMatch = voices.find(v => {
    const vLang = (v.lang || '').toLowerCase().replace('_', '-');
    return vLang === targetLocale;
  });
  if (exactMatch) {
    return { voice: exactMatch, isNative: true, status: 'MATCHED_EXACT', config, speechLang: config.speechLang, targetLocale: config.locale };
  }

  // 2. Language prefix match (e.g. starts with 'mr-' or is exactly 'mr')
  const prefixMatch = voices.find(v => {
    const vLang = (v.lang || '').toLowerCase().replace('_', '-');
    return vLang.startsWith(config.code + '-') || vLang === config.code;
  });
  if (prefixMatch) {
    return { voice: prefixMatch, isNative: true, status: 'MATCHED_PREFIX', config, speechLang: config.speechLang, targetLocale: config.locale };
  }

  // 3. Name match by language name or native name
  const nameMatch = voices.find(v => {
    const vName = (v.name || '').toLowerCase();
    return vName.includes(config.name.toLowerCase()) || (config.nativeName && vName.includes(config.nativeName.toLowerCase()));
  });
  if (nameMatch) {
    return { voice: nameMatch, isNative: true, status: 'MATCHED_NAME', config, speechLang: config.speechLang, targetLocale: config.locale };
  }

  // 4. Candidate voice names defined in config
  if (config.voiceNames) {
    for (const cand of config.voiceNames) {
      const candMatch = voices.find(v => (v.name || '').toLowerCase().includes(cand.toLowerCase()));
      if (candMatch) {
        return { voice: candMatch, isNative: true, status: 'MATCHED_CANDIDATE', config, speechLang: config.speechLang, targetLocale: config.locale };
      }
    }
  }

  // NEVER silently fall back to Hindi for non-Hindi languages!
  return {
    voice: null,
    isNative: false,
    status: 'NO_VOICE_FOR_LANGUAGE',
    config,
    speechLang: config.speechLang,
    targetLocale: config.locale
  };
}

// Multilingual blueprints for core academic topics
export const MULTILINGUAL_DATA = {
  photosynthesis: {
    aliases: ['photosynthesis', 'photo synthesis', 'प्रकाश संश्लेषण', 'प्रकाशसंश्लेषण', 'সালোকসংশ্লেষ', 'ஒளிச்சேர்க்கை', 'కిరణజన్య సంయోగక్రియ', 'chlorophyll', 'plant food', 'plants food'],
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
            "🍬 Out pops delicious glucose sugar that fuels fruits, roots, and trees!"
          ],
          narration: "During the Calvin Cycle, occurring inside the chloroplast stroma, the enzyme RuBisCO captures carbon dioxide from the air. Using the ATP and NADPH generated in Stage 1, it weaves carbon atoms into rich glucose molecules.",
          simpleNarration: "Now comes the baking part! A special chef enzyme called RuBisCO takes invisible carbon dioxide from the air, mixes it with the charged ATP battery power from earlier, and bakes sweet energy-rich glucose sugar for the plant!"
        }
      ],
      quiz: {
        question: "Which organelle in plant cells is responsible for photosynthesis?",
        options: ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"],
        explanation: "Chloroplasts contain chlorophyll pigments that absorb sunlight and synthesize glucose during photosynthesis."
      }
    },
    mr: {
      title: "प्रकाश संश्लेषण: वनस्पतींचे सौर ऊर्जा रूपांतरण",
      category: "जीवशास्त्र (Biology)",
      simpleHeadline: "वनस्पती सूर्यप्रकाशाचा वापर करून अन्न कसे तयार करतात!",
      scenes: [
        {
          title: "प्रस्तावना: सूर्यप्रकाशाचे ऊर्जेत रूपांतर",
          headline: "पृथ्वीवरील सर्वात महत्त्वपूर्ण जैविक प्रक्रिया",
          simpleTitle: "सूर्यप्रकाशापासून अन्न: निसर्गाचे सौर स्वयंपाकघर",
          simpleHeadline: "झाडे म्हणजे सौर ऊर्जेवर चालणारे छोटे स्वयंपाकघर आहेत!",
          animationType: "biological-sunlight",
          formula: "6CO₂ + 6H₂O + सूर्यप्रकाश → C₆H₁₂O₆ + 6O₂",
          diagramNodes: [
            { label: "सूर्यप्रकाश फोटॉन (hν)", color: "#F4C95D", x: 25, y: 35 },
            { label: "हरितलवक स्ट्रोमा", color: "#5F9F7A", x: 50, y: 65 },
            { label: "शुद्ध ऑक्सिजन (O₂)", color: "#3AA6A0", x: 75, y: 35 }
          ],
          points: [
            "प्रकाश संश्लेषण सौर ऊर्जेचे ग्लुकोजमध्ये रासायनिक ऊर्जेत रूपांतर करते",
            "ही प्रक्रिया प्रामुख्याने पानांमधील हरितलवक (Chloroplast) मध्ये घडते",
            "या प्रक्रियेत सजीवांसाठी अत्यावश्यक असलेला ऑक्सिजन वायू बाहेर सोडला जातो"
          ],
          simplePoints: [
            "☀️ सूर्य झाडांना सोनेरी प्रकाशाची ऊर्जा देतो",
            "🍃 हिरवी पाने सौर पॅनेल्सप्रमाणे हा प्रकाश शोषून घेतात",
            "💨 झाडे हवेतील कार्बन डायऑक्साइड घेऊन आपल्याला श्वास घेण्यासाठी ताजी ऑक्सिजन हवा देतात!"
          ],
          narration: "प्रकाश संश्लेषणाच्या या सविस्तर पाठात आपले स्वागत आहे! प्रत्येक हिरव्या पानामध्ये लाखो सूक्ष्म हरितलवके असतात, जी सूर्यप्रकाश, कार्बन डायऑक्साइड आणि पाण्याचा वापर करून ग्लुकोज व ऑक्सिजन तयार करतात.",
          simpleNarration: "विचार करा जर तुम्ही केवळ उन्हात उभे राहून तुमचे आवडते जेवण बनवू शकला तर? झाडे हेच करतात! ती जमिनीतून पाणी पितात, सूर्यप्रकाश पकडतात आणि गोड ग्लुकोज तयार करून आपल्याला ताजी हवा देतात!"
        },
        {
          title: "टप्पा १: प्रकाश-आधारित अभिक्रिया",
          headline: "थायलाकॉइड पडद्यावर फोटॉन्सचे ग्रहण",
          simpleTitle: "टप्पा १: प्रकाशाने पाण्याचे विभाजन",
          simpleHeadline: "पाण्याचे कण फुटून ऑक्सिजन हवेत सोडला जातो",
          animationType: "chloroplast-thylakoid",
          formula: "2H₂O + 2NADP⁺ + 3ADP + 3Pᵢ → O₂ + 2NADPH + 3ATP",
          diagramNodes: [
            { label: "पाण्याचे रेणू (H₂O)", color: "#3AA6A0", x: 25, y: 40 },
            { label: "थायलाकॉइड प्रकाश-अपघटन", color: "#5F9F7A", x: 50, y: 60 },
            { label: "ऊर्जा बॅटरी (ATP)", color: "#F4C95D", x: 75, y: 40 }
          ],
          points: [
            "हरितद्रव्य (Chlorophyll) निळा व तांबडा प्रकाश शोषून हिरवा प्रकाश परावर्तित करते",
            "पाण्याच्या रेणूंचे प्रकाश-अपघटन होऊन ऑक्सिजन वायू मुक्त होतो",
            "या टप्प्यात ATP आणि NADPH या ऊर्जासंपन्न रेणूंची निर्मिती होते"
          ],
          simplePoints: [
            "💧 पाण्याचे थेंब पानात सूर्यकिरणांशी मिळतात",
            "⚡ प्रकाशाच्या ऊर्जेमुळे पाण्याचे विभाजन होऊन ऑक्सिजन हवेत उडतो",
            "🔋 पेशींमधील छोट्या जैविक बॅटऱ्या (ATP) पूर्ण चार्ज होतात!"
          ],
          narration: "पहिल्या टप्प्यात थायलाकॉइडच्या पडद्यावर प्रकाश-आधारित अभिक्रिया घडतात. हरितद्रव्य प्रकाशाचे फोटॉन शोषून पाण्याचे विभाजन करते, ज्यामुळे ऑक्सिजन मुक्त होतो आणि रासायनिक ऊर्जा साठवली जाते.",
          simpleNarration: "पानांच्या आत थायलाकॉइड नावाच्या छोट्या चकत्या असतात. सूर्यकिरण त्यावर पडताच पाण्याच्या थेंबांमधून ऑक्सिजन बाहेर पडतो आणि पेशींची ऊर्जा बॅटरी चार्ज होते!"
        },
        {
          title: "टप्पा २: केल्व्हिन चक्र (अप्रकाश अभिक्रिया)",
          headline: "स्ट्रोमामध्ये ग्लुकोजची निर्मिती",
          simpleTitle: "टप्पा २: ग्लुकोज साखर तयार करणे",
          simpleHeadline: "हवा आणि ऊर्जेचा वापर करून झाडे स्वतःचे अन्न बनवतात",
          animationType: "molecular-cycle",
          formula: "3CO₂ + 9ATP + 6NADPH → G3P + 9ADP + 8Pᵢ + 6NADP⁺",
          diagramNodes: [
            { label: "हवेतील CO₂", color: "#718078", x: 25, y: 35 },
            { label: "रुबिस्को विकर (RuBisCO)", color: "#F4C95D", x: 50, y: 65 },
            { label: "ग्लुकोज अन्न (C₆H₁₂O₆)", color: "#3AA6A0", x: 75, y: 35 }
          ],
          points: [
            "हरितलवकाच्या स्ट्रोमामध्ये ही अभिक्रिया थेट प्रकाशाशिवाय पूर्ण होते",
            "रुबिस्को विकर हवेतील कार्बन डायऑक्साइडचे स्थिरीकरण करते",
            "पहिल्या टप्प्यातील ATP चा वापर करून ग्लुकोज साखरेची निर्मिती होते"
          ],
          simplePoints: [
            "🌬️ वनस्पती हवेतून कार्बन डायऑक्साइड वायू शोषून घेतात",
            "🍳 रुबिस्को नावाचा मुख्य विकर सर्व घटक एकत्र मिसळतो",
            "🍬 यातून गोड ग्लुकोज तयार होते, ज्यामुळे झाडे वाढतात व फळे येतात!"
          ],
          narration: "केल्व्हिन चक्रामध्ये, रुबिस्को विकर हवेतील कार्बन डायऑक्साइडचे ग्लुकोजमध्ये रूपांतर करतो. हा ग्लुकोज वनस्पतींच्या वाढीसाठी आणि पृथ्वीवरील सर्व सजीवांसाठी मुख्य अन्नस्रोत आहे.",
          simpleNarration: "आता स्वयंपाकाचा शेवटचा टप्पा! झाड हवेतील कार्बन डायऑक्साइड घेते, त्याला चार्ज झालेल्या बॅटरीच्या ऊर्जेत मिसळते आणि गोड ग्लुकोज साखर बनवते!"
        }
      ],
      quiz: {
        question: "वनस्पती पेशींमध्ये प्रकाश संश्लेषणाची प्रक्रिया कोणत्या अंगकामध्ये घडते?",
        options: ["तंतुकणिका (Mitochondria)", "हरितलवक (Chloroplast)", "केंद्रक (Nucleus)", "रायबोसोम (Ribosome)"],
        explanation: "हरितलवकामध्ये (Chloroplast) हरितद्रव्य असते, जे सूर्यप्रकाश शोषून ग्लुकोज तयार करते."
      }
    },
    hi: {
      title: "प्रकाश संश्लेषण: पृथ्वी का सौर ऊर्जा रूपांतरण",
      category: "जीव विज्ञान (Biology)",
      simpleHeadline: "पौधे धूप से अपना भोजन कैसे बनाते हैं!",
      scenes: [
        {
          title: "परिचय: सूर्य के प्रकाश का उपयोग",
          headline: "पृथ्वी का सबसे महत्वपूर्ण जैविक इंजन",
          simpleTitle: "धूप से भोजन: प्रकृति की सौर रसोई",
          simpleHeadline: "पेड़-पौधे सौर ऊर्जा से चलने वाले शेफ हैं!",
          animationType: "biological-sunlight",
          formula: "6CO₂ + 6H₂O + धूप → C₆H₁₂O₆ + 6O₂",
          diagramNodes: [
            { label: "सौर फोटॉन (hν)", color: "#F4C95D", x: 25, y: 35 },
            { label: "क्लोरोप्लास्ट स्ट्रोमा", color: "#5F9F7A", x: 50, y: 65 },
            { label: "शुद्ध ऑक्सीजन (O₂)", color: "#3AA6A0", x: 75, y: 35 }
          ],
          points: [
            "प्रकाश संश्लेषण सौर ऊर्जा को ग्लूकोज में रासायनिक ऊर्जा के रूप में बदलता है",
            "यह मुख्य रूप से पत्तियों के भीतर क्लोरोप्लास्ट अंगक में होता है",
            "यह पृथ्वी पर जीवन के लिए आवश्यक ऑक्सीजन (O₂) का उत्पादन करता है"
          ],
          simplePoints: [
            "☀️ सूरज पौधों को चमकीली धूप की ऊर्जा देता है",
            "🍃 हरी पत्तियां सोलर पैनल की तरह धूप को पकड़ती हैं",
            "💨 पौधे कार्बन डाइऑक्साइड सोखकर हमें सांस लेने के लिए ताजा ऑक्सीजन देते हैं!"
          ],
          narration: "प्रकाश संश्लेषण के इस अध्याय में आपका स्वागत है। हरी पत्तियों के अंदर क्लोरोप्लास्ट सूर्य के प्रकाश, पानी और कार्बन डाइऑक्साइड को मिलाकर ग्लूकोज और ऑक्सीजन बनाते हैं।",
          simpleNarration: "सोचिए अगर आप सिर्फ धूप में खड़े होकर अपना पसंदीदा खाना बना सकें! पौधे यही करते हैं। वे धूप और पानी से स्वादिष्ट ग्लूकोज बनाते हैं और हमें ताज़ा हवा देते हैं!"
        },
        {
          title: "चरण 1: प्रकाश-निर्भर अभिक्रियाएं",
          headline: "थायलाकोइड झिल्ली में ऊर्जा का संचय",
          simpleTitle: "चरण 1: रोशनी से पानी का टूटना",
          simpleHeadline: "पानी टूटता है और ताज़ी ऑक्सीजन हवा में फैलती है",
          animationType: "chloroplast-thylakoid",
          formula: "2H₂O + 2NADP⁺ + 3ADP + 3Pᵢ → O₂ + 2NADPH + 3ATP",
          diagramNodes: [
            { label: "जल अणु (H₂O)", color: "#3AA6A0", x: 25, y: 40 },
            { label: "थायलाकोइड अपघटन", color: "#5F9F7A", x: 50, y: 60 },
            { label: "ऊर्जा बैटरी (ATP)", color: "#F4C95D", x: 75, y: 40 }
          ],
          points: [
            "क्लोरोफिल वर्णक नीले और लाल प्रकाश को अवशोषित करता है",
            "पानी के अणुओं का प्रकाश-अपघटन होकर ऑक्सीजन गैस निकलती है",
            "ATP और NADPH अणुओं में ऊर्जा संचित होती है"
          ],
          simplePoints: [
            "💧 पानी की बूंदें पत्ती के अंदर धूप से मिलती हैं",
            "⚡ पानी टूटता है और ऑक्सीजन हवा में उड़ जाती है",
            "🔋 कोशिका की नन्ही बैटरियां (ATP) पूरी तरह चार्ज हो जाती हैं!"
          ],
          narration: "पहले चरण में थायलाकोइड झिल्ली पर प्रकाश ऊर्जा से पानी के अणु टूटते हैं, जिससे ऑक्सीजन मुक्त होती है और रासायनिक ऊर्जा बनती है।",
          simpleNarration: "पत्ती के अंदर थायलाकोइड नामक नन्हे सिक्के होते हैं। जैसे ही धूप उन पर पड़ती है, ऑक्सीजन बुलबुले हवा में उड़ते हैं और कोशिका की बैटरी चार्ज हो जाती है!"
        },
        {
          title: "चरण 2: कैल्विन चक्र (प्रकाश-अनिर्भर)",
          headline: "स्ट्रोमा में ग्लूकोज का संश्लेषण",
          simpleTitle: "चरण 2: मीठा भोजन बनाना",
          simpleHeadline: "हवा और ऊर्जा मिलकर ग्लूकोज बनाती हैं",
          animationType: "molecular-cycle",
          formula: "3CO₂ + 9ATP + 6NADPH → G3P + 9ADP + 8Pᵢ + 6NADP⁺",
          diagramNodes: [
            { label: "हवा से CO₂", color: "#718078", x: 25, y: 35 },
            { label: "रुबिस्को एंजाइम", color: "#F4C95D", x: 50, y: 65 },
            { label: "मीठा ग्लूकोज (C₆H₁₂O₆)", color: "#3AA6A0", x: 75, y: 35 }
          ],
          points: [
            "क्लोरोप्लास्ट के स्ट्रोमा में बिना सीधी रोशनी के होता है",
            "रुबिस्को एंजाइम कार्बन डाइऑक्साइड को स्थिर करता है",
            "ATP का उपयोग करके ग्लूकोज का निर्माण होता है"
          ],
          simplePoints: [
            "🌬️ पौधा हवा से कार्बन डाइऑक्साइड लेता है",
            "🍳 रुबिस्को शेफ सब कुछ मिलाकर पकाता है",
            "🍬 मीठा ग्लूकोज तैयार होकर फल और लकड़ी बनाता है!"
          ],
          narration: "कैल्विन चक्र के दौरान रुबिस्को एंजाइम कार्बन डाइऑक्साइड को ग्लूकोज में परिवर्तित करता है, जो पौधे का मुख्य भोजन बनता है।",
          simpleNarration: "अब रुबिस्को शेफ हवा से कार्बन लेकर और बैटरी ऊर्जा मिलाकर पौधे के लिए स्वादिष्ट मीठा ग्लूकोज तैयार करता है!"
        }
      ],
      quiz: {
        question: "पौधों की कोशिकाओं में प्रकाश संश्लेषण किस अंगक में होता है?",
        options: ["माइटोकॉन्ड्रिया", "क्लोरोप्लास्ट", "केन्द्रक", "राइबोसोम"],
        explanation: "क्लोरोप्लास्ट में क्लोरोफिल होता है जो धूप को अवशोषित करके भोजन बनाता है।"
      }
    }
  },

  blackHole: {
    aliases: ['black hole', 'black holes', 'blackhole', 'blackholes', 'singularity', 'event horizon', 'ब्लैक होल', 'कृष्णविवर', 'ব্ল্যাক হোল', 'கருந்துளை', 'కృష్ణ బిలం'],
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
          formula: "M_{\\text{core}} > M_{\\text{TOV}} \\approx 2.17 M_\\odot \\implies \\text{Collapse}",
          diagramNodes: [
            { label: "Supermassive Star", color: "#F59E0B", x: 25, y: 40 },
            { label: "Core Infall", color: "#8B5CF6", x: 50, y: 65 },
            { label: "Singularity", color: "#00E5FF", x: 75, y: 40 }
          ],
          points: [
            "Supermassive stars collapse inward once nuclear fusion fuel is exhausted",
            "Core density overcomes all resistance, collapsing infinitely",
            "Forms an infinitesimally small, infinitely dense Singularity"
          ],
          simplePoints: [
            "⭐ A colossal star runs out of fuel and suddenly collapses inward",
            "🏋️ Gravity squeezes billions of tons of matter into a microscopic point",
            "🕳️ It becomes so immensely heavy that space itself gets bent!"
          ],
          narration: "A black hole is born when a colossal star exhausts its nuclear fuel. Inward gravity overpowers all atomic forces, crushing billions of tons of matter into an infinitely dense singularity point.",
          simpleNarration: "Imagine a giant star twenty times bigger than our Sun! When it runs out of fuel, its own gravity crushes it into a super-dense dot called a singularity!"
        },
        {
          title: "The Event Horizon & Accretion Disk",
          headline: "The Cosmic Point of No Return",
          simpleTitle: "The Invisible Point of No Return",
          simpleHeadline: "Even speedy light beams get trapped forever!",
          animationType: "black-hole-event-horizon",
          formula: "R_s = \\frac{2GM}{c^2} \\quad (\\text{Schwarzschild Radius})",
          diagramNodes: [
            { label: "Accretion Disk", color: "#F4C95D", x: 25, y: 35 },
            { label: "Event Horizon", color: "#8E44AD", x: 50, y: 65 },
            { label: "Plasma Jets", color: "#00E5FF", x: 75, y: 35 }
          ],
          points: [
            "The Event Horizon marks the boundary where escape velocity equals light speed",
            "Superheated gas swirls in an accretion disk at relativistic speeds",
            "Calculated using Schwarzschild's general relativity solution"
          ],
          simplePoints: [
            "🛑 The Event Horizon is the ultimate danger line in space",
            "🚀 Even the fastest laser light beam cannot escape after crossing it",
            "🌌 Glowing swirling plasma rings orbit around the dark center!"
          ],
          narration: "Surrounding the black hole is the Event Horizon. Once anything crosses this boundary—even light traveling at three hundred thousand kilometers per second—it can never return.",
          simpleNarration: "Around the black hole is an invisible border called the Event Horizon. Once a spaceship or light beam crosses it, nothing in the universe is fast enough to get back out!"
        }
      ],
      quiz: {
        question: "What defines the Event Horizon boundary of a black hole?",
        options: [
          "The surface of nuclear fusion",
          "The threshold where escape velocity equals the speed of light",
          "The outer boundary of asteroid rings",
          "The frozen iron shell of the star"
        ],
        explanation: "The Event Horizon is the boundary where escape velocity equals the speed of light, preventing even light from escaping."
      }
    },
    mr: {
      title: "कृष्णविवर (Black Holes): स्पेस-टाइम आणि अनंत गुरुत्वाकर्षण",
      category: "खगोल भौतिकशास्त्र (Astrophysics)",
      simpleHeadline: "विश्वातील सर्वात शक्तिशाली गुरुत्वाकर्षण सापळा!",
      scenes: [
        {
          title: "कृष्णविवराची निर्मिती",
          headline: "प्रचंड ताऱ्यांचा स्वतःच्या गुरुत्वाकर्षणाखाली संकोच",
          simpleTitle: "महाकाय ताऱ्याचे कृष्णविवरात रूपांतर",
          simpleHeadline: "कल्पना करा एव्हरेस्ट पर्वताला वाळूच्या कणात दाबल्यासारखे!",
          animationType: "black-hole-collapse",
          formula: "M_{\\text{core}} > M_{\\text{TOV}} \\approx 2.17 M_\\odot \\implies \\text{अनंत संकोच}",
          diagramNodes: [
            { label: "मृत्यू पावणारा तारा", color: "#F59E0B", x: 25, y: 40 },
            { label: "गाभ्याचा संकोच", color: "#8B5CF6", x: 50, y: 65 },
            { label: "सिंग्युलॅरिटी बिंदू", color: "#00E5FF", x: 75, y: 40 }
          ],
          points: [
            "महाकाय ताऱ्यांचे अणुकेंद्रकीय इंधन संपल्यावर ते स्वतःच्या आत कोसळतात",
            "गाभ्याची घनता अमर्याद वाढून एका सूक्ष्म बिंदूत रूपांतरित होते",
            "यामुळे स्पेस-टाइममध्ये अनंत घनतेचा सिंग्युलॅरिटी बिंदू तयार होतो"
          ],
          simplePoints: [
            "⭐ सूर्यापेक्षा वीस पट मोठा तारा इंधन संपल्यावर आत कोसळतो",
            "🏋️ अब्जावधी टन वस्तुमान एका सूक्ष्म कणात दाबले जाते",
            "🕳️ ते इतके वजनदार होते की भोवतालची जागा वाकवून टाकते!"
          ],
          narration: "कृष्णविवराचा जन्म एका महाकाय ताऱ्याच्या मृत्यूनंतर होतो. प्रचंड गुरुत्वाकर्षण सर्व अणूंच्या शक्तीवर मात करून अब्जावधी टन वस्तुमानाला एका सूक्ष्म आणि अथांग घनतेच्या बिंदूत रूपांतरित करते.",
          simpleNarration: "आपल्या सूर्यापेक्षा कितीतरी पट मोठा तारा जेव्हा म्हातारा होतो, तेव्हा त्याचे स्वतःचे वजन त्याला इतके दाबून टाकते की तो एका जादुई कृष्णविवरात बदलतो!"
        },
        {
          title: "इव्हेंट होरायझन: परत न येण्याची सीमा",
          headline: "जिथून प्रकाशालाही सुटका मिळत नाही अशी सीमा",
          simpleTitle: "अंतराळातील अदृश्य धोक्याची रेषा",
          simpleHeadline: "वेगाने जाणारा प्रकाशही इथे कायमचा अडकतो!",
          animationType: "black-hole-event-horizon",
          formula: "R_s = \\frac{2GM}{c^2} \\quad (\\text{श्वार्झशिल्ड त्रिज्या})",
          diagramNodes: [
            { label: "तप्त वायू चकती", color: "#F4C95D", x: 25, y: 35 },
            { label: "इव्हेंट होरायझन", color: "#8E44AD", x: 50, y: 65 },
            { label: "प्लाझ्मा जेट्स", color: "#00E5FF", x: 75, y: 35 }
          ],
          points: [
            "इव्हेंट होरायझन ही अशी सीमा आहे जिथे मुक्ती वेग प्रकाशाच्या वेगाएवढा होतो",
            "या सीमेच्या आत गेलेली कोणतीही वस्तू किंवा प्रकाश कधीही परत येऊ शकत नाही",
            "या सीमेभोवती अत्यंत वेगाने फिरणारी तप्त वायूची चकती असते"
          ],
          simplePoints: [
            "🛑 इव्हेंट होरायझन ही विश्वातील अंतिम धोक्याची सीमा आहे",
            "🚀 अगदी सर्वात वेगवान प्रकाशकिरणही ही रेषा ओलांडल्यावर परत येऊ शकत नाही",
            "🌌 भोवती फिरणारे प्लाझ्माचे तेजस्वी कडे एका अग्निमय भोवऱ्यासारखे दिसते!"
          ],
          narration: "कृष्णविवराभोवती इव्हेंट होरायझन ही सीमा असते. एकदा का प्रकाशानेही ही सीमा ओलांडली, की तो परत कधीच बाहेर पडू शकत नाही.",
          simpleNarration: "इव्हेंट होरायझन ही अंतराळातील एका धबधब्यासारखी आहे. या सीमेच्या आत गेलेले कोणतेही यान किंवा प्रकाश कधीही मागे फिरू शकत नाही!"
        }
      ],
      quiz: {
        question: "कृष्णविवराची 'इव्हेंट होरायझन' सीमा कशाने निश्चित होते?",
        options: [
          "अणुकेंद्रकीय संमीलनाचा पृष्ठभाग",
          "जिथे मुक्ती वेग प्रकाशाच्या वेगाइतका असतो ती सीमा",
          "लघुग्रहांच्या पट्ट्याची बाहेरील कडा",
          "गोठलेल्या लोखंडाचा थर"
        ],
        explanation: "इव्हेंट होरायझन ही अशी सीमा आहे जिथे मुक्ती वेग प्रकाशाच्या वेगाइतका असतो, त्यामुळे प्रकाशही बाहेर पडू शकत नाही."
      }
    },
    hi: {
      title: "ब्लैक होल्स: सिंगुलैरिटी और स्पेस-टाइम का रहस्य",
      category: "खगोल भौतिकी (Astrophysics)",
      simpleHeadline: "ब्रह्मांड के सबसे शक्तिशाली गुरुत्वाकर्षण दैत्य!",
      scenes: [
        {
          title: "ब्लैक होल का जन्म",
          headline: "विशाल तारों का गुरुत्वाकर्षण के कारण पतन",
          simpleTitle: "एक विशाल तारा ब्लैक होल कैसे बनता है",
          simpleHeadline: "एवरेस्ट पर्वत को रेत के दाने में दबाने जैसी कल्पना!",
          animationType: "black-hole-collapse",
          formula: "M_{\\text{core}} > M_{\\text{TOV}} \\approx 2.17 M_\\odot \\implies \\text{अनंत पतन}",
          diagramNodes: [
            { label: "मरता हुआ तारा", color: "#F59E0B", x: 25, y: 40 },
            { label: "कोर पतन", color: "#8B5CF6", x: 50, y: 65 },
            { label: "सिंगुलैरिटी", color: "#00E5FF", x: 75, y: 40 }
          ],
          points: [
            "विशाल तारे ईंधन समाप्त होने पर अंदर की ओर ढह जाते हैं",
            "अत्यधिक घनत्व के कारण एक सूक्ष्म सिंगुलैरिटी बिंदु बनता है",
            "यह स्पेस-टाइम में एक गहरा गुरुत्वाकर्षण गड्ढा बना देता है"
          ],
          simplePoints: [
            "⭐ एक विशाल तारा ईंधन खत्म होने पर अचानक अंदर ढह जाता है",
            "🏋️ अरबों टन वजन एक नन्हे बिंदु में समा जाता है",
            "🕳️ यह इतना भारी हो जाता है कि स्पेस को मोड़ देता है!"
          ],
          narration: "ब्लैक होल का निर्माण एक विशाल तारे के अंत से होता है। गुरुत्वाकर्षण सभी बलों पर हावी होकर करोड़ों टन पदार्थ को एक सूक्ष्म बिंदु में दबा देता है।",
          simpleNarration: "जब सूर्य से बहुत बड़ा तारा बूढ़ा होता है, तो वह अपने ही वजन से इतना पिचक जाता है कि ब्लैक होल बन जाता है!"
        }
      ],
      quiz: {
        question: "ब्लैक होल की 'इवेंट होराइजन' सीमा क्या दर्शाती है?",
        options: [
          "नाभिकीय संलयन की सतह",
          "वह सीमा जहां पलायन वेग प्रकाश की गति के बराबर होता है",
          "धूल के कणों की परिधि",
          "तारे की ठंडी बाहरी परत"
        ],
        explanation: "इवेंट होराइजन वह सीमा है जहां से प्रकाश भी बाहर नहीं निकल सकता।"
      }
    }
  },

  "newton's laws": {
    aliases: ['newton', 'newtons', 'newton laws', "newton's laws", 'newtons laws of motion', 'force', 'laws of motion', 'गति के नियम', 'न्यूटनचे नियम', 'নিউটনের গতিসূত্র'],
    category: "Physics",
    defaultTheme: "tech",
    en: {
      title: "Newton's Laws of Motion: Foundations of Mechanics",
      category: "Physics",
      simpleHeadline: "Why Things Move, Accelerate, and Push Back!",
      scenes: [
        {
          title: "First Law: Law of Inertia",
          headline: "Objects in Motion Stay in Motion Unless Acted Upon",
          simpleTitle: "The Lazy Rule of Objects",
          simpleHeadline: "Things love keeping doing what they are already doing!",
          animationType: "physics-inertia",
          formula: "\\sum \\vec{F} = 0 \\implies \\frac{d\\vec{v}}{dt} = 0",
          diagramNodes: [
            { label: "Mass", color: "#3B82F6", x: 25, y: 40 },
            { label: "Net Force = 0", color: "#10B981", x: 50, y: 60 },
            { label: "Constant Velocity", color: "#F59E0B", x: 75, y: 40 }
          ],
          points: [
            "An object at rest stays at rest unless acted upon by a net external force",
            "An object in motion continues moving at constant velocity in a straight line",
            "Inertia is directly proportional to mass"
          ],
          simplePoints: [
            "⚽ A ball stays totally still until you kick it",
            "🛸 In deep space, a spacecraft glides forever without burning fuel",
            "🛑 When a bus brakes suddenly, your body lurches forward!"
          ],
          narration: "Newton's First Law describes Inertia. An object will remain at rest or keep moving at constant velocity unless an external force acts upon it.",
          simpleNarration: "Newton's first law says objects are lazy! A toy car won't roll until you push it, and a hockey puck slides on ice until friction stops it!"
        },
        {
          title: "Second Law: Force and Acceleration (F = ma)",
          headline: "Acceleration is Proportional to Applied Force",
          simpleTitle: "Push Harder = Zoom Faster",
          simpleHeadline: "Heavy boxes need giant pushes to move!",
          animationType: "physics-fma",
          formula: "\\vec{F} = m \\cdot \\vec{a}",
          diagramNodes: [
            { label: "Applied Force", color: "#F59E0B", x: 25, y: 35 },
            { label: "Mass (m)", color: "#3B82F6", x: 50, y: 65 },
            { label: "Acceleration (a)", color: "#10B981", x: 75, y: 35 }
          ],
          points: [
            "Net force equals mass multiplied by acceleration",
            "Greater mass requires more force for the same acceleration",
            "Force is measured in Newtons (N)"
          ],
          simplePoints: [
            "🛒 Pushing an empty cart is easy, but a loaded heavy cart needs big muscle power!",
            "🏎️ Sports cars zoom faster because they are light and have strong engines",
            "⚡ Double the push, double the speed!"
          ],
          narration: "Newton's Second Law quantifies motion: Force equals mass times acceleration. Greater force causes greater speed changes.",
          simpleNarration: "Pushing an empty bicycle is super easy, but pushing a heavy bus takes huge force to get it rolling!"
        },
        {
          title: "Third Law: Action and Reaction",
          headline: "Every Action Has an Equal and Opposite Reaction",
          simpleTitle: "The Great Push-Back Rule",
          simpleHeadline: "When you push a wall, it pushes you right back!",
          animationType: "physics-action-reaction",
          formula: "\\vec{F}_{AB} = -\\vec{F}_{BA}",
          diagramNodes: [
            { label: "Action Force", color: "#F59E0B", x: 30, y: 50 },
            { label: "Interface", color: "#3B82F6", x: 50, y: 50 },
            { label: "Reaction Force", color: "#10B981", x: 70, y: 50 }
          ],
          points: [
            "Forces always occur in matched equal and opposite pairs",
            "Powers rocket propulsion into orbit",
            "Swimming relies on pushing water backward to move forward"
          ],
          simplePoints: [
            "🚀 Rockets blast fire downward to shoot upward into space!",
            "🏊 Swimmers push water backward to glide forward",
            "🛹 Jump off a skateboard and the board shoots backward!"
          ],
          narration: "Newton's Third Law states that every action force generates an equal and opposite reaction force, propelling rockets into space.",
          simpleNarration: "Every push has an equal opposite push! If you let go of a blown-up balloon, air shoots backward and the balloon flies forward!"
        }
      ],
      quiz: {
        question: "If you double the net force on an object of fixed mass, what happens to its acceleration?",
        options: ["It is cut in half", "It doubles", "It stays the same", "It drops to zero"],
        explanation: "Since a = F/m, doubling force F with constant mass m directly doubles acceleration a."
      }
    },
    mr: {
      title: "न्यूटनचे गतिविषयक नियम: भौतिकशास्त्राचा पाया",
      category: "भौतिकशास्त्र (Physics)",
      simpleHeadline: "वस्तू का हलतात आणि बल कसे कार्य करते!",
      scenes: [
        {
          title: "पहिला नियम: जडत्वाचा नियम (Law of Inertia)",
          headline: "बाह्य बल कार्य करेपर्यंत वस्तूची गती स्थिर राहते",
          simpleTitle: "वस्तूंचा आळशीपणाचा नियम",
          simpleHeadline: "वस्तूंना ते जे करत आहेत तेच करत राहायला आवडते!",
          animationType: "physics-inertia",
          formula: "\\sum \\vec{F} = 0 \\implies \\frac{d\\vec{v}}{dt} = 0",
          diagramNodes: [
            { label: "स्थिर / गतिमान वस्तू", color: "#3B82F6", x: 25, y: 40 },
            { label: "बाह्य बल शून्य", color: "#10B981", x: 50, y: 60 },
            { label: "स्थिर गती (जडत्व)", color: "#F59E0B", x: 75, y: 40 }
          ],
          points: [
            "असंतुलित बाह्य बल कार्य करेपर्यंत स्थिर वस्तू स्थिर राहते",
            "गतिमान वस्तू सरळ रेषेत एकाच वेगाने पुढे जात राहते",
            "जडत्व हे वस्तूच्या वस्तुमानावर अवलंबून असते"
          ],
          simplePoints: [
            "⚽ मैदानावरील फुटबॉल जोपर्यंत लाथ मारत नाही तोपर्यंत हालत नाही",
            "🛸 अंतराळात यान इंधन न जाळता एकाच वेगाने पुढे जात राहते",
            "🛑 बसने अचानक ब्रेक लावताच आपले शरीर पुढे झुकते!"
          ],
          narration: "न्यूटनचा पहिला नियम जडत्वाचे वर्णन करतो. कोणतीही वस्तू जोपर्यंत बाह्य बल कार्य करत नाही तोपर्यंत तिच्या मूळ स्थितीतच राहते.",
          simpleNarration: "न्यूटनचा पहिला नियम सांगतो की वस्तू आळशी असतात! जोपर्यंत तुम्ही ढकलत नाही तोपर्यंत खेळणी हलत नाही!"
        },
        {
          title: "दुसरा नियम: बल आणि त्वरण (F = ma)",
          headline: "त्वरण हे प्रयुक्त बलाशी समप्रमाणात असते",
          simpleTitle: "जोरदार ढकला = वेगाने पळा",
          simpleHeadline: "जड वस्तू हलवण्यासाठी जास्त शक्ती लागते!",
          animationType: "physics-fma",
          formula: "\\vec{F} = m \\cdot \\vec{a}",
          diagramNodes: [
            { label: "प्रयुक्त बल (F)", color: "#F59E0B", x: 25, y: 35 },
            { label: "वस्तुमान (m)", color: "#3B82F6", x: 50, y: 65 },
            { label: "त्वरण (a)", color: "#10B981", x: 75, y: 35 }
          ],
          points: [
            "प्रयुक्त बल हे वस्तुमान आणि त्वरण यांच्या गुणाकाराएवढे असते",
            "जास्त वस्तुमानाच्या वस्तूला गती देण्यासाठी जास्त बल लागते",
            "बलाचे एकक न्यूटन (N) आहे"
          ],
          simplePoints: [
            "🛒 रिकामी ट्रॉली ढकलणे सोपे असते, पण भरलेली जड ट्रॉली ढकलायला ताकद लागते!",
            "🏎️ हलकी गाडी जड ट्रकापेक्षा वेगाने वेग पकडते",
            "⚡ बल दुप्पट करा, आणि गती दुप्पट वाढेल!"
          ],
          narration: "न्यूटनचा दुसरा नियम सांगतो: बल बरोबर वस्तुमान गुणिले त्वरण. वस्तूवर जास्त बल लावले की तिचा वेग वेगाने बदलतो.",
          simpleNarration: "हलकी सायकल चालवणे खूप सोपे असते, पण जड बस हलवण्यासाठी खूप जास्त ताकद लागते!"
        },
        {
          title: "तिसरा नियम: क्रिया आणि प्रतिक्रिया",
          headline: "प्रत्येक क्रियेला समान व विरुद्ध प्रतिक्रिया असते",
          simpleTitle: "प्रतिसाद देण्याचा नियम",
          simpleHeadline: "भिंतीला ढकलले की भिंतही आपल्याला मागे ढकलते!",
          animationType: "physics-action-reaction",
          formula: "\\vec{F}_{AB} = -\\vec{F}_{BA}",
          diagramNodes: [
            { label: "क्रिया बल", color: "#F59E0B", x: 30, y: 50 },
            { label: "संपर्क पृष्ठभाग", color: "#3B82F6", x: 50, y: 50 },
            { label: "प्रतिक्रिया बल", color: "#10B981", x: 70, y: 50 }
          ],
          points: [
            "बले नेहमी समान आणि विरुद्ध दिशेच्या जोड्यांमध्ये कार्य करतात",
            "रॉकेटचे उड्डाण याच नियमावर चालते",
            "पोहताना पाणी मागे ढकलले की शरीर पुढे जाते"
          ],
          simplePoints: [
            "🚀 रॉकेट धूर खाली सोडते आणि आकाशात झेपावते!",
            "🏊 पोहताना आपण पाणी मागे ढकलतो आणि पुढे जातो",
            "🛹 स्केटबोर्डवरून उडी मारली की बोर्ड मागे धावतो!"
          ],
          narration: "न्यूटनचा तिसरा नियम सांगतो की प्रत्येक क्रियेला तेवढीच समान आणि विरुद्ध प्रतिक्रिया असते. यामुळेच रॉकेट अवकाशात उड्डाण करू शकते.",
          simpleNarration: "प्रत्येक कृतीला उलटी प्रतिक्रिया असते! फुग्यातील हवा मागे सोडली की फुगा वेगाने पुढे पळतो!"
        }
      ],
      quiz: {
        question: "न्यूटनच्या दुसऱ्या नियमानुसार, वस्तुमान स्थिर ठेवून बल दुप्पट केल्यास त्वरणावर काय परिणाम होतो?",
        options: ["त्वरण निम्मे होते", "त्वरण दुप्पट होते", "त्वरण तेवढेच राहते", "त्वरण शून्य होते"],
        explanation: "F = ma नुसार, वस्तुमान m स्थिर असल्यास बल F दुप्पट केल्यास त्वरण a देखील दुप्पट होते."
      }
    },
    hi: {
      title: "न्यूटन के गति के नियम (Newton's Laws of Motion)",
      category: "भौतिक विज्ञान (Physics)",
      simpleHeadline: "चीजें क्यों चलती हैं और बल कैसे काम करता है?",
      scenes: [
        {
          title: "पहला नियम: जड़त्व का नियम",
          headline: "बाहरी बल के बिना गति स्थिर रहती है",
          simpleTitle: "चीजों का आलसी नियम",
          simpleHeadline: "चीजें वही करना चाहती हैं जो वे कर रही हैं!",
          animationType: "physics-inertia",
          formula: "\\sum \\vec{F} = 0 \\implies \\frac{d\\vec{v}}{dt} = 0",
          diagramNodes: [
            { label: "वस्तु", color: "#3B82F6", x: 25, y: 40 },
            { label: "बल = 0", color: "#10B981", x: 50, y: 60 },
            { label: "स्थिर गति", color: "#F59E0B", x: 75, y: 40 }
          ],
          points: [
            "स्थिर वस्तु स्थिर रहती है और गतिमान वस्तु सीधी रेखा में चलती रहती है",
            "जब तक कि उस पर कोई बाहरी असंतुलित बल न लगे",
            "जड़त्व द्रव्यमान पर निर्भर करता है"
          ],
          simplePoints: [
            "⚽ गेंद तब तक नहीं हिलती जब तक लात न मारी जाए",
            "🛸 अंतरिक्ष में यान बिना ईंधन खर्च किए चलता रहता है",
            "🛑 बस के ब्रेक लगते ही शरीर आगे झुकता है!"
          ],
          narration: "न्यूटन का पहला नियम जड़त्व का वर्णन करता है। बाहरी बल के बिना कोई भी वस्तु अपनी स्थिति नहीं बदलती।",
          simpleNarration: "न्यूटन का पहला नियम कहता है कि वस्तुएं आलसी होती हैं! जब तक आप धक्का नहीं देते, वे नहीं हिलतीं!"
        }
      ],
      quiz: {
        question: "यदि द्रव्यमान स्थिर हो और बल दोगुना कर दिया जाए, तो त्वरण पर क्या असर होगा?",
        options: ["आधा हो जाएगा", "दोगुना हो जाएगा", "समान रहेगा", "शून्य हो जाएगा"],
        explanation: "F = ma के अनुसार, बल दोगुना करने पर त्वरण भी दोगुना हो जाता है।"
      }
    }
  }
};

/**
 * Procedural Dynamic Translator for ANY Topic and ANY Language.
 * Produces high-quality, student-friendly localized lessons in the selected language.
 */
export function translateVideoContent(videoData, targetLanguageCode = 'en') {
  if (!videoData) return null;
  const lang = (targetLanguageCode || 'en').toLowerCase().trim();
  const topicKey = (videoData.topic || '').toLowerCase().trim();

  // 1. Curated database check
  for (const [key, data] of Object.entries(MULTILINGUAL_DATA)) {
    if (matchTopicWithBlueprint(topicKey, data, key)) {
      const localized = data[lang];
      if (localized) {
        return {
          ...videoData,
          language: lang,
          languageCode: lang,
          title: localized.title || videoData.title,
          category: localized.category || videoData.category,
          simpleHeadline: localized.simpleHeadline || videoData.simpleHeadline,
          scenes: videoData.scenes.map((origScene, idx) => {
            const locScene = localized.scenes?.[idx] || origScene;
            const narr = locScene.narration || origScene.narration;
            const simpleNarr = locScene.simpleNarration || origScene.simpleNarration;
            return {
              ...origScene,
              title: locScene.title || origScene.title,
              headline: locScene.headline || origScene.headline,
              simpleTitle: locScene.simpleTitle || origScene.simpleTitle,
              simpleHeadline: locScene.simpleHeadline || origScene.simpleHeadline,
              points: locScene.points || origScene.points,
              simplePoints: locScene.simplePoints || origScene.simplePoints,
              narration: narr,
              simpleNarration: simpleNarr,
              phoneticNarration: locScene.phoneticNarration || transliterateIndicToPhonetic(narr),
              simplePhoneticNarration: locScene.simplePhoneticNarration || transliterateIndicToPhonetic(simpleNarr),
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

  // 2. Procedural dynamic generation for Custom Topics in Selected Language
  const topicName = videoData.topic || 'संकल्पना';

  if (lang === 'mr') {
    return {
      ...videoData,
      language: 'mr',
      languageCode: 'mr',
      title: `${topicName}: सर्वसमावेशक सचित्र व्हिडिओ व्याख्यान`,
      category: "शैक्षणिक व वैज्ञानिक अभ्यास",
      simpleHeadline: `${topicName} सोप्या भाषेत समजून घ्या!`,
      scenes: videoData.scenes.map((s, idx) => ({
        ...s,
        title: idx === 0 ? `प्रस्तावना: ${topicName} ची मूळ संकल्पना` : idx === 1 ? `कार्यपद्धती आणि मुख्य सिद्धांत` : idx === 2 ? `सखोल विश्लेषण व दैनंदिन उपयोग` : `निष्कर्ष आणि महत्त्वाचे मुद्दे`,
        simpleTitle: idx === 0 ? `सोपी ओळख: ${topicName}` : idx === 1 ? `हे कसे कार्य करते?` : idx === 2 ? `रोजच्या आयुष्यातील उदाहरणे` : `लक्षात ठेवण्यासारख्या गोष्टी`,
        headline: `${topicName} चे मूलभूत घटक आणि वैज्ञानिक नियम`,
        simpleHeadline: `दैनंदिन जीवनातील सोप्या उदाहरणांसह समजून घ्या`,
        points: [
          `${topicName} हा आधुनिक विज्ञान आणि शालेय अभ्यासक्रमातील एक अत्यंत महत्त्वाचा भाग आहे`,
          `हा विषय विविध नैसर्गिक नियम आणि सिद्धांतांचा पद्धतशीर अभ्यास करण्यास मदत करतो`,
          `याचा सखोल अभ्यास केल्याने व्यावहारिक समस्यांचे अचूक समाधान शोधता येते`
        ],
        simplePoints: [
          `💡 ${topicName} हा निसर्गाचा आणि विज्ञानाचा खूप सुंदर नियम आहे`,
          `⚙️ सर्व भाग एकत्र येऊन अचूक संतुलन राखतात`,
          `🎯 हे समजल्यामुळे आपल्याला नवीन शोध लावण्याची प्रेरणा मिळते!`
        ],
        narration: idx === 0
          ? `नमस्कार! आज आपण ${topicName} या विषयाचा सविस्तर आणि रंजक अभ्यास करणार आहोत. हा विषय आपल्या अभ्यासातील एक अत्यंत महत्त्वाचा पाया आहे.`
          : idx === 1
            ? `${topicName} च्या कार्यपद्धतीमध्ये अनेक घटक परस्पर क्रिया करून अचूक समतोल निर्माण करतात.`
            : idx === 2
              ? `प्रायोगिक निरीक्षणे आणि सिद्धांतांची तुलना केल्यास ${topicName} चे अनेक उपयुक्त परिणाम समोर येतात.`
              : `थोडक्यात सांगायचे तर, ${topicName} चे ज्ञान आधुनिक विज्ञान, तंत्रज्ञान आणि प्रगतीसाठी अत्यंत मोलाचे आहे.`,
        simpleNarration: idx === 0
          ? `हॅलो मित्रांनो! आज आपण ${topicName} एका छान गोष्टीसारखा अगदी सोप्या भाषेत समजून घेणार आहोत!`
          : idx === 1
            ? `जसे सायकलचे चाक आणि पॅडल एकत्र फिरतात, तसेच ${topicName} चे सर्व नियम एकत्र मिळून काम करतात.`
            : idx === 2
              ? `आपल्या आजूबाजूला पाहिल्यास ${topicName} ची अनेक सुंदर उदाहरणे आपल्याला पाहायला मिळतात.`
              : `तर पाहिलेत मित्रांनो, ${topicName} समजून घेणे किती सोपे आणि मजेदार होते!`
      })),
      quiz: {
        question: `${topicName} चा सखोल अभ्यास करण्याचा मुख्य फायदा काय आहे?`,
        options: [
          `यामुळे संकल्पनांची अचूक समज निर्माण होते आणि समस्या सोडवणे सोपे होते`,
          `याचा दैनंदिन जीवनात कोणताही उपयोग नाही`,
          `हा कोणत्याही नियमाशिवाय यादृच्छिकपणे चालतो`,
          `हा केवळ प्रयोगशाळेपुरता मर्यादित आहे`
        ],
        correctIndex: 0,
        explanation: `${topicName} चे मूलभूत नियम आपल्याला खऱ्या जगातील समस्या सोडवण्याची आणि विश्लेषणात्मक विचार करण्याची क्षमता देतात.`
      }
    };
  }

  if (lang === 'hi') {
    return {
      ...videoData,
      language: 'hi',
      languageCode: 'hi',
      title: `${topicName}: सम्पूर्ण सचित्र वीडियो व्याख्यान`,
      category: "वैज्ञानिक एवं शैक्षणिक अध्ययन",
      simpleHeadline: `${topicName} को सबसे आसान तरीके से समझें!`,
      scenes: videoData.scenes.map((s, idx) => ({
        ...s,
        title: idx === 0 ? `परिचय: ${topicName} की मूल अवधारणा` : idx === 1 ? `कार्यप्रणाली एवं मुख्य सिद्धांत` : idx === 2 ? `गहन विश्लेषण एवं अनुप्रयोग` : `निष्कर्ष एवं महत्व`,
        simpleTitle: idx === 0 ? `सरल परिचय: ${topicName}` : idx === 1 ? `यह कैसे काम करता है?` : idx === 2 ? `सरल उदाहरण और उपयोग` : `याद रखने योग्य बातें`,
        headline: `${topicName} के प्रमुख घटक और नियम`,
        simpleHeadline: `दैनिक जीवन के आसान उदाहरणों के साथ`,
        points: [
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
          ? `नमस्ते! आज हम ${topicName} की विस्तृत और रोचक व्याख्या देखेंगे। यह विषय हमारे पाठ्यक्रम का अत्यंत महत्वपूर्ण स्तंभ है।`
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

  if (lang === 'bn') {
    return {
      ...videoData,
      language: 'bn',
      languageCode: 'bn',
      title: `${topicName}: সম্পূর্ণ সচিত্র ভিডিও পাঠ`,
      category: "বিজ্ঞান ও শিক্ষামূলক পাঠ্যক্রম",
      simpleHeadline: `${topicName} একদম সহজ ভাষায় বুঝুন!`,
      scenes: videoData.scenes.map((s, idx) => ({
        ...s,
        title: idx === 0 ? `ভূমিকা: ${topicName}-এর মূল ধারণা` : idx === 1 ? `কার্যপ্রণালী ও মূল তত্ত্ব` : idx === 2 ? `ব্যবহারিক প্রয়োগ ও উদাহরণ` : `উপসংহার ও গুরুত্ব`,
        simpleTitle: idx === 0 ? `সহজ পরিচিতি: ${topicName}` : idx === 1 ? `এটি কীভাবে কাজ করে?` : idx === 2 ? `বাস্তব উদাহরণ ও ব্যবহার` : `মনে রাখার বিষয়`,
        headline: `${topicName}-এর মূল উপাদান ও বৈজ্ঞানিক নিয়ম`,
        simpleHeadline: `দৈনন্দিন জীবনের সহজ উদাহরণের মাধ্যমে`,
        points: [
          `${topicName} আধুনিক বিজ্ঞান ও পাঠ্যক্রমের একটি গুরুত্বপূর্ণ বিষয়`,
          `এটি বিভিন্ন প্রাকৃতিক নিয়ম ও তত্ত্ব নিয়মতান্ত্রিকভাবে বুঝতে সাহায্য করে`,
          `বাস্তব সমস্যার নিখুঁত সমাধান খুঁজতে এর জ্ঞান অত্যন্ত কার্যকর`
        ],
        simplePoints: [
          `💡 ${topicName} প্রকৃতি এবং বিজ্ঞানের একটি খুব সহজ সুন্দর নিয়ম`,
          `⚙️ সমস্ত অংশ একসাথে ভারসাম্য বজায় রেখে কাজ করে`,
          `🎯 এটি বোঝার মাধ্যমে নতুন কিছু আবিষ্কারের অনুপ্রেরণা পাওয়া যায়!`
        ],
        narration: idx === 0
          ? `নমস্কার! আজ আমরা ${topicName} সম্পর্কে বিস্তারিত এবং আকর্ষণীয় আলোচনা করব। এটি আমাদের শিক্ষার একটি মূল স্তম্ভ।`
          : idx === 1
            ? `${topicName}-এর বিভিন্ন প্রক্রিয়া পরস্পরের সাথে ভারসাম্য বজায় রেখে সঠিকভাবে কাজ করে।`
            : idx === 2
              ? `বাস্তব ক্ষেত্রে এই তত্ত্ব প্রয়োগ করে আমরা নতুন সমাধান পেতে পারি।`
              : `সংক্ষেপে, ${topicName}-এর জ্ঞান আধুনিক বিজ্ঞান ও উন্নতির জন্য অত্যন্ত প্রয়োজনীয়।`,
        simpleNarration: idx === 0
          ? `হ্যালো বন্ধুরা! আজ আমরা ${topicName}-কে একটি সুন্দর গল্পের মতো খুব সহজে বুঝে নেব!`
          : idx === 1
            ? `সবকিছু একসাথে দল বেঁধে সুন্দরভাবে কাজ করে।`
            : idx === 2
              ? `আমাদের চারপাশে তাকালেই এই নিয়মের অনেক সুন্দর উদাহরণ দেখতে পাওয়া যায়।`
              : `তাহলে দেখলে তো, ${topicName} বোঝা কত সহজ ছিল!`
      })),
      quiz: {
        question: `${topicName} অধ্যয়নের মূল উদ্দেশ্য কী?`,
        options: [
          `সঠিক ধারণা তৈরি করা এবং সমস্যার সমাধান করা`,
          `এর কোনো ব্যবহার নেই`,
          `এটি কোনো নিয়ম ছাড়া কাজ করে`,
          `শুধুমাত্র মুখস্থ করা`
        ],
        correctIndex: 0,
        explanation: `${topicName} আমাদের বাস্তব জগৎকে বোঝার এবং সমস্যার সমাধান করার দক্ষতা দেয়।`
      }
    };
  }

  if (lang === 'pa') {
    return {
      ...videoData,
      language: 'pa',
      languageCode: 'pa',
      title: `${topicName}: ਪੂਰਾ ਸਚਿੱਤਰ ਵੀਡੀਓ ਪਾਠ`,
      category: "ਵਿਗਿਆਨਕ ਅਤੇ ਵਿੱਦਿਅਕ ਅਧਿਐਨ",
      simpleHeadline: `${topicName} ਨੂੰ ਬਿਲਕੁਲ ਆਸਾਨ ਭਾਸ਼ਾ ਵਿੱਚ ਸਮਝੋ!`,
      scenes: videoData.scenes.map((s, idx) => ({
        ...s,
        title: idx === 0 ? `ਜਾਣ-ਪਛਾਣ: ${topicName} ਦਾ ਮੂਲ ਸੰਕਲਪ` : idx === 1 ? `ਕਾਰਜਪ੍ਰਣਾਲੀ ਅਤੇ ਮੁੱਖ ਸਿਧਾਂਤ` : idx === 2 ? `ਵਿਹਾਰਕ ਉਪਯੋਗ ਅਤੇ ਉਦਾਹਰਣਾਂ` : `ਸਿੱਟਾ ਅਤੇ ਮਹੱਤਵ`,
        simpleTitle: idx === 0 ? `ਸੌਖੀ ਪਛਾਣ: ${topicName}` : idx === 1 ? `ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ?` : idx === 2 ? `ਰੋਜ਼ਾਨਾ ਜੀਵਨ ਦੀਆਂ ਉਦਾਹਰਣਾਂ` : `ਯਾਦ ਰੱਖਣ ਵਾਲੀਆਂ ਗੱਲਾਂ`,
        headline: `${topicName} ਦੇ ਮੁੱਖ ਤੱਤ ਅਤੇ ਵਿਗਿਆਨਕ ਨਿਯਮ`,
        simpleHeadline: `ਰੋਜ਼ਾਨਾ ਜੀਵਨ ਦੀਆਂ ਸੌਖੀਆਂ ਉਦਾਹਰਣਾਂ ਨਾਲ`,
        points: [
          `${topicName} ਆਧੁਨਿਕ ਵਿਗਿਆਨ ਅਤੇ ਪਾਠਕ੍ਰਮ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਹਿੱਸਾ ਹੈ`,
          `ਇਹ ਕੁਦਰਤੀ ਨਿਯਮਾਂ ਅਤੇ ਸਿਧਾਂਤਾਂ ਨੂੰ ਕ੍ਰਮਬੱਧ ਤਰੀਕੇ ਨਾਲ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ`,
          `ਇਸ ਦੇ ਅਧਿਐਨ ਨਾਲ ਵਿਹਾਰਕ ਸਮੱਸਿਆਵਾਂ ਦਾ ਹੱਲ ਸੰਭਵ ਹੁੰਦਾ ਹੈ`
        ],
        simplePoints: [
          `💡 ${topicName} ਕੁਦਰਤ ਅਤੇ ਵਿਗਿਆਨ ਦਾ ਇੱਕ ਬਹੁਤ ਹੀ ਸੌਖਾ ਨਿਯਮ ਹੈ`,
          `⚙️ ਸਾਰੇ ਹਿੱਸੇ ਆਪਸ ਵਿੱਚ ਮਿਲ ਕੇ ਸੰਤੁਲਨ ਬਣਾਉਂਦੇ ਹਨ`,
          `🎯 ਇਸ ਨਾਲ ਨਵੀਆਂ ਖੋਜਾਂ ਕਰਨ ਦੀ ਪ੍ਰੇਰਨਾ ਮਿਲਦੀ ਹੈ!`
        ],
        narration: idx === 0
          ? `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਅੱਜ ਅਸੀਂ ${topicName} ਬਾਰੇ ਵਿਸਥਾਰਪੂਰਵਕ ਅਤੇ ਦਿਲਚਸਪ ਪਾਠ ਦੇਖਾਂਗੇ। ਇਹ ਵਿਸ਼ਾ ਸਾਡੀ ਸਿੱਖਿਆ ਦੀ ਇੱਕ ਮਜ਼ਬੂਤ ਨੀਂਹ ਹੈ।`
          : idx === 1
            ? `${topicName} ਦੀ ਕਾਰਜਪ੍ਰਣਾਲੀ ਵਿੱਚ ਵੱਖ-ਵੱਖ ਤੱਤ ਮਿਲ ਕੇ ਇੱਕ ਸਹੀ ਸੰਤੁਲਨ ਬਣਾਉਂਦੇ ਹਨ।`
            : idx === 2
              ? `ਅਸਲ ਜ਼ਿੰਦਗੀ ਵਿੱਚ ਇਸ ਸਿਧਾਂਤ ਨੂੰ ਲਾਗੂ ਕਰਕੇ ਅਸੀਂ ਨਵੇਂ ਹੱਲ ਲੱਭ ਸਕਦੇ ਹਾਂ।`
              : `ਸੰਖੇਪ ਵਿੱਚ, ${topicName} ਦਾ ਗਿਆਨ ਆਧੁਨਿਕ ਵਿਗਿਆਨ ਅਤੇ ਤਰੱਕੀ ਲਈ ਬਹੁਤ ਮਹੱਤਵਪੂਰਨ ਹੈ।`,
        simpleNarration: idx === 0
          ? `ਹੈਲੋ ਦੋਸਤੋ! ਅੱਜ ਅਸੀਂ ${topicName} ਨੂੰ ਇੱਕ ਕਹਾਣੀ ਵਾਂਗ ਬਹੁਤ ਹੀ ਆਸਾਨ ਤਰੀਕੇ ਨਾਲ ਸਮਝਾਂਗੇ!`
          : idx === 1
            ? `ਜਿਵੇਂ ਸਾਈਕਲ ਦੇ ਪਹੀਏ ਅਤੇ ਪੈਡਲ ਰਲ ਕੇ ਚੱਲਦੇ ਹਨ, ਉਵੇਂ ਹੀ ${topicName} ਦੇ ਸਾਰੇ ਨਿਯਮ ਇਕੱਠੇ ਕੰਮ ਕਰਦੇ ਹਨ।`
            : idx === 2
              ? `ਸਾਡੇ ਆਲੇ-ਦੁਆਲੇ ਇਸ ਨਿਯਮ ਦੀਆਂ ਕਈ ਖੂਬਸੂਰਤ ਉਦਾਹਰਣਾਂ ਮਿਲਦੀਆਂ ਹਨ।`
              : `ਤਾਂ ਦੇਖਿਆ ਤੁਸੀਂ, ${topicName} ਨੂੰ ਸਮਝਣਾ ਕਿੰਨਾ ਆਸਾਨ ਸੀ!`
      })),
      quiz: {
        question: `${topicName} ਦਾ ਅਧਿਐਨ ਕਰਨ ਦਾ ਮੁੱਖ ਲਾਭ ਕੀ ਹੈ?`,
        options: [
          `ਸਹੀ ਸਮਝ ਬਣਾਉਣਾ ਅਤੇ ਅਸਲ ਸਮੱਸਿਆਵਾਂ ਨੂੰ ਹੱਲ ਕਰਨਾ`,
          `ਇਸਦਾ ਰੋਜ਼ਾਨਾ ਜੀਵਨ ਵਿੱਚ ਕੋਈ ਉਪਯੋਗ ਨਹੀਂ ਹੈ`,
          `ਇਹ ਬਿਨਾਂ ਕਿਸੇ ਨਿਯਮ ਦੇ ਕੰਮ ਕਰਦਾ ਹੈ`,
          `ਸਿਰਫ਼ ਪ੍ਰੀਖਿਆਵਾਂ ਵਿੱਚ ਰੱਟਾ ਲਗਾਉਣਾ`
        ],
        correctIndex: 0,
        explanation: `${topicName} ਸਾਨੂੰ ਅਸਲ ਸੰਸਾਰ ਨੂੰ ਸਮਝਣ ਅਤੇ ਵਿਸ਼ਲੇਸ਼ਣਾਤਮਕ ਸੋਚ ਵਿਕਸਿਤ ਕਰਨ ਦੀ ਯੋਗਤਾ ਦਿੰਦਾ ਹੈ।`
      }
    };
  }

  if (lang === 'ta') {
    return {
      ...videoData,
      language: 'ta',
      languageCode: 'ta',
      title: `${topicName}: முழுமையான அனிமேஷன் வீடியோ பாடம்`,
      category: "அறிவியல் மற்றும் கல்வி ஆய்வு",
      simpleHeadline: `${topicName} எளிய தமிழில் அறிவோம்!`,
      scenes: videoData.scenes.map((s, idx) => ({
        ...s,
        title: idx === 0 ? `அறிமுகம்: ${topicName} அடிப்படைக் கருத்து` : idx === 1 ? `செயல்முறை மற்றும் முதன்மைக் கோட்பாடு` : idx === 2 ? `நடைமுறைப் பயன்பாடுகள்` : `முடிவுரை மற்றும் முக்கியத்துவம்`,
        simpleTitle: idx === 0 ? `எளிய அறிமுகம்: ${topicName}` : idx === 1 ? `இது எவ்வாறு இயங்குகிறது?` : idx === 2 ? `வாழ்க்கை உதாரணங்கள்` : `நினைவில் கொள்ள வேண்டியவை`,
        headline: `${topicName} இன் முதன்மைக் கூறுகள் மற்றும் அறிவியல் விதிகள்`,
        simpleHeadline: `அன்றாட வாழ்வின் எளிய உதாரணங்களுடன்`,
        points: [
          `${topicName} நவீன அறிவியல் மற்றும் பாடத்திட்டத்தின் முக்கிய பகுதியாகும்`,
          `இயற்கை விதிகளை முறையான அணுகுமுறையுடன் புரிந்துகொள்ள ಇದು உதவுகிறது`,
          `இதன் மூலம் நடைமுறைச் சிக்கல்களுக்குச் சரியான தீர்வுகளைக் காணலாம்`
        ],
        simplePoints: [
          `💡 ${topicName} என்பது இயற்கையின் மிக அழகான அறிவியல் விதியாகும்`,
          `⚙️ அனைத்து கூறுகளும் இணைந்து சமநிலையை உருவாக்குகின்றன`,
          `🎯 புதிய கண்டுபிடிப்புகளை உருவாக்க ಇದು உதவுகிறது!`
        ],
        narration: idx === 0
          ? `வணக்கம்! இன்று நாம் ${topicName} பற்றிய விரிவான மற்றும் சுவாரஸ்யமான பாடத்தைக் கற்க உள்ளோம். இது நமது கல்வியின் முக்கியமான அடித்தளமாகும்.`
          : idx === 1
            ? `${topicName} இன் செயல்முறையில் பல்வேறு கூறுகள் இணைந்து துல்லியமான சமநிலையை ஏற்படுத்துகின்றன.`
            : idx === 2
              ? `நடைமுறைத் தளத்தில் இந்தக் கோட்பாட்டைப் பயன்படுத்துவதன் மூலம் புதிய தீர்வுகளை உருவாக்க முடியும்.`
              : `சுருக்கமாக, ${topicName} பற்றிய அறிவு நவீன அறிவியல் மற்றும் எதிர்கால வளர்ச்சிக்கு இன்றியமையாதது.`,
        simpleNarration: idx === 0
          ? `வணக்கம் நண்பர்களே! இன்று நாம் ${topicName} பற்றி ஒரு அழகான கதையைப் போல மிக எளிதாகப் புரிந்து கொள்ளப் போகிறோம்!`
          : idx === 1
            ? `சைக்கிள் பெடலும் சக்கரமும் இணைந்து இயங்குவது போல, ${topicName} இன் அனைத்து விதிகளும் இணைந்து செயல்படுகின்றன.`
            : idx === 2
              ? `நம்மைச் சுற்றிப் பார்த்தாலே இதன் பல அரிய உதாரணங்களைக் காண முடியும்.`
              : `பார்த்தீர்களா, ${topicName} ஐப் புரிந்துகொள்வது எவ்வளவு எளிதாகவும் சுவாரஸ்யமாகவும் இருந்தது!`
      })),
      quiz: {
        question: `${topicName} ஐக் கற்பதன் முதன்மையான நோக்கம் என்ன?`,
        options: [
          `சரியான புரிதலைப் பெற்று நடைமுறைச் சிக்கல்களைத் தீர்ப்பது`,
          `இதற்கு நடைமுறைப் பயன் எதுவும் இல்லை`,
          `இது எந்த விதியும் இல்லாமல் தன்னிச்சையாக இயங்குகிறது`,
          `மனப்பாடம் செய்வதற்கு மட்டுமே பயன்படுவது`
        ],
        correctIndex: 0,
        explanation: `${topicName} நமக்கு உலகத்தைப் புரிந்துகொள்ளும் அறிவையும் சிக்கல்களைத் தீர்க்கும் திறனையும் வழங்குகிறது.`
      }
    };
  }

  if (lang === 'te') {
    return {
      ...videoData,
      language: 'te',
      languageCode: 'te',
      title: `${topicName}: సమగ్ర యానిమేటెడ్ వీడియో పాఠం`,
      category: "శాస్త్రీయ మరియు విద్యా అధ్యయనం",
      simpleHeadline: `${topicName} సులభమైన తెలుగులో నేర్చుకోండి!`,
      scenes: videoData.scenes.map((s, idx) => ({
        ...s,
        title: idx === 0 ? `పరిచయం: ${topicName} ప్రాథమిక భావన` : idx === 1 ? `పనితీరు మరియు ముఖ్య సిద్ధాంతం` : idx === 2 ? `ఆచరణాత్మక ఉపయోగాలు` : `ముగింపు మరియు ప్రాముఖ్యత`,
        simpleTitle: idx === 0 ? `సరళ పరిచయం: ${topicName}` : idx === 1 ? `ఇది ఎలా పనిచేస్తుంది?` : idx === 2 ? `నిత్యజీవిత ఉదాహరణలు` : `గుర్తుంచుకోవలసిన విషయాలు`,
        headline: `${topicName} యొక్క ముఖ్య భాగాలు మరియు నియమాలు`,
        simpleHeadline: `దైనందిన జీవితంలోని సరళ ఉదాహరణలతో`,
        points: [
          `${topicName} ఆధునిక విజ్ఞానశాస్త్రం మరియు సిలబస్‌లో చాలా కీలకమైన అంశం`,
          `ఇది ప్రకృతి నియమాలను క్రమబద్ధంగా అర్థం చేసుకోవడానికి సహాయపడుతుంది`,
          `దీని అధ్యయనం ద్వారా వాస్తవ సమస్యలకు ఖచ్చితమైన పరిష్కారాలు లభిస్తాయి`
        ],
        simplePoints: [
          `💡 ${topicName} ప్రకృతిలోని ఒక అద్భుతమైన శాస్త్రీయ నియమం`,
          `⚙️ అన్ని భాగాలు కలిసి పరిపూర్ణ సమతుల్యతను కాపాడతాయి`,
          `🎯 ఇది నూతన ఆవిష్కరణలు చేయడానికి ప్రేరణనిస్తుంది!`
        ],
        narration: idx === 0
          ? `నమస్కారం! ఈ రోజు మనం ${topicName} గురించి సమగ్రంగా మరియు ఆసక్తికరంగా తెలుసుకుందాం. ఇది మన చదువులో ఎంతో ముఖ్యమైన పునాది.`
          : idx === 1
            ? `${topicName} పనితీరులో విభిన్న అంశాలు కలిసి కచ్చితమైన సమతుల్యతను ఏర్పరుస్తాయి.`
            : idx === 2
              ? `వాస్తవ జీవితంలో ఈ సూత్రాన్ని ఉపయోగించడం ద్వారా కొత్త ఫలితాలు సాధించవచ్చు.`
              : `సంగ్రహంగా చెప్పాలంటే, ${topicName} పరిజ్ఞానం ఆధునిక సైన్స్ మరియు అభివృద్ధికి ఎంతో అవసరం.`,
        simpleNarration: idx === 0
          ? `హలో ఫ్రెండ్స్! ఈ రోజు మనం ${topicName} ని ఒక మంచి కథలాగా చాలా సరళంగా అర్థం చేసుకుందాం!`
          : idx === 1
            ? `సైకిల్ పెడల్ మరియు చక్రం కలిసి తిరిగినట్లే, ${topicName} నియమాలన్నీ కలిసి పనిచేస్తాయి.`
            : idx === 2
              ? `మన చుట్టూ పరిశీలిస్తే దీనికి సంబంధించిన ఎన్నో అందమైన ఉదాహరణలు కనిపిస్తాయి.`
              : `చూశారుగా, ${topicName} ని అర్థం చేసుకోవడం ఎంత సులభమో!`
      })),
      quiz: {
        question: `${topicName} నేర్చుకోవడం వల్ల కలిగే ముఖ్య ప్రయోజనం ఏమిటి?`,
        options: [
          `ఖచ్చితమైన అవగాహన ఏర్పడి సమస్యలను సులభంగా పరిష్కరించడం`,
          `నిత్యజీవితంలో దీనివల్ల ఎలాంటి ఉపయోగం ఉండదు`,
          `ఇది ఎలాంటి నియమాలు లేకుండా యాదృచ్ఛికంగా జరుగుతుంది`,
          `కేవలం పరీక్షల కోసం బట్టీ పట్టడం`
        ],
        correctIndex: 0,
        explanation: `${topicName} వాస్తవ ప్రపంచాన్ని అర్థం చేసుకోవడానికి మరియు విశ్లేషణాత్మక ఆలోచనను పెంపొందించడానికి తోడ్పడుతుంది.`
      }
    };
  }

  if (lang === 'kn') {
    return {
      ...videoData,
      language: 'kn',
      languageCode: 'kn',
      title: `${topicName}: ಸಮಗ್ರ ಅನಿಮೇಟೆಡ್ ವೀಡಿಯೊ ಪಾಠ`,
      category: "ವೈಜ್ಞಾನಿಕ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಅಧ್ಯಯನ",
      simpleHeadline: `${topicName} ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ!`,
      scenes: videoData.scenes.map((s, idx) => ({
        ...s,
        title: idx === 0 ? `ಪರಿಚಯ: ${topicName} ಮೂಲ ಪರಿಕಲ್ಪನೆ` : idx === 1 ? `ಕಾರ್ಯವಿಧಾನ ಮತ್ತು ಮುಖ್ಯ ಸಿದ್ಧಾಂತ` : idx === 2 ? `ಪ್ರಾಯೋಗಿಕ ಅನ್ವಯಗಳು` : `ಉಪಸಂಹಾರ ಮತ್ತು ಪ್ರಾಮುಖ್ಯತೆ`,
        simpleTitle: idx === 0 ? `ಸರಳ ಪರಿಚಯ: ${topicName}` : idx === 1 ? `ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?` : idx === 2 ? `ದೈನಂದಿನ ಜೀವನದ ಉದಾಹರಣೆಗಳು` : `ನೆನಪಿಡಬೇಕಾದ ಅಂಶಗಳು`,
        headline: `${topicName} ನ ಪ್ರಮುಖ ಅಂಶಗಳು ಮತ್ತು ನಿಯಮಗಳು`,
        simpleHeadline: `ದೈನಂದಿನ ಜೀವನದ ಸರಳ ಉದಾಹರಣೆಗಳೊಂದಿಗೆ`,
        points: [
          `${topicName} ಆಧುನಿಕ ವಿಜ್ಞಾನ ಮತ್ತು ಪಠ್ಯಕ್ರಮದ ಅತ್ಯಂತ ಪ್ರಮುಖ ಭಾಗವಾಗಿದೆ`,
          `ಇದು ನೈಸರ್ಗಿಕ ನಿಯಮಗಳನ್ನು ವ್ಯವಸ್ಥಿತವಾಗಿ ಅಧ್ಯಯನ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ`,
          `ಇದರ ಅಧ್ಯಯನದಿಂದ ನೈಜ ಸಮಸ್ಯೆಗಳಿಗೆ ಸೂಕ್ತ ಪರಿಹಾರ ಕಂಡುಕೊಳ್ಳಬಹುದು`
        ],
        simplePoints: [
          `💡 ${topicName} ಪ್ರಕೃತಿಯ ಒಂದು ಸುಂದರ ವೈಜ್ಞಾನಿಕ ನಿಯಮ`,
          `⚙️ ಎಲ್ಲಾ ಭಾಗಗಳು ಒಟ್ಟಾಗಿ ಪರಿಪೂರ್ಣ ಸಮತೋಲನ ಕಾಯ್ದುಕೊಳ್ಳುತ್ತವೆ`,
          `🎯 ಇದು ಹೊಸ ಆವಿಷ್ಕಾರಗಳನ್ನು ಮಾಡಲು ಸ್ಫೂರ್ತಿ ನೀಡುತ್ತದೆ!`
        ],
        narration: idx === 0
          ? `ನಮಸ್ಕಾರ! ಇಂದು ನಾವು ${topicName} ಕುರಿತು ಸಮಗ್ರ ಹಾಗೂ ಆಸಕ್ತಿದಾಯಕ ವಿವರಣೆಯನ್ನು ಕಲಿಯಲಿದ್ದೇವೆ. ಇದು ನಮ್ಮ ಕಲಿಕೆಯಲ್ಲಿ ಬಹಳ ಮಹತ್ವದ ವಿಷಯವಾಗಿದೆ.`
          : idx === 1
            ? `${topicName} ನ ಕಾರ್ಯವಿಧಾನದಲ್ಲಿ ವಿವಿಧ ಅಂಶಗಳು ಒಟ್ಟಾಗಿ ಕೆಲಸ ಮಾಡಿ ನಿಖರ ಸಮತೋಲನವನ್ನು ಉಂಟುಮಾಡುತ್ತವೆ.`
            : idx === 2
              ? `ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ಈ ಸಿದ್ಧಾಂತವನ್ನು ಅನ್ವಯಿಸುವುದರಿಂದ ಹೊಸ ಪರಿಹಾರಗಳನ್ನು ಕಂಡುಕೊಳ್ಳಬಹುದು.`
              : `ಸಂಕ್ಷಿಪ್ತವಾಗಿ ಹೇಳುವುದಾದರೆ, ${topicName} ನ ಜ್ಞಾನವು ಆಧುನಿಕ ವಿಜ್ಞಾನ ಮತ್ತು ಪ್ರಗತಿಗೆ ಅತ್ಯಗತ್ಯವಾಗಿದೆ.`,
        simpleNarration: idx === 0
          ? `ಹಲೋ ಸ್ನೇಹಿತರೇ! ಇಂದು ನಾವು ${topicName} ಅನ್ನು ಒಂದು ಸುಂದರ ಕಥೆಯಂತೆ ಅತ್ಯಂತ ಸರಳವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳೋಣ!`
          : idx === 1
            ? `ಸೈಕಲ್ ಪೆಡಲ್ ಮತ್ತು ಚಕ್ರ ಒಟ್ಟಿಗೆ ತಿರುಗುವಂತೆ, ${topicName} ನ ಎಲ್ಲಾ ನಿಯಮಗಳು ಒಟ್ಟಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತವೆ.`
            : idx === 2
              ? `ನಮ್ಮ ಸುತ್ತಮುತ್ತ ನೋಡಿದರೆ ಇದರ ಅನೇಕ ಸುಂದರ ಉದಾಹರಣೆಗಳು ಕಂಡುಬರುತ್ತವೆ.`
              : `ನೋಡಿದಿರಾ, ${topicName} ಅನ್ನು ಕಲಿಯುವುದು ಎಷ್ಟು ಸುಲಭವಾಗಿತ್ತು!`
      })),
      quiz: {
        question: `${topicName} ಅಧ್ಯಯನ ಮಾಡುವುದರ ಮುಖ್ಯ ಪ್ರಯೋಜನವೇನು?`,
        options: [
          `ನಿಖರ ತಿಳುವಳಿಕೆ ಪಡೆದು ನೈಜ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸುವುದು`,
          `ಇದರಿಂದ ಯಾವುದೇ ಪ್ರಯೋಜನವಿಲ್ಲ`,
          `ಇದು ಯಾವುದೇ ನಿಯಮವಿಲ್ಲದೆ ನಡೆಯುತ್ತದೆ`,
          `ಕೇವಲ ಪರೀಕ್ಷೆಗಾಗಿ ಕಂಠಪಾಠ ಮಾಡುವುದು`
        ],
        correctIndex: 0,
        explanation: `${topicName} ನೈಜ ಜಗತ್ತನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಸಮಸ್ಯೆ ಪರಿಹರಿಸುವ ಕೌಶಲ್ಯವನ್ನು ನೀಡುತ್ತದೆ.`
      }
    };
  }

  if (lang === 'gu') {
    return {
      ...videoData,
      language: 'gu',
      languageCode: 'gu',
      title: `${topicName}: સંપૂર્ણ સચિત્ર વિડિયો પાઠ`,
      category: "વૈજ્ઞાનિક અને શૈક્ષણિક અભ્યાસ",
      simpleHeadline: `${topicName} સરળ ભાષામાં સમજો!`,
      scenes: videoData.scenes.map((s, idx) => ({
        ...s,
        title: idx === 0 ? `પરિચય: ${topicName} નો મૂળ ખ્યાલ` : idx === 1 ? `કાર્યપદ્ધતિ અને મુખ્ય સિદ્ધાંત` : idx === 2 ? `વ્યવહારુ ઉપયોગો અને ઉદાહરણો` : `તારણ અને મહત્વ`,
        simpleTitle: idx === 0 ? `સરળ પરિચય: ${topicName}` : idx === 1 ? `આ કેવી રીતે કાર્ય કરે છે?` : idx === 2 ? `રોજિંદા જીવનના ઉદાહરણો` : `યાદ રાખવા જેવી બાબતો`,
        headline: `${topicName} ના મુખ્ય ઘટકો અને વૈજ્ઞાનિક નિયમો`,
        simpleHeadline: `રોજિંદા જીવનના સરળ ઉદાહરણો સાથે`,
        points: [
          `${topicName} આધુનિક વિજ્ઞાન અને અભ્યાસક્રમનો ખૂબ જ મહત્વપૂર્ણ ભાગ છે`,
          `તે કુદરતી નિયમો અને સિદ્ધાંતોને વ્યવસ્થિત રીતે સમજવામાં મદદ કરે છે`,
          `તેના અભ્યાસથી વ્યવહારુ સમસ્યાઓના સચોટ ઉકેલ મેળવી શકાય છે`
        ],
        simplePoints: [
          `💡 ${topicName} કુદરત અને વિજ્ઞાનનો એક ખૂબ જ સુંદર નિયમ છે`,
          `⚙️ બધા ભાગો ભેગા મળીને ચોક્કસ સંતુલન જાળવે છે`,
          `🎯 તેનાથી નવા સંશોધનો કરવાની પ્રેરણા મળે છે!`
        ],
        narration: idx === 0
          ? `નમસ્તે! આજે આપણે ${topicName} વિશે વિગતવાર અને રસપ્રદ અભ્યાસ કરીશું. આ વિષય આપણા શિક્ષણનો એક મહત્વપૂર્ણ પાયો છે.`
          : idx === 1
            ? `${topicName} ની કાર્યપદ્ધતિમાં વિવિધ ઘટકો એકસાથે મળીને ચોક્કસ સંતુલન બનાવે છે.`
            : idx === 2
              ? `રોજિંદા જીવનમાં આ સિદ્ધાંતનો ઉપયોગ કરીને આપણે નવી શોધો કરી શકીએ છીએ.`
              : `ટૂંકમાં, ${topicName} નું જ્ઞાન આધુનિક વિજ્ઞાન અને પ્રગતિ માટે અત્યંત જરૂરી છે.`,
        simpleNarration: idx === 0
          ? `હેલો મિત્રો! આજે આપણે ${topicName} ને એક સુંદર વાર્તાની જેમ ખૂબ જ સરળતાથી સમજીશું!`
          : idx === 1
            ? `જેમ સાયકલના પૈડા અને પેડલ સાથે મળીને ચાલે છે, તેમજ ${topicName} ના બધા નિયમો સાથે કામ કરે છે.`
            : idx === 2
              ? `આપણી આસપાસ પણ આ નિયમના ઘણા સુંદર ઉદાહરણો જોવા મળે છે.`
              : `તો જોયું મિત્રો, ${topicName} ને સમજવું કેટલું સરળ હતું!`
      })),
      quiz: {
        question: `${topicName} નો અભ્યાસ કરવાનો મુખ્ય ફાયદો શું છે?`,
        options: [
          `ખ્યાલની સચોટ સમજ મેળવી વાસ્તવિક સમસ્યાઓ ઉકેલવી`,
          `રોજિંદા જીવનમાં તેનો કોઈ ઉપયોગ નથી`,
          `તે કોઈ નિયમ વગર અણધારી રીતે ચાલે છે`,
          `ફક્ત ગોખણપટ્ટી કરવા માટે`
        ],
        correctIndex: 0,
        explanation: `${topicName} આપણને વાસ્તવિક દુનિયાને સમજવાની અને તાર્કિક વિચારસરણી વિકસાવવાની ક્ષમતા આપે છે.`
      }
    };
  }

  // Fallback for English or other supported codes
  return { ...videoData, language: lang, languageCode: lang };
}

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
  mr: {
    title: "मोमेंट AI ला विचारा (तात्काळ शंका निरसन)",
    liveTimestamp: "लाईव्ह वेळ",
    pausedAt: "थांबवलेले दृश्य",
    instantQuestions: "त्वरित प्रश्न (विचारण्यासाठी क्लिक करा)",
    qSimple: "🧸 हे दृश्य अतिशय सोप्या भाषेत समजावून सांगा",
    qAnalogy: "🍎 रोजच्या जीवनातील एखादे प्रत्यक्ष उदाहरण द्या",
    qWhy: "❓ ही पायरी का घडते आणि ती अयशस्वी झाल्यास काय होईल?",
    qFormula: "🔢 यातील वैज्ञानिक सूत्र आणि समीकरणाचा अर्थ सांगा",
    placeholder: "या दृश्याबद्दल किंवा सूत्राबद्दल कोणतीही शंका विचारा...",
    askBtn: "विचारा",
    asking: "उत्तर शोधत आहे...",
    aiExplanation: "AI संदर्भ स्पष्टीकरण",
    listen: "ऐका",
    stopAudio: "ऑडिओ थांबवा",
    poweredBy: "Grasp Instant Concept AI द्वारे समर्थित",
    close: "बंद करा",
    resumeVideo: "व्हिडिओ सुरू ठेवा"
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
  bn: {
    title: "মোমেন্ট AI-কে প্রশ্ন করুন (তাত্ক্ষণিক সন্দেহ সমাধান)",
    liveTimestamp: "লাইভ সময়",
    pausedAt: "স্থগিত দৃশ্য",
    instantQuestions: "তাত্ক্ষণিক প্রশ্ন (ক্লিক করে জিজ্ঞাসা করুন)",
    qSimple: "🧸 এই বিষয়টি একদম সহজ ভাষায় বুঝিয়ে বলুন",
    qAnalogy: "🍎 দৈনন্দিন জীবনের একটি বাস্তব উদাহরণ দিন",
    qWhy: "❓ এই ধাপটি কেন ঘটে?",
    qFormula: "🔢 সূত্রটি ধাপে ধাপে বিশ্লেষণ করুন",
    placeholder: "এই দৃশ্য বা সূত্র সম্পর্কে প্রশ্ন লিখুন...",
    askBtn: "জিজ্ঞাসা করুন",
    asking: "উত্তর খোঁজা হচ্ছে...",
    aiExplanation: "AI প্রাসঙ্গিক ব্যাখ্যা",
    listen: "শুনুন",
    stopAudio: "অডিও থামান",
    poweredBy: "Grasp Instant Concept AI দ্বারা চালিত",
    close: "বন্ধ করুন",
    resumeVideo: "ভিডিও চালু করুন"
  },
  pa: {
    title: "ਮੋਮੈਂਟ AI ਨੂੰ ਪੁੱਛੋ (ਤੁਰੰਤ ਸ਼ੰਕਾ ਨਿਵਾਰਨ)",
    liveTimestamp: "ਲਾਈਵ ਸਮਾਂ",
    pausedAt: "ਰੋਕਿਆ ਦ੍ਰਿਸ਼",
    instantQuestions: "ਤੁਰੰਤ ਸਵਾਲ (ਪੁੱਛਣ ਲਈ ਕਲਿੱਕ ਕਰੋ)",
    qSimple: "🧸 ਇਸ ਦ੍ਰਿਸ਼ ਨੂੰ ਬਹੁਤ ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ ਸਮਝਾਓ",
    qAnalogy: "🍎 ਰੋਜ਼ਾਨਾ ਜ਼ਿੰਦਗੀ ਵਿੱਚੋਂ ਕੋਈ ਉਦਾਹਰਣ ਦਿਓ",
    qWhy: "❓ ਇਹ ਪ੍ਰਕਿਰਿਆ ਕਿਉਂ ਹੁੰਦੀ ਹੈ?",
    qFormula: "🔢 ਫਾਰਮੂਲੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    placeholder: "ਇਸ ਦ੍ਰਿਸ਼ ਬਾਰੇ ਕੋਈ ਵੀ ਸਵਾਲ ਲਿਖੋ...",
    askBtn: "ਪੁੱਛੋ",
    asking: "ਉੱਤਰ ਲੱਭ ਰਿਹਾ ਹੈ...",
    aiExplanation: "AI ਸਪੱਸ਼ਟੀਕਰਨ",
    listen: "ਸੁਣੋ",
    stopAudio: "ਆਡੀਓ ਰੋਕੋ",
    poweredBy: "Grasp Instant Concept AI",
    close: "ਬੰਦ ਕਰੋ",
    resumeVideo: "ਵੀਡੀਓ ਜਾਰੀ ਰੱਖੋ"
  },
  ta: {
    title: "மொமென்ட் AI-யிடம் கேளுங்கள் (சந்தேகத் தீர்வு)",
    liveTimestamp: "நேரலை நேரம்",
    pausedAt: "நிறுத்தப்பட்ட காட்சி",
    instantQuestions: "உடனடி வினாக்கள் (கேட்க கிளிக் செய்க)",
    qSimple: "🧸 இந்தக் காட்சியை மிக எளிய தமிழில் விளக்குங்கள்",
    qAnalogy: "🍎 அன்றாட வாழ்க்கையிலிருந்து ஒரு எளிய உதாரணம் தாருங்கள்",
    qWhy: "❓ இந்த நிலை ஏன் ஏற்படுகிறது?",
    qFormula: "🔢 சூத்திரத்தைப் படிப்படியாக விளக்குங்கள்",
    placeholder: "உங்கள் சந்தேகத்தை உள்ளிடவும்...",
    askBtn: "கேளுங்கள்",
    asking: "விடை காணப்படுகிறது...",
    aiExplanation: "AI சூழல்சார் விளக்கம்",
    listen: "கேட்க",
    stopAudio: "ஒலியை நிறுத்து",
    poweredBy: "Grasp Instant Concept AI",
    close: "மூடுக",
    resumeVideo: "வீடியோவைத் தொடர்க"
  },
  te: {
    title: "మోమెంట్ AIని అడగండి (సందేహ నివృత్తి)",
    liveTimestamp: "లైవ్ సమయం",
    pausedAt: "ఆపబడిన దృశ్యం",
    instantQuestions: "తక్షణ ప్రశ్నలు (అడగడానికి క్లిక్ చేయండి)",
    qSimple: "🧸 ఈ దృశ్యాన్ని చాలా సులభమైన మాటల్లో వివరించండి",
    qAnalogy: "🍎 రోజువారీ జీవితం నుండి ఒక ఉదాహరణ ఇవ్వండి",
    qWhy: "❓ ఈ దశ ఎందుకు జరుగుతుంది?",
    qFormula: "🔢 సూత్రాన్ని విశ్లేషించండి",
    placeholder: "ఏదైనా సందేహాన్ని టైప్ చేయండి...",
    askBtn: "అడగండి",
    asking: "సమాధానం వెతుకుతోంది...",
    aiExplanation: "AI వివరణ",
    listen: "వినండి",
    stopAudio: "ఆపండి",
    poweredBy: "Grasp Instant Concept AI",
    close: "మూసివేయి",
    resumeVideo: "కొనసాగించండి"
  },
  kn: {
    title: "ಮೊಮೆಂಟ್ AI ಕೇಳಿ (ಸಂದೇಹ ಪರಿಹಾರ)",
    liveTimestamp: "ಲೈವ್ ಸಮಯ",
    pausedAt: "ನಿಲ್ಲಿಸಲಾದ ದೃಶ್ಯ",
    instantQuestions: "ತಕ್ಷಣದ ಪ್ರಶ್ನೆಗಳು",
    qSimple: "🧸 ಈ ದೃಶ್ಯವನ್ನು ಸರಳ ಮಾತುಗಳಲ್ಲಿ ವಿವರಿಸಿ",
    qAnalogy: "🍎 ದೈನಂದಿನ ಜೀವನದ ಉದಾಹರಣೆ ನೀಡಿ",
    qWhy: "❓ ಈ ಹಂತ ಏಕೆ ನಡೆಯುತ್ತದೆ?",
    qFormula: "🔢 ಸೂತ್ರವನ್ನು ಬಿಡಿಸಿ ತಿಳಿಸಿ",
    placeholder: "ನಿಮ್ಮ ಸಂದೇಹವನ್ನು ಬರೆಯಿರಿ...",
    askBtn: "ಕೇಳಿ",
    asking: "ಉತ್ತರಿಸಲಾಗುತ್ತಿದೆ...",
    aiExplanation: "AI ವಿವರಣೆ",
    listen: "ಕೇಳಿ",
    stopAudio: "ನಿಲ್ಲಿಸಿ",
    poweredBy: "Grasp Instant Concept AI",
    close: "ಮುಚ್ಚಿ",
    resumeVideo: "ಮುಂದುವರಿಸಿ"
  },
  gu: {
    title: "મોમેન્ટ AI ને પૂછો (શંકા સમાધાન)",
    liveTimestamp: "લાઈવ સમય",
    pausedAt: "અટકેલું દ્રશ્ય",
    instantQuestions: "ઝડપી પ્રશ્નો",
    qSimple: "🧸 આ દ્રશ્ય સરળ શબ્દોમાં સમજાવો",
    qAnalogy: "🍎 રોજિંદા જીવનનું ઉદાહરણ આપો",
    qWhy: "❓ આ પ્રક્રિયા કેમ થાય છે?",
    qFormula: "🔢 સૂત્રનું વિશ્લેષણ કરો",
    placeholder: "કોઈપણ શંકા લખો...",
    askBtn: "પૂછો",
    asking: "જવાબ શોધી રહ્યા છીએ...",
    aiExplanation: "AI સ્પષ્ટીકરણ",
    listen: "સાંભળો",
    stopAudio: "અટકાવો",
    poweredBy: "Grasp Instant Concept AI",
    close: "બંધ કરો",
    resumeVideo: "ચાલુ રાખો"
  }
};

/**
 * Contextual Doubt Resolver for "Ask Moment"
 */
export function resolveSceneDoubt(topic, scene, questionText, language = 'en') {
  const cleanQ = (questionText || "").toLowerCase().trim();
  const lang = (language || 'en').toLowerCase().trim();
  const sceneTitle = scene?.title || topic;
  const headline = scene?.headline || topic;

  if (lang === 'mr') {
    if (cleanQ.includes('simple') || cleanQ.includes('eli5') || cleanQ.includes('सोप') || cleanQ.includes('सरल')) {
      return {
        answer: `सोप्या शब्दांत: ${scene?.simpleNarration || `${topic} ही प्रक्रिया अत्यंत सोपी आणि नैसर्गिक आहे. येथे ऊर्जा आणि नियमांचा अचूक समतोल असतो.`}`,
        keyTakeaway: `मुख्य शिकवण: ${scene?.simplePoints?.[0] || 'निसर्गाचा समतोल राखण्यासाठी हे आवश्यक आहे.'}`
      };
    }
    if (cleanQ.includes('example') || cleanQ.includes('analogy') || cleanQ.includes('उदाहरण') || cleanQ.includes('दाखला')) {
      return {
        answer: `दैनंदिन जीवनातील उदाहरण: जसे आपल्या घरातील सौर शेगडी सूर्यप्रकाशापासून अन्न शिजवते, तसेच झाडांची पाने सूर्यप्रकाश, पाणी आणि हवेचा वापर करून ग्लुकोज तयार करतात आणि आपल्याला श्वासासाठी ऑक्सिजन देतात.`,
        keyTakeaway: `उदाहरण: रोजच्या आयुष्यातील तंत्रज्ञान आणि विज्ञानाचे नियम एकाच तत्त्वावर चालतात!`
      };
    }
    if (cleanQ.includes('formula') || cleanQ.includes('सूत्र') || cleanQ.includes('समीकरण')) {
      return {
        answer: `सूत्राचा अर्थ (${scene?.formula || ''}): हे समीकरण दर्शवते की डाव्या बाजूचे घटक रासायनिक आणि भौतिक प्रक्रियेनंतर उजव्या बाजूच्या उपयुक्त पदार्थांमध्ये बदलतात.`,
        keyTakeaway: `महत्त्वाचे सूत्र: ${scene?.formula || topic}`
      };
    }
    return {
      answer: `या दृश्याबद्दल (${sceneTitle}): ${headline}। येथे मुख्य मुद्दा असा आहे की ${scene?.points?.[0] || topic}। हे संपूर्ण चक्र सुरळीत चालण्यासाठी अतिशय आवश्यक आहे.`,
      keyTakeaway: `महत्त्वाचा मुद्दा: ${scene?.points?.[1] || `${topic} मधील ही पायरी सर्वाधिक महत्त्वाची आहे.`}`
    };
  }

  if (lang === 'hi') {
    if (cleanQ.includes('simple') || cleanQ.includes('eli5') || cleanQ.includes('सरल') || cleanQ.includes('आसान')) {
      return {
        answer: `सरल शब्दों में: ${scene?.simpleNarration || `${topic} की यह प्रक्रिया बहुत सीधी है। यहाँ ऊर्जा और नियम मिलकर परिणाम बनाते हैं।`}`,
        keyTakeaway: `मुख्य सीख: ${scene?.simplePoints?.[0] || 'यह नियम प्रकृति के संतुलन को बनाए रखता है।'}`
      };
    }
    if (cleanQ.includes('example') || cleanQ.includes('analogy') || cleanQ.includes('उदाहरण')) {
      return {
        answer: `दैनिक जीवन का उदाहरण: जैसे आपके घर में सोलर कुकर धूप से खाना पकाता है, वैसे ही पेड़ की पत्तियां धूप, पानी और हवा से ग्लूकोज बनाती हैं और हमें ऑक्सीजन देती हैं।`,
        keyTakeaway: `उदाहरण: सोलर हीटर और पौधों का क्लोरोप्लास्ट एक ही तरह से धूप को उपयोगी ऊर्जा में बदलते हैं!`
      };
    }
    if (cleanQ.includes('formula') || cleanQ.includes('सूत्र') || cleanQ.includes('समीकरण')) {
      return {
        answer: `सूत्र का अर्थ (${scene?.formula || ''}): यह समीकरण दिखाता है कि इनपुट पदार्थ रासायनिक ऊर्जा के बाद आउटपुट उत्पाद में परिवर्तित होते हैं।`,
        keyTakeaway: `समीकरण: ${scene?.formula || topic}`
      };
    }
    return {
      answer: `इस दृश्य (${sceneTitle}) के बारे में: ${headline}। यहाँ मुख्य बात यह है कि ${scene?.points?.[0] || topic}। यह कदम पूरे चक्र को सुचारू रूप से चलाने के लिए आवश्यक है।`,
      keyTakeaway: `महत्वपूर्ण बिंदु: ${scene?.points?.[1] || `${topic} की यह अवस्था सर्वाधिक महत्वपूर्ण है।`}`
    };
  }

  if (lang === 'bn') {
    if (cleanQ.includes('simple') || cleanQ.includes('eli5') || cleanQ.includes('সহজ')) {
      return {
        answer: `সহজ ভাষায়: ${scene?.simpleNarration || `${topic}-এর প্রক্রিয়াটি অত্যন্ত সুশৃঙ্খল এবং সহজ।`}`,
        keyTakeaway: `মূল শিক্ষা: ${scene?.simplePoints?.[0] || 'প্রকৃতির নিয়ম ভারসাম্য বজায় রাখে।'}`
      };
    }
    if (cleanQ.includes('example') || cleanQ.includes('analogy') || cleanQ.includes('উদাহরণ')) {
      return {
        answer: `দৈনন্দিন জীবনের উদাহরণ: যেমন সৌর কুকার সূর্যালোক ব্যবহার করে রান্না করে, তেমনই প্রাকৃতিক নিয়ম শক্তিকে কার্যকর রূপ দেয়।`,
        keyTakeaway: `বাস্তব উদাহরণ: প্রকৃতির বিজ্ঞান সর্বত্র সক্রিয়!`
      };
    }
    if (cleanQ.includes('formula') || cleanQ.includes('সূত্র')) {
      return {
        answer: `সূত্রের অর্থ (${scene?.formula || ''}): এই সমীকরণটি রাসায়নিক ও প্রাকৃতিক পরিবর্তনের ভারসাম্য নির্দেশ করে।`,
        keyTakeaway: `সূত্র: ${scene?.formula || topic}`
      };
    }
    return {
      answer: `এই দৃশ্য (${sceneTitle}) সম্পর্কে: ${headline}। এখানে মূল বিষয় হল ${scene?.points?.[0] || topic}।`,
      keyTakeaway: `গুরুত্বপূর্ণ বিষয়: ${scene?.points?.[1] || `${topic}-এর এই ধাপটি অত্যন্ত প্রয়োজনীয়।`}`
    };
  }

  if (lang === 'pa') {
    if (cleanQ.includes('simple') || cleanQ.includes('eli5') || cleanQ.includes('ਸੌਖਾ')) {
      return {
        answer: `ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ: ${scene?.simpleNarration || `${topic} ਦੀ ਇਹ ਪ੍ਰਕਿਰਿਆ ਬਹੁਤ ਸਰਲ ਅਤੇ ਸਪਸ਼ਟ ਹੈ।`}`,
        keyTakeaway: `ਮੁੱਖ ਨੁਕਤਾ: ${scene?.simplePoints?.[0] || 'ਇਹ ਕੁਦਰਤ ਦਾ ਸੰਤੁਲਨ ਬਣਾਈ ਰੱਖਦਾ ਹੈ।'}`
      };
    }
    if (cleanQ.includes('example') || cleanQ.includes('analogy') || cleanQ.includes('ਉਦਾਹਰਣ')) {
      return {
        answer: `ਰੋਜ਼ਾਨਾ ਜ਼ਿੰਦਗੀ ਦੀ ਉਦਾਹਰਣ: ਜਿਵੇਂ ਸੋਲਰ ਕੁੱਕਰ ਧੁੱਪ ਨਾਲ ਭੋਜਨ ਪਕਾਉਂਦਾ ਹੈ, ਉਵੇਂ ਹੀ ਕੁਦਰਤੀ ਪ੍ਰਣਾਲੀਆਂ ਊਰਜਾ ਨੂੰ ਸੰਤੁਲਿਤ ਕਰਦੀਆਂ ਹਨ।`,
        keyTakeaway: `ਉਦਾਹਰਣ: ਵਿਗਿਆਨ ਦੇ ਨਿਯਮ ਹਰ ਥਾਂ ਕੰਮ ਕਰਦੇ ਹਨ!`
      };
    }
    if (cleanQ.includes('formula') || cleanQ.includes('ਸੂਤਰ') || cleanQ.includes('ਸਮੀਕਰਨ')) {
      return {
        answer: `ਸੂਤਰ ਦਾ ਅਰਥ (${scene?.formula || ''}): ਇਹ ਸਮੀਕਰਨ ਪਦਾਰਥ ਅਤੇ ਊਰਜਾ ਦੇ ਬਦਲਾਅ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।`,
        keyTakeaway: `ਸਮੀਕਰਨ: ${scene?.formula || topic}`
      };
    }
    return {
      answer: `ਇਸ ਦ੍ਰਿਸ਼ (${sceneTitle}) ਬਾਰੇ: ${headline}। ਮੁੱਖ ਗੱਲ ਇਹ ਹੈ ਕਿ ${scene?.points?.[0] || topic}।`,
      keyTakeaway: `ਮਹੱਤਵਪੂਰਨ ਨੁਕਤਾ: ${scene?.points?.[1] || `${topic} ਦਾ ਇਹ ਪੜਾਅ ਬਹੁਤ ਮਹੱਤਵਪੂਰਨ ਹੈ।`}`
    };
  }

  if (lang === 'ta') {
    if (cleanQ.includes('simple') || cleanQ.includes('eli5') || cleanQ.includes('எளிய')) {
      return {
        answer: `எளிய தமிழில்: ${scene?.simpleNarration || `${topic} செயல்முறை மிகவும் எளிதானது மற்றும் நேர்த்தியானது.`}`,
        keyTakeaway: `முக்கியக் கருத்து: ${scene?.simplePoints?.[0] || 'இயற்கையின் சமநிலையை இது பாதுகாக்கிறது.'}`
      };
    }
    if (cleanQ.includes('example') || cleanQ.includes('analogy') || cleanQ.includes('உதாரணம்')) {
      return {
        answer: `நடைமுறை உதாரணம்: சோலார் அடுப்பு சூரிய ஒளியில் சமைப்பது போல, இயற்கையான அமைப்புகள் ஆற்றலைச் சீராகப் பயன்படுத்துகின்றன.`,
        keyTakeaway: `உதாரணம்: அறிவியல் விதிகள் நம்மைச் சுற்றி எப்போதும் செயல்படுகின்றன!`
      };
    }
    if (cleanQ.includes('formula') || cleanQ.includes('சூத்திரம்')) {
      return {
        answer: `சூத்திர விளக்கம் (${scene?.formula || ''}): இந்தச் சமன்பாடு மாற்றங்களின் சமநிலையைக் காட்டுகிறது.`,
        keyTakeaway: `சூத்திரம்: ${scene?.formula || topic}`
      };
    }
    return {
      answer: `இந்தக் காட்சி (${sceneTitle}) குறித்து: ${headline}. முதன்மைக் கருத்து: ${scene?.points?.[0] || topic}.`,
      keyTakeaway: `முக்கியக் குறிப்பு: ${scene?.points?.[1] || `${topic} பாடத்தின் முக்கியப் பகுதி இதுவாகும்.`}`
    };
  }

  if (lang === 'te') {
    if (cleanQ.includes('simple') || cleanQ.includes('eli5') || cleanQ.includes('సులభ')) {
      return {
        answer: `సులభమైన మాటల్లో: ${scene?.simpleNarration || `${topic} ప్రక్రియ చాలా సరళమైనది.`}`,
        keyTakeaway: `ముఖ్యమైన అంశం: ${scene?.simplePoints?.[0] || 'ఇది ప్రకృతి సమతుల్యతను కాపాడుతుంది.'}`
      };
    }
    if (cleanQ.includes('example') || cleanQ.includes('analogy') || cleanQ.includes('ఉదాహరణ')) {
      return {
        answer: `నిత్యజీవిత ఉదాహరణ: సోలార్ కుక్కర్ సూర్యకాంతితో వంట చేసినట్లే, ప్రకృతి శక్తులు క్రమబద్ధంగా పనిచేస్తాయి.`,
        keyTakeaway: `ఉదాహరణ: శాస్త్ర సూత్రాలు నిత్యజీవితంలో ఉపయోగపడతాయి!`
      };
    }
    if (cleanQ.includes('formula') || cleanQ.includes('సూత్రం')) {
      return {
        answer: `సూత్రం వివరణ (${scene?.formula || ''}): ఈ సమీకరణం మార్పుల సమతుల్యతను వివరిస్తుంది.`,
        keyTakeaway: `సమీకరణం: ${scene?.formula || topic}`
      };
    }
    return {
      answer: `ఈ సన్నివేశం (${sceneTitle}) గురించి: ${headline}. ఇక్కడ ప్రధాన అంశం: ${scene?.points?.[0] || topic}.`,
      keyTakeaway: `ముఖ్య విషయం: ${scene?.points?.[1] || `${topic} లో ఈ దశ అత్యంత కీలకమైనది.`}`
    };
  }

  if (lang === 'kn') {
    if (cleanQ.includes('simple') || cleanQ.includes('eli5') || cleanQ.includes('ಸರಳ')) {
      return {
        answer: `ಸರಳ ಮಾತುಗಳಲ್ಲಿ: ${scene?.simpleNarration || `${topic} ಪ್ರಕ್ರಿಯೆಯು ಬಹಳ ಸರಳವಾಗಿದೆ.`}`,
        keyTakeaway: `ಮುಖ್ಯ ಅಂಶ: ${scene?.simplePoints?.[0] || 'ಇದು ಪ್ರಕೃತಿಯ ಸಮತೋಲನವನ್ನು ಕಾಪಾಡುತ್ತದೆ.'}`
      };
    }
    if (cleanQ.includes('example') || cleanQ.includes('analogy') || cleanQ.includes('ಉದಾಹರಣೆ')) {
      return {
        answer: `ದೈನಂದಿನ ಜೀವನದ ಉದಾಹರಣೆ: ಸೌರ ಕುಕ್ಕರ್ ಸೂರ್ಯನ ಬೆಳಕಿನಿಂದ ಅಡುಗೆ ಮಾಡುವಂತೆ, ನೈಸರ್ಗಿಕ ಶಕ್ತಿಗಳು ಸಮತೋಲನದಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ.`,
        keyTakeaway: `ಉದಾಹರಣೆ: ವಿಜ್ಞಾನದ ನಿಯಮಗಳು ಎಲ್ಲೆಡೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ!`
      };
    }
    if (cleanQ.includes('formula') || cleanQ.includes('ಸೂತ್ರ')) {
      return {
        answer: `ಸೂತ್ರದ ವಿವರಣೆ (${scene?.formula || ''}): ಈ ಸಮೀಕರಣವು ನೈಸರ್ಗಿಕ ಸಮತೋಲನವನ್ನು ತೋರಿಸುತ್ತದೆ.`,
        keyTakeaway: `ಸಮೀಕರಣ: ${scene?.formula || topic}`
      };
    }
    return {
      answer: `ಈ ದೃಶ್ಯದ (${sceneTitle}) ಕುರಿತು: ${headline}. ಮುಖ್ಯ ವಿಷಯ: ${scene?.points?.[0] || topic}.`,
      keyTakeaway: `ಪ್ರಮುಖ ಅಂಶ: ${scene?.points?.[1] || `${topic} ಕಲಿಯುವಲ್ಲಿ ಈ ಹಂತ ಬಹಳ ಮುಖ್ಯ.`}`
    };
  }

  if (lang === 'gu') {
    if (cleanQ.includes('simple') || cleanQ.includes('eli5') || cleanQ.includes('સરળ')) {
      return {
        answer: `સરળ શબ્દોમાં: ${scene?.simpleNarration || `${topic} ની આ પ્રક્રિયા ખૂબ જ સરળ છે.`}`,
        keyTakeaway: `મુખ્ય મુદ્દો: ${scene?.simplePoints?.[0] || 'આ કુદરતના સંતુલનને જાળવી રાખે છે.'}`
      };
    }
    if (cleanQ.includes('example') || cleanQ.includes('analogy') || cleanQ.includes('ઉદાહરણ')) {
      return {
        answer: `રોજિંદા જીવનનું ઉદાહરણ: જેમ સોલાર કૂકર સૂર્યપ્રકાશથી ખોરાક રાંધે છે, તેમ કુદરતી પ્રક્રિયાઓ સંતુલન બનાવે છે.`,
        keyTakeaway: `ઉદાહરણ: વિજ્ઞાનના નિયમો સર્વત્ર લાગુ પડે છે!`
      };
    }
    if (cleanQ.includes('formula') || cleanQ.includes('સૂત્ર') || cleanQ.includes('સમીકરણ')) {
      return {
        answer: `સૂત્રનો અર્થ (${scene?.formula || ''}): આ સમીકરણ પદાર્થ અને ઊર્જાના પરિવર્તનને દર્શાવે છે.`,
        keyTakeaway: `સમીકરણ: ${scene?.formula || topic}`
      };
    }
    return {
      answer: `આ દ્રશ્ય (${sceneTitle}) વિશે: ${headline}। અહીં મુખ્ય બાબત એ છે કે ${scene?.points?.[0] || topic}।`,
      keyTakeaway: `મહત્વપૂર્ણ બાબત: ${scene?.points?.[1] || `${topic} નો આ તબક્કો સૌથી મહત્વપૂર્ણ છે.`}`
    };
  }

  // English default
  if (cleanQ.includes('simple') || cleanQ.includes('eli5')) {
    return {
      answer: `In simple terms: ${scene?.simpleNarration || `Think of ${topic} as a natural system where inputs transform smoothly into outputs according to balanced rules.`}`,
      keyTakeaway: `Key takeaway: ${scene?.simplePoints?.[0] || 'Everything works together in a balanced cycle.'}`
    };
  }
  if (cleanQ.includes('example') || cleanQ.includes('analogy')) {
    return {
      answer: `Real-life example: Just like a solar oven uses sunlight to bake bread without plugging into a wall, natural systems use available energy to fuel transformations!`,
      keyTakeaway: `Example: Observable real-world applications follow these exact fundamental principles!`
    };
  }
  if (cleanQ.includes('formula') || cleanQ.includes('equation')) {
    return {
      answer: `Formula breakdown (${scene?.formula || ''}): This equation describes the conservation of mass and energy under governing physical laws.`,
      keyTakeaway: `Equation: ${scene?.formula || topic}`
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
  const norm = lower.replace(/[^a-z0-9\u0900-\u097F\u0980-\u09FF\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0A80-\u0AFF\u0A00-\u0A7F]/g, '');
  const aliases = data.aliases || [key];

  return aliases.some(a => {
    if (!a) return false;
    const cleanA = a.toLowerCase().trim();
    const normA = cleanA.replace(/[^a-z0-9\u0900-\u097F\u0980-\u09FF\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0A80-\u0AFF\u0A00-\u0A7F]/g, '');
    if (!cleanA || !normA) return false;

    if (lower === cleanA || norm === normA) return true;
    if (lower.includes(cleanA) || cleanA.includes(lower)) return true;
    if (norm.length >= 4 && normA.length >= 4 && (norm.includes(normA) || normA.includes(norm))) return true;
    return false;
  });
}

/**
 * Procedurally synthesizes a comprehensive educational video storyboard
 * for ANY custom topic string provided by the user with the specified language.
 */
export function generateDynamicVideo(topicInput, options = {}) {
  const cleanTopic = (topicInput || "Photosynthesis").trim();
  const gradeLevel = options.gradeLevel || "High School (Class 9-12)";
  const targetLanguage = options.language || "en";

  const langMatch = VIDEO_LANGUAGES.find(
    l => l.code.toLowerCase() === targetLanguage.toLowerCase() ||
      l.name.toLowerCase() === targetLanguage.toLowerCase()
  ) || VIDEO_LANGUAGES[0];

  console.log("[VideoGeneration] Language Pipeline:", {
    selectedLanguage: langMatch.name,
    languageCode: langMatch.code,
    locale: langMatch.locale,
    ttsSpeechLang: langMatch.speechLang,
    translationTarget: langMatch.code,
    captionLanguage: langMatch.code
  });

  const durationMinutes = options.durationMinutes
    ? parseInt(options.durationMinutes, 10)
    : 1;
  const clampedMinutes = Math.max(1, Math.min(10, durationMinutes));

  // Tight, snappy scenes synchronized with voiceover duration (~18s per scene)
  const numScenes = 3;
  const baseSceneDuration = 18;
  const remainderSeconds = 0;

  const capitalizedTopic = cleanTopic
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // 1. Check curated knowledge base
  for (const [key, data] of Object.entries(MULTILINGUAL_DATA)) {
    if (matchTopicWithBlueprint(cleanTopic, data, key)) {
      const activeTheme = (options.theme && options.theme !== 'emerald') ? options.theme : (data.defaultTheme || options.theme || "emerald");
      // Localized content for target language, or fallback to english then translate
      const langContent = data[langMatch.code] || data.en;

      const sourceScenes = langContent.scenes || [];
      const scenesToUse = [];
      for (let i = 0; i < numScenes; i++) {
        if (i < sourceScenes.length) {
          scenesToUse.push(sourceScenes[i]);
        } else {
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
            narration: `In this advanced stage, we examine how researchers test these principles under rigorous experimental conditions, paving the way for technology breakthroughs.`,
            simpleNarration: `Scientists love testing this in high-tech laboratories! Learning this gives you a superpower to understand how real-world gadgets work!`
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
          correctIndex: 0,
          explanation: langContent.quiz.explanation
        },
        language: langMatch.code,
        languageCode: langMatch.code,
        createdAt: new Date().toISOString()
      };

      if (!data[langMatch.code] && langMatch.code !== 'en') {
        return translateVideoContent(baseVideo, langMatch.code);
      }

      return baseVideo;
    }
  }

  // 2. Synthesize Dynamic Video for Custom Topics
  const normTopic = cleanTopic.toLowerCase();
  let detectedTheme = options.theme || "tech";
  let sceneAnimations = ["flow-network", "particle-orbit", "coordinate-graph", "flow-network"];
  let defaultFormula = `\\text{Model}(${cleanTopic.slice(0, 8)}) \\equiv \\sum \\text{Axioms}`;

  if (normTopic.includes('space') || normTopic.includes('gravity') || normTopic.includes('star') || normTopic.includes('blackhole')) {
    detectedTheme = options.theme || "cosmos";
    sceneAnimations = ["black-hole-collapse", "black-hole-event-horizon", "black-hole-spacetime-warp", "particle-orbit"];
    defaultFormula = "R_s = \\frac{2GM}{c^2}";
  } else if (normTopic.includes('physics') || normTopic.includes('motion') || normTopic.includes('force') || normTopic.includes('energy')) {
    detectedTheme = options.theme || "tech";
    sceneAnimations = ["physics-inertia", "physics-fma", "physics-action-reaction", "coordinate-graph"];
    defaultFormula = "F = m \\cdot a";
  } else if (normTopic.includes('bio') || normTopic.includes('cell') || normTopic.includes('plant')) {
    detectedTheme = options.theme || "emerald";
    sceneAnimations = ["biological-sunlight", "chloroplast-thylakoid", "molecular-cycle", "biosphere-energy"];
    defaultFormula = "6CO_2 + 6H_2O \\to C_6H_{12}O_6 + 6O_2";
  }

  const rawScenes = [
    {
      title: `Introduction: Understanding ${capitalizedTopic}`,
      headline: `The Fundamental Principles of ${capitalizedTopic}`,
      simpleTitle: `Intro: What is ${capitalizedTopic}?`,
      simpleHeadline: `The basic building blocks explained simply!`,
      animationType: sceneAnimations[0],
      points: [
        `${capitalizedTopic} is a foundational pillar studied across modern curricula`,
        `Transforms theoretical frameworks into observable phenomena`,
        `Serves as a crucial analytical building block for understanding real-world systems`
      ],
      simplePoints: [
        `🌟 ${capitalizedTopic} is all about how things work in the real world`,
        `🧩 Imagine it like interlocking puzzle pieces that fit together smoothly`,
        `🎯 Understanding this helps us solve everyday problems easily!`
      ],
      formula: defaultFormula,
      narration: `Welcome to our explainer on ${capitalizedTopic}. Today we break down the essential concepts, mechanisms, and real-world implications that make this such a vital area of study.`,
      simpleNarration: `Hello and welcome! Today we explore ${capitalizedTopic} in the simplest, most fun way possible—just like telling a great story!`,
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
        `System interactions are driven by equilibrium, forces, and feedback loops`,
        `Key variables interact dynamically to govern efficiency and stability`,
        `Observable outcomes can be predicted through rigorous quantitative modeling`
      ],
      simplePoints: [
        `⚙️ Multiple parts push and pull in harmony`,
        `🔄 When one part changes, other parts adjust automatically`,
        `📊 We can test and watch the results happen right in front of us!`
      ],
      formula: defaultFormula,
      narration: `At its core, ${capitalizedTopic} operates through structured feedback cycles. When components interact, their relationships create balanced outcomes that can be measured.`,
      simpleNarration: `Just like gears in a clock, every part of ${capitalizedTopic} works together in a sequence to make something amazing happen!`,
      diagramNodes: [
        { label: "Stimulus", color: "#F4C95D", x: 30, y: 35 },
        { label: "Transformation", color: "#397257", x: 50, y: 65 },
        { label: "Result", color: "#24706C", x: 70, y: 35 }
      ]
    },
    {
      title: `Practical Experiments & Case Studies`,
      headline: `Real-World Proofs & Demonstrations`,
      simpleTitle: `Cool Experiments & Demonstrations`,
      simpleHeadline: `How we prove it in real life`,
      animationType: sceneAnimations[2] || "flow-network",
      points: [
        `Laboratory experiments allow direct observation and quantitative verification`,
        `Testing variables independently validates cause-and-effect relationships`,
        `Eliminates observational biases through repeatable standardized protocols`
      ],
      simplePoints: [
        `🔬 Hands-on experiments make learning unforgettable`,
        `📊 Watching results change in real-time proves the principles`,
        `✨ You can recreate simple versions of this at home or school!`
      ],
      formula: defaultFormula,
      narration: `Through empirical case studies and hands-on laboratory setups, students and researchers directly observe ${capitalizedTopic} in action and confirm theoretical predictions.`,
      simpleNarration: `When we run experiments, we can see the science happen right before our eyes!`,
      diagramNodes: [
        { label: "Setup", color: "#F4C95D", x: 30, y: 40 },
        { label: "Variable", color: "#397257", x: 50, y: 60 },
        { label: "Empirical Result", color: "#3AA6A0", x: 70, y: 40 }
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
        `It provides foundational principles to model, predict, and innovate`,
        `It is purely historical with no modern applications`,
        `It operates completely randomly with no underlying laws`,
        `It only applies in laboratory vacuums`
      ],
      correctIndex: 0,
      explanation: `${capitalizedTopic} establishes structured principles and analytical models that enable deep understanding and real-world applications.`
    },
    language: 'en',
    languageCode: 'en',
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
  { topic: "The Water Cycle", category: "Earth Science", grade: "Class 6-9", icon: "💧" }
];
