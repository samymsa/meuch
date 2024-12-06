import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export function BentoGridDemo({ items }) {
  return (
    <BentoGrid className="max-w-6xl mx-auto grid grid-cols-4 grid-rows-2 gap-4">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          icon={item.icon}
          className={
            getGridItemClass(i) +
            "w-[469px] h-[227px] bg-[rgba(163,213,242,0.7)] rounded-[15px] backdrop-blur-[8px] bg-opacity-20"
          }
        />
      ))}
    </BentoGrid>
  );
}

function getGridItemClass(index) {
  switch (index) {
    case 0: // Grand bloc en bas à gauche
      return "col-span-2 row-span-1";
    case 1: // Bloc haut droite
      return "col-span-1 row-span-1";
    case 2: // Bloc haut droite
      return "col-span-1 row-span-1";
    case 3: // Grand bloc milieu droite
      return "col-span-2 row-span-2";
    case 4: // Bloc bas centre
      return "col-span-1 row-span-1";
    case 5: // Bloc bas centre droit
      return "col-span-1 row-span-1";
    case 6: // Grand bloc bas droit
      return "col-span-2 row-span-1";
    default:
      return "";
  }
}
