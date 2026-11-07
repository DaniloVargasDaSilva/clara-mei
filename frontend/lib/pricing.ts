/**
 * Motor de precificação da Clara.
 *
 * Funções puras e determinísticas: mesma entrada, mesmo resultado.
 * Não depende de React nem do navegador, então pode ser testado
 * isoladamente e reaproveitado no backend.
 *
 * Fórmula: taxa da venda e lucro são percentuais do preço final, então
 *   preço = custo por unidade / (1 - taxa - lucro desejado)
 */

export type PricingInput = {
  /** Quanto se gasta com ingredientes/insumos para produzir um lote (R$). */
  batchIngredientsCost: number;
  /** Quantas unidades o lote rende. */
  unitsPerBatch: number;
  /** Embalagem de cada unidade (R$). */
  packagingPerUnit: number;
  /** Horas de trabalho para produzir o lote. */
  hoursPerBatch: number;
  /** Quanto a pessoa quer ganhar por hora de trabalho (R$). */
  hourlyRate: number;
  /** Contas fixas do mês do negócio: gás, luz, internet, DAS... (R$). */
  monthlyFixedCosts: number;
  /** Unidades vendidas por mês, para dividir as contas fixas. */
  unitsPerMonth: number;
  /** Taxa da maquininha, link de pagamento ou plataforma (% do preço). */
  feePercent: number;
  /** Lucro desejado (% do preço). */
  marginPercent: number;
  /** Preço cobrado hoje (R$). Opcional, para comparar. */
  currentPrice?: number;
};

export type CostParts = {
  ingredients: number;
  packaging: number;
  labor: number;
  fixed: number;
};

export type PriceView = {
  price: number;
  fee: number;
  /** Pode ser negativo: prejuízo por unidade. */
  profit: number;
  /** Lucro como fração do preço (0.25 = 25%). */
  profitShare: number;
};

export type PricingResult =
  | {
      ok: true;
      parts: CostParts;
      unitCost: number;
      suggested: PriceView;
      current?: PriceView & {
        /** O que a pessoa costuma achar que sobra: preço menos ingredientes. */
        naiveProfit: number;
        /** Quanto falta subir para chegar ao preço sugerido. */
        gapToSuggested: number;
      };
    }
  | { ok: false; error: string };

const round2 = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

/** Arredonda o preço para cima no centavo, para nunca ficar abaixo do lucro desejado. */
const ceilToCent = (value: number) => Math.ceil(round2(value * 100) - 1e-9) / 100;

function priceView(price: number, unitCost: number, feeRate: number): PriceView {
  const fee = price * feeRate;
  const profit = price - fee - unitCost;
  return { price, fee, profit, profitShare: price > 0 ? profit / price : 0 };
}

export function calculatePrice(input: PricingInput): PricingResult {
  const numbers: Array<[string, number]> = [
    ["o gasto com ingredientes", input.batchIngredientsCost],
    ["o rendimento", input.unitsPerBatch],
    ["a embalagem", input.packagingPerUnit],
    ["as horas de trabalho", input.hoursPerBatch],
    ["o valor da sua hora", input.hourlyRate],
    ["as contas do mês", input.monthlyFixedCosts],
    ["as vendas do mês", input.unitsPerMonth],
    ["a taxa", input.feePercent],
    ["o lucro desejado", input.marginPercent],
  ];

  for (const [label, value] of numbers) {
    if (!Number.isFinite(value) || value < 0) {
      return { ok: false, error: `Preencha ${label} com um número igual ou maior que zero.` };
    }
  }

  if (input.unitsPerBatch <= 0) {
    return { ok: false, error: "Informe quantas unidades a receita rende. Precisa ser mais que zero." };
  }
  if (input.unitsPerMonth <= 0) {
    return { ok: false, error: "Informe quantas unidades você vende por mês. Precisa ser mais que zero." };
  }

  const feeRate = input.feePercent / 100;
  const marginRate = input.marginPercent / 100;

  if (feeRate + marginRate >= 1) {
    return {
      ok: false,
      error: "Taxa e lucro somados precisam ficar abaixo de 100% do preço. Diminua um dos dois.",
    };
  }

  const parts: CostParts = {
    ingredients: input.batchIngredientsCost / input.unitsPerBatch,
    packaging: input.packagingPerUnit,
    labor: (input.hoursPerBatch * input.hourlyRate) / input.unitsPerBatch,
    fixed: input.monthlyFixedCosts / input.unitsPerMonth,
  };
  const unitCost = parts.ingredients + parts.packaging + parts.labor + parts.fixed;

  const suggestedPrice = ceilToCent(unitCost / (1 - feeRate - marginRate));
  const suggested = priceView(suggestedPrice, unitCost, feeRate);

  let current: Extract<PricingResult, { ok: true }>["current"];
  const currentPrice = input.currentPrice;
  if (currentPrice !== undefined && Number.isFinite(currentPrice) && currentPrice > 0) {
    current = {
      ...priceView(currentPrice, unitCost, feeRate),
      naiveProfit: currentPrice - parts.ingredients,
      gapToSuggested: suggestedPrice - currentPrice,
    };
  }

  return { ok: true, parts, unitCost, suggested, current };
}

/** Converte o que a pessoa digitou ("3,50", "1.200,00", "12") em número. */
export function parseAmount(raw: string): number {
  const text = raw.trim().replace(/\s|R\$/g, "");
  if (text === "") return Number.NaN;
  const normalized = text.includes(",") ? text.replace(/\./g, "").replace(",", ".") : text;
  return Number(normalized);
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const pct = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });

export const formatBRL = (value: number) => brl.format(value);
export const formatPercent = (fraction: number) => pct.format(fraction);

export type Preset = {
  id: string;
  name: string;
  unit: string;
  input: PricingInput;
};

/** Exemplos com números fictícios, só para demonstração. */
export const presets: Preset[] = [
  {
    id: "brigadeiro",
    name: "Brigadeiro",
    unit: "brigadeiro",
    input: {
      batchIngredientsCost: 62,
      unitsPerBatch: 50,
      packagingPerUnit: 0.18,
      hoursPerBatch: 2.5,
      hourlyRate: 15,
      monthlyFixedCosts: 300,
      unitsPerMonth: 600,
      feePercent: 3.5,
      marginPercent: 25,
      currentPrice: 3,
    },
  },
  {
    id: "bolo-de-pote",
    name: "Bolo de pote",
    unit: "pote",
    input: {
      batchIngredientsCost: 54,
      unitsPerBatch: 12,
      packagingPerUnit: 1.6,
      hoursPerBatch: 3,
      hourlyRate: 15,
      monthlyFixedCosts: 300,
      unitsPerMonth: 200,
      feePercent: 4.99,
      marginPercent: 25,
      currentPrice: 12,
    },
  },
  {
    id: "sabonete",
    name: "Sabonete artesanal",
    unit: "sabonete",
    input: {
      batchIngredientsCost: 70,
      unitsPerBatch: 20,
      packagingPerUnit: 1.2,
      hoursPerBatch: 2,
      hourlyRate: 20,
      monthlyFixedCosts: 150,
      unitsPerMonth: 120,
      feePercent: 20,
      marginPercent: 20,
      currentPrice: 12,
    },
  },
];
