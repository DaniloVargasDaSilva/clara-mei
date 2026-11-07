"use client";

import { useId, useMemo, useState } from "react";
import {
  calculatePrice,
  formatBRL,
  formatPercent,
  parseAmount,
  presets,
  type PricingInput,
} from "@/lib/pricing";

type FieldKey = keyof PricingInput;
type Values = Record<FieldKey, string>;

type Field = {
  key: FieldKey;
  label: string;
  prefix?: string;
  suffix?: string;
};

const steps: { title: string; hint: string; fields: Field[] }[] = [
  {
    title: "A receita",
    hint: "Pense em uma receita ou lote inteiro, do jeito que você produz.",
    fields: [
      { key: "batchIngredientsCost", label: "Gasto com ingredientes na receita", prefix: "R$" },
      { key: "unitsPerBatch", label: "Quantas unidades ela rende", suffix: "un." },
      { key: "packagingPerUnit", label: "Embalagem de cada unidade", prefix: "R$" },
    ],
  },
  {
    title: "Seu tempo",
    hint: "Seu trabalho também é custo. Se você não cobra por ele, trabalha de graça.",
    fields: [
      { key: "hoursPerBatch", label: "Horas para fazer a receita", suffix: "h" },
      { key: "hourlyRate", label: "Quanto você quer ganhar por hora", prefix: "R$" },
    ],
  },
  {
    title: "Contas do mês",
    hint: "Gás, luz, internet, DAS e o que mais você paga mesmo sem vender.",
    fields: [
      { key: "monthlyFixedCosts", label: "Total das contas fixas do mês", prefix: "R$" },
      { key: "unitsPerMonth", label: "Unidades que você vende por mês", suffix: "un." },
    ],
  },
  {
    title: "Venda e lucro",
    hint: "A taxa da maquininha ou da plataforma sai do preço, então entra na conta.",
    fields: [
      { key: "feePercent", label: "Taxa da maquininha ou plataforma", suffix: "%" },
      { key: "marginPercent", label: "Lucro que você quer ter", suffix: "%" },
      { key: "currentPrice", label: "Preço que você cobra hoje (opcional)", prefix: "R$" },
    ],
  },
];

const fieldKeys = steps.flatMap((step) => step.fields.map((field) => field.key));

const toText = (value: number | undefined) =>
  value === undefined ? "" : String(value).replace(".", ",");

function toValues(input: PricingInput): Values {
  return Object.fromEntries(fieldKeys.map((key) => [key, toText(input[key])])) as Values;
}

const emptyValues = Object.fromEntries(fieldKeys.map((key) => [key, ""])) as Values;

const segments = [
  { key: "ingredients", label: "Ingredientes", className: "seg-ingredients" },
  { key: "packaging", label: "Embalagem", className: "seg-packaging" },
  { key: "labor", label: "Seu tempo", className: "seg-labor" },
  { key: "fixed", label: "Contas do mês", className: "seg-fixed" },
  { key: "fee", label: "Taxa da venda", className: "seg-fee" },
  { key: "profit", label: "Lucro", className: "seg-profit" },
] as const;

type SegmentKey = (typeof segments)[number]["key"];

function PriceBar({
  title,
  price,
  amounts,
  scale,
}: {
  title: string;
  price: number;
  amounts: Record<SegmentKey, number>;
  scale: number;
}) {
  const costAndFee =
    amounts.ingredients + amounts.packaging + amounts.labor + amounts.fixed + amounts.fee;
  const loss = Math.max(0, costAndFee - price);
  const width = (value: number) => `${(Math.max(0, value) / scale) * 100}%`;
  const description =
    loss > 0
      ? `${title}: preço ${formatBRL(price)}, custos e taxa ${formatBRL(costAndFee)}, prejuízo de ${formatBRL(loss)} por unidade.`
      : `${title}: preço ${formatBRL(price)}, lucro de ${formatBRL(amounts.profit)} por unidade.`;

  return (
    <div className="bar-row">
      <div className="bar-head">
        <span>{title}</span>
        <strong>{formatBRL(price)}</strong>
      </div>
      <div className="bar-track" role="img" aria-label={description}>
        <div className="bar-fill">
          {segments.map((segment) => (
            <span
              key={segment.key}
              className={`bar-seg ${segment.className}`}
              style={{ width: width(amounts[segment.key]) }}
            />
          ))}
        </div>
        {loss > 0 && (
          <span
            className="bar-loss"
            style={{ left: width(price), width: width(loss) }}
            aria-hidden="true"
          />
        )}
        {loss > 0 && (
          <span className="bar-price-mark" style={{ left: width(price) }} aria-hidden="true" />
        )}
      </div>
      {loss > 0 && (
        <p className="bar-note">
          A parte listrada é o que falta: {formatBRL(loss)} saem do seu bolso em cada venda.
        </p>
      )}
    </div>
  );
}

