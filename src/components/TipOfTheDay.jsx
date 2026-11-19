import { Lightbulb } from "lucide-react";

function TipOfTheDay() {
  return (
    <div className="rounded-xl border border-amber-100 bg-amber-50/80 p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2 text-amber-500">
        <Lightbulb size={22} fill="currentColor" />
        <h3 className="text-sm font-bold text-slate-800">Dica do dia</h3>
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-600">Mantenha o estoque de produtos mais vendidos sempre acima de 10 unidades para evitar rupturas.</p>
    </div>
  );
}

export default TipOfTheDay;
