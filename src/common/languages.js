import flagus from "../assets/images/archive/flags/us.svg";
import flagspain from "../assets/images/archive/flags/spain.svg";
import flaggermany from "../assets/images/archive/flags/germany.svg";
import flagitaly from "../assets/images/archive/flags/italy.svg";
import flagrussia from "../assets/images/archive/flags/russia.svg";
import flagchina from "../assets/images/archive/flags/china.svg";
import flagfrench from "../assets/images/archive/flags/french.svg";
import flagarabic from "../assets/images/archive/flags/ar.svg"

const languages = {
  sp: {
    label: "Española",
    flag: flagspain,
  },
  gr: {
    label: "Deutsche",
    flag: flaggermany,
  },
  it: {
    label: "Italiana",
    flag: flagitaly,
  },
  rs: {
    label: "русский",
    flag: flagrussia,
  },
  en: {
    label: "English",
    flag: flagus,
  },
  cn: {
    label: "中国人",
    flag: flagchina,
  },
  fr: {
    label: "français",
    flag: flagfrench,
  },
  ar: {
    label: "Arabic",
    flag: flagarabic,
  },
}

export default languages
