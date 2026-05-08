"use client";

import { useEffect, useState, use } from "react";
import { useSurvey } from "@/hooks/use-survey";
import { StepContainer } from "@/components/survey/step-container";
import { SplashView } from "@/components/survey/steps/splash";
import { RatingView } from "@/components/survey/steps/rating";
import { HonestyView } from "@/components/survey/steps/honesty";
import { HelpedView } from "@/components/survey/steps/helped";
import { FailedView } from "@/components/survey/steps/failed";
import { WouldImproveView } from "@/components/survey/steps/would-improve";
import { MissingProductView } from "@/components/survey/steps/missing-product";
import { HasProviderView } from "@/components/survey/steps/has-provider";
import { ReasonView } from "@/components/survey/steps/reason";
import { ContactMethodView } from "@/components/survey/steps/contact-method";
import { PositiveAcknowledgmentView } from "@/components/survey/steps/positive-acknowledgment";
import { AcknowledgmentView } from "@/components/survey/steps/acknowledgment";
import { CatalogView } from "@/components/survey/steps/catalog";
import { WorkingView } from "@/components/survey/steps/working";
import { UnderstoodView } from "@/components/survey/steps/understood";
import { ExpiredView } from "@/components/survey/steps/expired";
import { ChevronLeft } from "lucide-react";

export default function SurveyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { step, answers, next, back, direction, isEndStep } = useSurvey();
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [responseId, setResponseId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSurvey() {
      try {
        const res = await fetch(`/api/surveys`);
        const data = await res.json();
        const survey = data.surveys.find((s: any) => s.slug === slug);
        
        if (survey) {
          if (survey.is_completed) {
            setIsExpired(true);
          } else {
            setSurveyId(survey.id);
          }
        }
      } catch (e) {
        console.error("Error fetching survey", e);
      } finally {
        setLoading(false);
      }
    }
    fetchSurvey();
  }, [slug]);

  // Guardar progreso paso a paso (Upsert)
  useEffect(() => {
    if (!surveyId || step === 'splash' || isExpired) return;

    const saveProgress = async () => {
      try {
        // Limpiamos answers para asegurar que no haya objetos circulares
        const cleanAnswers = JSON.parse(JSON.stringify(answers));
        
        const res = await fetch('/api/responses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: responseId || undefined,
            survey_id: surveyId,
            ...cleanAnswers
          })
        });
        const data = await res.json();
        if (data.id) setResponseId(data.id);

        // Si es el paso final, marcamos la encuesta como completada
        if (isEndStep) {
          await fetch('/api/surveys', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: surveyId, is_completed: true })
          });
        }
      } catch (e) {
        console.error("Error saving progress", e);
      }
    };

    saveProgress();
  }, [step, surveyId, answers, responseId, isEndStep, isExpired]);

  if (loading) return null;
  if (isExpired) return (
    <StepContainer stepId="expired" direction={0}>
      <ExpiredView />
    </StepContainer>
  );
  if (!surveyId) return <div className="p-10 text-center font-[Montserrat]">Encuesta no encontrada</div>;

  const showBack = step !== "splash" && !isEndStep;

  return (
    <div className="relative min-h-screen bg-white font-[Montserrat]">
      {showBack && (
        <button 
          onClick={() => back()}
          className="absolute top-8 left-8 z-50 p-2 text-black/20 hover:text-black transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      <StepContainer stepId={step} direction={direction}>
        {step === "splash" && <SplashView onStart={() => next()} />}
        {step === "rating" && <RatingView onSelect={(rating: number) => next({ rating })} />}
        {step === "honesty" && <HonestyView onNext={() => next()} />}
        
        {/* PATH A */}
        {step === "helped" && <HelpedView onNext={(helped: string[]) => next({ helped })} />}
        {step === "would_improve" && <WouldImproveView onNext={(would_improve: string) => next({ would_improve })} />}
        {step === "missing_product" && <MissingProductView onAnswer={(missing_product: string) => next({ missing_product })} />}
        {step === "has_provider" && <HasProviderView onAnswer={(has_provider: boolean) => next({ has_provider })} />}
        {step === "reason" && <ReasonView onNext={(reason: string) => next({ reason })} />}
        {step === "positive_acknowledgment" && <PositiveAcknowledgmentView onNext={() => next()} />}
        {step === "catalog" && <CatalogView />}

        {/* PATH B */}
        {step === "failed" && <FailedView onNext={(data: any) => next(data)} />}
        {step === "acknowledgment" && <AcknowledgmentView onAnswer={(wants_contact: boolean) => next({ wants_contact })} />}
        {step === "contact_method" && <ContactMethodView onSelect={(data: any) => next(data)} />}
        {step === "working" && <WorkingView />}
        {step === "understood" && <UnderstoodView />}
      </StepContainer>
    </div>
  );
}
