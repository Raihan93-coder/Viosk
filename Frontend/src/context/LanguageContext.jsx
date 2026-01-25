import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

import { languages } from '../constants/languages';

const translations = {
    en: {
        welcome: "Welcome to SUVIDHA",
        selectLang: "Select Language",
        start: "Touch to Start",
        emergency: "Emergency",
        back: "Back",
        services: "Our Services",
        enterDetails: "Enter Details",
        pay: "Pay Now",
        processing: "Processing...",
        success: "Transaction Successful!",
        printRec: "Print Receipt",
        // Services
        electricity: "Electricity",
        water: "Water",
        gas: "Gas",
        waste: "Waste Mgmt",
        grievance: "Grievance"
    },
    hi: {
        welcome: "सुविधा में आपका स्वागत है",
        selectLang: "भाषा चुनें",
        start: "आरंभ करने के लिए स्पर्श करें",
        emergency: "आपातकालीन",
        back: "वापस",
        services: "हमारी सेवाएं",
        enterDetails: "विवरण दर्ज करें",
        pay: "अभी भुगतान करें",
        processing: "प्रक्रिया जारी है...",
        success: "लेन-देन सफल!",
        printRec: "रसीद प्रिंट करें",
        // Services
        electricity: "विद्युत",
        water: "जल",
        gas: "गैस",
        waste: "अपशिष्ट प्रबंधन",
        grievance: "शिकायत"
    },
    ml: {
        welcome: "സുവിധയിലേക്ക് സ്വാഗതം",
        selectLang: "ഭാഷ തിരഞ്ഞെടുക്കുക",
        start: "തുടങ്ങാൻ സ്പർശിക്കുക",
        emergency: "അടിയന്തിര ഘട്ടം",
        back: "തിരികെ",
        services: "സേവനങ്ങള്",
        enterDetails: "വിവരങ്ങൾ നൽകുക",
        pay: "പണമടയ്ക്കുക",
        processing: "പ്രോസസ്സ് ചെയ്യുന്നു...",
        success: "ഇടപാട് വിജയിച്ചു!",
        printRec: "രസീത് പ്രിന്റ്",
        // Services
        electricity: "വൈദ്യുതി",
        water: "വെള്ളം",
        gas: "ഗ്യാസ്",
        waste: "മാലിന്യ സംസ്കരണം",
        grievance: "പരാതി"
    },
    ta: {
        welcome: "சுவிதாவிற்கு வரவேற்கிறோம்",
        selectLang: "மொழியைத் தேர்ந்தெடுக்கவும்",
        start: "தொடங்க தொடவும்",
        emergency: "அவசரம்",
        back: "பின்னால்",
        services: "எங்கள் சேவைகள்",
        enterDetails: "விவரங்களை உள்ளிடவும்",
        pay: "இப்போது பணம் செலுத்துங்கள்",
        processing: "செயலாக்க...",
        success: "பரிவர்த்தனை வெற்றி!",
        printRec: "ரசீது அச்சிடுக",
        // Services
        electricity: "மின்சாரம்",
        water: "தண்ணீர்",
        gas: "எரிவாயு",
        waste: "கழிவு மேலாண்மை",
        grievance: "குறைதீர்"
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const value = {
        language,
        setLanguage,
        t: (key) => translations[language][key] || key,
        languages
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
