"use client";

import { useState } from "react";
import { SurveyStep, SurveyAnswers } from "@/types/survey";

export function useSurvey() {
  const [step, setStep] = useState<SurveyStep>("splash");
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [direction, setDirection] = useState<number>(0);
  const [history, setHistory] = useState<SurveyStep[]>([]);

  const next = (newAnswers?: Partial<SurveyAnswers>) => {
    const updatedAnswers = { ...answers, ...newAnswers };
    setAnswers(updatedAnswers);
    setHistory([...history, step]);
    setDirection(1);

    const isGoodPath = updatedAnswers.rating !== undefined && updatedAnswers.rating >= 4;

    switch (step) {
      case "splash":
        setStep("rating");
        break;
      case "rating":
        if (isGoodPath) {
          setStep("honesty");
        } else {
          setStep("failed");
        }
        break;
      case "honesty":
        setStep(isGoodPath ? "helped" : "failed");
        break;

      // PATH A
      case "helped":
        setStep("would_improve");
        break;
      case "would_improve":
        setStep("missing_product");
        break;
      case "missing_product":
        if (!updatedAnswers.missing_product || updatedAnswers.missing_product.trim() === "") {
          setStep("positive_acknowledgment");
        } else {
          setStep("has_provider");
        }
        break;
      case "has_provider":
        setStep("reason");
        break;
      case "reason":
        setStep("catalog");
        break;
      case "positive_acknowledgment":
        setStep("catalog");
        break;

      // PATH B
      case "failed":
        setStep("acknowledgment");
        break;
      case "acknowledgment":
        if (updatedAnswers.wants_contact) {
          setStep("contact_method");
        } else {
          setStep("understood");
        }
        break;
      case "contact_method":
        setStep("working");
        break;
      
      default:
        break;
    }
  };

  const back = () => {
    if (history.length === 0) return;
    const prevStep = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setStep(prevStep);
    setDirection(-1);
  };

  const isGoodPath = answers.rating !== undefined && answers.rating >= 4;
  const isEndStep = ["catalog", "working", "understood"].includes(step);

  return {
    step,
    answers,
    next,
    back,
    direction,
    isEndStep,
    isGoodPath
  };
}
