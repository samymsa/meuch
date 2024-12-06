"use client";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

export function ExpandableCard() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-primary text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      {cards.map((card, index) => (
        <span
          key={`card-${card.title}-${id}`}
          className="absolute flex h-3 w-3"
          style={{
            bottom: `${card.coords.bottom}%`,
            left: `${card.coords.left}%`,
          }}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <motion.button
            onClick={() => setActive(card)}
            layoutId={`button-${card.title}-${id}`}
            className="relative inline-flex rounded-full h-3 w-3 bg-white"
          ></motion.button>
        </span>
      ))}
    </>
  );
}

const cards = [
  {
    description: "Régulation et protection des écosystèmes",
    title: "Cerveau",
    src: "/organes/cerveau.png",
    coords: { bottom: 92, left: 46 },
    ctaText: "En savoir plus",
    ctaLink: "#bento",
    content: () => {
      return (
        <p>
          Le cerveau, symbolisé par les récifs coralliens, régule les
          écosystèmes marins et soutient une biodiversité incroyable.
        </p>
      );
    },
  },
  {
    description: "Photosynthèse et dissolution du CO2",
    title: "Poumon",
    src: "/organes/corail.png",
    coords: { bottom: 75, left: 35 },
    ctaText: "En savoir plus",
    ctaLink: "#bento",
    content: () => {
      return (
        <p>
          Les poumons symbolisent le rôle vital des océans dans les échanges
          gazeux, en produisant l'oxygène et absorbant le dioxyde de carbone.
        </p>
      );
    },
  },
  {
    description: "Soutien et stabilité des écosystèmes marins",
    title: "Pied",
    src: "/organes/pieds.png",
    coords: { bottom: 10, left: 55 },
    ctaText: "En savoir plus",
    ctaLink: "#bento",
    content: () => {
      return (
        <p>
          Les pieds symbolisent les fonds marins, essentiels pour soutenir la
          vie océanique et stabiliser les écosystèmes.
        </p>
      );
    },
  },
  {
    description: "Courants marins et pompe thermohaline",
    title: "Coeur",
    src: "/organes/coeur.png",
    coords: { bottom: 70, left: 48 },
    ctaText: "En savoir plus",
    ctaLink: "#bento",
    content: () => {
      return (
        <p>
          Le cœur représente les courants marins et la pompe thermohaline,
          essentiels pour stabiliser le climat et transporter les nutriments.",
          "partieAssociee": "Courants marins et pompe thermohaline
        </p>
      );
    },
  },
  {
    description: "Fertilité et régénération des fonds marins",
    title: "Sexe",
    src: "/organes/concombre.png",
    coords: { bottom: 46, left: 48 },
    ctaText: "En savoir plus",
    ctaLink: "#bento",
    content: () => {
      return (
        <p>
          Le sexe, symbolisé par le concombre de mer, représente la régénération
          et la fertilité des fonds marins grâce à son rôle écologique.
        </p>
      );
    },
  },
];
