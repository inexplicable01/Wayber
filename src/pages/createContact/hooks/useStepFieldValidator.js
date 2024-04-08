// hooks/useStepFieldValidator.js
import { useMemo } from "react";

const useStepFieldValidator = (formik, currentStep) => {
  return useMemo(() => {
    const getCurrentStepFields = (step) => {
      switch (step) {
        case 1:
          return [
            "address",
            "buyer",
            "price",
            "closingDate",
            "titleInsuranceCompany",
            "closingAgent",
          ];
        case 2:
          return [
            "financialContingency",
            "loanType",
            "downPayment",
            "loanCostProvisions",
          ];
        case 3:
          return [
            "inspectionContingency",
            "buyersNotice",
            "includeSewerInspection",
            "additionalTimeForInspections",
            "sellersResponseTime",
            "buyersReplyTime",
            "repairCompletionDate",
            "neighborhoodReviewContingency",
            "neighborhoodReviewDays",
          ];
        default:
          return [];
      }
    };

    const fieldsToValidate = getCurrentStepFields(currentStep);

    const areFieldsValid = fieldsToValidate.every((field) => {
      const fieldError = formik.errors[field];
      const fieldValue = formik.values[field];
      return (
        fieldValue !== undefined &&
        fieldValue !== "" &&
        fieldError === undefined
      );
    });

    return areFieldsValid;
  }, [formik, currentStep]);
};

export default useStepFieldValidator;
