"use client";

import { use, useEffect, useState, useRef } from "react";
import { useSurvey } from "@/hooks/use-survey";
import { StepContainer } from "@/components/survey/step-container";
import { SplashView } from "@/components/survey/steps/splash";
import { RatingView } from "@/components/survey/steps/rating";
import { HonestyView } from "@/components/survey/steps/honesty";

// Path A
import { HelpedView } from "@/components/survey/steps/helped";
import { WouldImproveView } from "@/components/survey/steps/would-improve";
import { MissingProductView } from "@/components/survey/steps/missing-product";
import { HasProviderView } from "@/components/survey/steps/has-provider";
import { ReasonView } from "@/components/survey/steps/reason";
import { PositiveAcknowledgmentView } from "@/components/survey/steps/positive-acknowledgment";
import { CatalogView } from "@/components/survey/steps/catalog";

// Path B
import { FailedView } from "@/components/survey/steps/failed";
import { AcknowledgmentView } from "@/components/survey/steps/acknowledgment";
import { ContactMethodView } from "@/components/survey/steps/contact-method";
import { WorkingView } from "@/components/survey/steps/working";
import { UnderstoodView } from "@/components/survey/steps/understood";

import { ChevronLeft, Loader2 } from "lucide-react";

const BACK_VISIBLE: string[] = [
  "rating", "honesty", "helped", "would_improve", "missing_product", "has_provider", "reason",
  "failed", "acknowledgment", "contact_method",
];

const PATH_A = ["rating", "honesty", "helped", "would_improve", "missing_product", "has_provider", "reason", "catalog"];
const PATH_B = ["rating", "honesty", "failed", "acknowledgment", "contact_method", "working", "understood"];

export default function SurveyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const decodedSlug = decodeURIComponent(slug);
  
  const { step, next, back, direction, isEndStep, isGoodPath, answers } = useSurvey();
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [responseId, setResponseId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  const lastSavedStep = useRef<string | null>(null);

  useEffect(() => {
    const validateSurvey = async () => {
      try {
        const res = await fetch('/api/surveys');
        const data = await res.json();
        const survey = data.surveys.find((s: any) => 
          s.slug === slug || s.slug === decodedSlug
        );
        if (survey) {
          setSurveyId(survey.id);
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (e) {
        setIsValid(false);
      }
    };
    validateSurvey();
  }, [slug, decodedSlug]);

  useEffect(() => {
    if (!surveyId || step === "splash" || step === "honesty" || lastSavedStep.current === step) return;

    const saveProgress = async () => {
      try {
        const res = await fetch('/api/responses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: responseId || undefined,
            survey_id: surveyId,
            ...answers
          })
        });
        const data = await res.json();
        if (!responseId) setResponseId(data.id);
        lastSavedStep.current = step;
      } catch (e) {
        console.error("Error saving progress", e);
      }
    };

    saveProgress();
  }, [step, surveyId, responseId, answers]);

  if (isValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-gray-200" />
      </div>
    );
  }

  if (isValid === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white font-[Montserrat]">
        <h1 className="text-2xl font-black mb-2">Enlace no válido</h1>
        <p className="text-gray-500">Esta encuesta no existe o ha sido desactivada.</p>
      </div>
    );
  }

  const progressSteps = step === "splash" || step === "honesty" ? [] : isGoodPath ? PATH_A : PATH_B;
  const currentIdx = progressSteps.indexOf(step);

  return (
    <main className="min-h-[100dvh] flex flex-col relative w-full overflow-hidden bg-white">
      {BACK_VISIBLE.includes(step) && (
        <div className="absolute top-6 left-4 z-10">
          <button onClick={back} className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors px-2 py-1 rounded-xl">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver</span>
          </button>
        </div>
      )}

      {step !== "splash" && step !== "honesty" && !isEndStep && progressSteps.length > 0 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {progressSteps.map((s, i) => (
            <div key={s} className={`h-1 rounded-full transition-all duration-500 ${i === currentIdx ? "w-6 bg-black" : i < currentIdx ? "w-3 bg-black/40" : "w-3 bg-gray-200"}`} />
          ))}
        </div>
      )}

      <div className={`flex-1 flex ${step === "splash" || step === "honesty" ? "" : "items-center"}`}>
        <StepContainer stepId={step} direction={direction}>
          {step === "splash" && <SplashView onStart={() => next()} />}
          {step === "rating" && <RatingView onSelect={(rating) => next({ rating })} />}
          {step === "honesty" && <HonestyView onNext={() => next()} />}
          
          {/* Path A */}
          {step === "helped" && <HelpedView onNext={(helped) => next({ helped })} />}
          {step === "would_improve" && <WouldImproveView onNext={(would_improve) => next({ would_improve })} />}
          {step === "missing_product" && <MissingProductView onAnswer={(missing_product) => next({ missing_product })} />}
          {step === "has_provider" && <HasProviderView onAnswer={(has_provider) => next({ has_provider })} />}
          {step === "reason" && <ReasonView onNext={(reason) => next({ reason })} />}
          {step === "positive_acknowledgment" && <PositiveAcknowledgmentView onNext={() => next()} />}
          {step === "catalog" && <CatalogView />}

          {/* Path B */}
          {step === "failed" && <FailedView onNext={(data) => next(data)} />}
          {step === "acknowledgment" && <AcknowledgmentView onAnswer={(wants_contact) => next({ wants_contact })} />}
          {step === "contact_method" && (
            <ContactMethodView onSelect={(vals) => next(vals)} />
          )}
          {step === "working" && <WorkingView />}
          {step === "understood" && <UnderstoodView />}
        </StepContainer>
      </div>
    </main>
  );
}
