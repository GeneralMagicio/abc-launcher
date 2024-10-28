export {
  TERMS_AND_CONDITIONS_HTML,
  TERMS_AND_CONDITIONS_TEXT,
} from "./termsText";
import { POLICY_STATEMENT_HTML } from "./privacyText";

export const POLICY_STATEMENT = POLICY_STATEMENT_HTML;

export enum MessageType {
  TermsAndConditions = "Terms&Conditions",
  PrivacyPolicy = "PrivacyPolicy",
}
