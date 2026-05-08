"use client";

import { useState } from "react";
import { SurveyStep, SurveyAnswers } from "@/types/survey";

export function useSurvey() {
  const [step, setStep] = useState<SurveyStep>("splash");
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [direction, setDirection] = useState<number>(0);
  const [history, setHistory] = useState<SurveyStep[]>([]);

  const next = (newAnswers?: Partial<SurveyAnswers>) => {
    let baseAnswers = { ...answers };
    if (newAnswers?.rating !== undefined) {
      const { 
        failed, failed_categories, wants_contact, contact_method, contact_detail, contact_schedule,
        helped, would_improve, missing_product, has_provider, reason,
        ...rest 
      } = baseAnswers;
      baseAnswers = rest;
    }

    const updatedAnswers = { ...baseAnswers, ...newAnswers };
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

      // PATH A (Positivo)
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
        // Si YA TIENE proveedor, le preguntamos la razón (feedback)
        // Si ESTÁ BUSCANDO (has_provider === false), saltamos directo al contacto (oportunidad)
        if (updatedAnswers.has_provider) {
          setStep("reason");
        } else {
          setStep("positive_contact_check");
        }
        break;
      case "reason":
        setStep("positive_contact_check");
        break;
      case "positive_contact_check":
        if (updatedAnswers.wants_contact) {
          setStep("contact_method");
        } else {
          setStep("positive_acknowledgment");
        }
        break;
      case "positive_acknowledgment":
        setStep("catalog");
        break;

      // PATH B (Falla)
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
        if (isGoodPath) {
          setStep("positive_acknowledgment");
        } else {
          setStep("working");
        }
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