export function PricingSimulator() {
  const idBase = useId();
  const [presetId, setPresetId] = useState<string | null>(presets[0].id);
  const [values, setValues] = useState<Values>(() => toValues(presets[0].input));
  const [unit, setUnit] = useState(presets[0].unit);

  const result = useMemo(() => {
    const parsed = Object.fromEntries(
      fieldKeys.map((key) => [key, parseAmount(values[key])]),
    ) as Record<FieldKey, number>;
    const currentPrice = Number.isNaN(parsed.currentPrice) ? undefined : parsed.currentPrice;
    return calculatePrice({ ...parsed, currentPrice });
  }, [values]);

  const isEmpty = fieldKeys.every((key) => values[key].trim() === "");

  const update = (key: FieldKey, text: string) => {
    setPresetId(null);
    setValues((previous) => ({ ...previous, [key]: text }));
  };

  const choosePreset = (id: string) => {
    const chosen = presets.find((item) => item.id === id);
    if (!chosen) return;
    setPresetId(id);
    setUnit(chosen.unit);
    setValues(toValues(chosen.input));
  };

  const clearAll = () => {
    setPresetId(null);
    setUnit("unidade");
    setValues(emptyValues);
  };

  let scale = 1;
  if (result.ok) {
    scale = result.suggested.price;
    if (result.current) {
      scale = Math.max(scale, result.current.price, result.unitCost + result.current.fee);
    }
  }

  const amountsAt = (fee: number, profit: number): Record<SegmentKey, number> =>
    result.ok
      ? { ...result.parts, fee, profit: Math.max(0, profit) }
      : { ingredients: 0, packaging: 0, labor: 0, fixed: 0, fee: 0, profit: 0 };

  const marginTarget = parseAmount(values.marginPercent) / 100;

  return (
    <div className="sim">
      <div className="sim-form">
        <div className="presets" role="group" aria-label="Exemplos prontos">
          <span className="presets-label">Comece com um exemplo:</span>
          {presets.map((item) => (
            <button
              key={item.id}
              type="button"
              className="chip"
              aria-pressed={presetId === item.id}
              onClick={() => choosePreset(item.id)}
            >
              {item.name}
            </button>
          ))}
          <button type="button" className="chip chip-quiet" onClick={clearAll}>
            Usar meus números
          </button>
        </div>

        <ol className="steps">
          {steps.map((step) => (
            <li key={step.title} className="step">
              <fieldset>
                <legend>{step.title}</legend>
                <p className="step-hint">{step.hint}</p>
                <div className="fields">
                  {step.fields.map((field) => {
                    const id = `${idBase}-${field.key}`;
                    return (
                      <div className="field" key={field.key}>
                        <label htmlFor={id}>{field.label}</label>
                        <div className="input-wrap">
                          {field.prefix && <span className="affix">{field.prefix}</span>}
                          <input
                            id={id}
                            inputMode="decimal"
                            autoComplete="off"
                            value={values[field.key]}
                            onChange={(event) => update(field.key, event.target.value)}
                          />
                          {field.suffix && <span className="affix">{field.suffix}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </li>
          ))}
        </ol>
      </div>

      <aside className="sim-result" aria-live="polite">
        {!result.ok ? (
          <div className="result-empty">
            <p className="result-label">Preço sugerido</p>
            <p>
              {isEmpty
                ? "Preencha os números do seu produto. O preço aparece aqui enquanto você digita."
                : result.error}
            </p>
          </div>
        ) : (
          <>
            <p className="result-label">Preço sugerido por {unit}</p>
            <p className="result-price">{formatBRL(result.suggested.price)}</p>
            <p className="result-sub">
              Paga ingredientes, embalagem, seu tempo, as contas do mês e a taxa, e ainda deixa{" "}
              {formatBRL(result.suggested.profit)} de lucro ({formatPercent(result.suggested.profitShare)}).
            </p>

            {result.current && (
              <div className="verdict">
                <dl className="verdict-compare">
                  <div>
                    <dt>
                      Conta de cabeça <small>preço menos ingredientes</small>
                    </dt>
                    <dd>{formatBRL(result.current.naiveProfit)}</dd>
                  </div>
                  <div className={result.current.profit < 0 ? "is-loss" : ""}>
                    <dt>
                      Conta completa <small>o que sobra de verdade</small>
                    </dt>
                    <dd>{formatBRL(result.current.profit)}</dd>
                  </div>
                </dl>
                <p className="verdict-text">
                  {result.current.profit < 0
                    ? `Cobrando ${formatBRL(result.current.price)}, você perde ${formatBRL(-result.current.profit)} em cada ${unit}.`
                    : result.current.profitShare + 1e-9 < marginTarget
                      ? `Cobrando ${formatBRL(result.current.price)}, sobram ${formatBRL(result.current.profit)} por ${unit}, ${formatPercent(result.current.profitShare)} do preço. Para chegar ao lucro que você quer, suba ${formatBRL(result.current.gapToSuggested)}.`
                      : `Seu preço de ${formatBRL(result.current.price)} já cobre tudo e deixa ${formatPercent(result.current.profitShare)} de lucro.`}
                </p>
              </div>
            )}

            <div className="bars">
              <p className="bars-title">Para onde vai o dinheiro de cada venda</p>
              {result.current && (
                <PriceBar
                  title="Preço de hoje"
                  price={result.current.price}
                  amounts={amountsAt(result.current.fee, result.current.profit)}
                  scale={scale}
                />
              )}
              <PriceBar
                title="Preço sugerido"
                price={result.suggested.price}
                amounts={amountsAt(result.suggested.fee, result.suggested.profit)}
                scale={scale}
              />
              <ul className="legend">
                {segments.map((segment) => {
                  const value =
                    segment.key === "fee"
                      ? result.suggested.fee
                      : segment.key === "profit"
                        ? result.suggested.profit
                        : result.parts[segment.key];
                  return (
                    <li key={segment.key}>
                      <span className={`swatch ${segment.className}`} aria-hidden="true" />
                      <span>{segment.label}</span>
                      <span className="legend-value">{formatBRL(value)}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="legend-note">Valores por unidade no preço sugerido.</p>
            </div>
          </>
        )}
        <p className="disclaimer">
          Cálculo gerencial e educativo, com regras abertas e testadas. Não substitui orientação
          contábil.
        </p>
      </aside>
    </div>
  );
}
