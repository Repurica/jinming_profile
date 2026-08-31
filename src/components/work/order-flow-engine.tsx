"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useExperience } from "@/components/experience/experience-provider";
import { ProcessStage } from "./process-stage";

export const orderStages = [
  { label: "CUSTOMER", detail: "Restaurant owners and kitchen staff shape the operating context." },
  { label: "ORDER", detail: "Order-to-preparation work is mapped into an explicit flow." },
  { label: "RESTAURANT SYSTEM", detail: "Functional requirements, user flows, and acceptance criteria define the product." },
  { label: "KITCHEN", detail: "The workflow continues into kitchen operations." },
  { label: "PREPARATION", detail: "Architecture, implementation, deployment, and iteration make the flow usable." },
  { label: "SUPPLY / INVENTORY", detail: "A proposed supply-chain design covers inventory logic, supplier data, and scale." },
] as const;

export function OrderFlowEngine() {
  const { reducedMotion } = useExperience();
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (ticketRef.current) gsap.killTweensOf(ticketRef.current);
    },
    [],
  );

  function runOrder() {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (reducedMotion) {
      setActiveStage(orderStages.length - 1);
      return;
    }

    setActiveStage(0);
    let index = 0;
    intervalRef.current = window.setInterval(() => {
      index += 1;
      setActiveStage(index);
      if (index === orderStages.length - 1 && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 500);

    const track = trackRef.current;
    const ticket = ticketRef.current;
    if (track && ticket) {
      gsap.killTweensOf(ticket);
      gsap.fromTo(
        ticket,
        { x: 0 },
        {
          x: Math.max(0, track.clientWidth - ticket.offsetWidth),
          duration: 2.55,
          ease: "power1.inOut",
        },
      );
    }
  }

  return (
    <div className="order-engine">
      <header className="engine-header">
        <div><span>03A / ORDER FLOW ENGINE</span><h3>MaFe Bento</h3></div>
        <button type="button" onClick={runOrder} data-cursor="DRAG">Run order <i aria-hidden="true">→</i></button>
      </header>
      <p className="engine-disclaimer">WORKFLOW VISUALIZATION — NOT A BACKEND SIMULATOR</p>
      <div className="order-track" ref={trackRef}>
        <div className="order-ticket" ref={ticketRef} aria-hidden="true">
          <span>ORDER</span><strong>#0526</strong><i />
        </div>
        <div className="order-rail" aria-hidden="true" />
      </div>
      <ol className="process-stages">
        {orderStages.map((stage, index) => (
          <ProcessStage
            key={stage.label}
            index={index}
            label={stage.label}
            detail={stage.detail}
            active={activeStage === index}
          />
        ))}
      </ol>
      <p className="sr-status" role="status" aria-live="polite">
        {activeStage === null ? "Order flow ready" : `Ticket at ${orderStages[activeStage]?.label}`}
      </p>
    </div>
  );
}
