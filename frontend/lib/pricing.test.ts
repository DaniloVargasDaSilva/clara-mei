import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { calculatePrice, parseAmount, presets, type PricingInput } from "./pricing.ts";

const brigadeiro: PricingInput = presets.find((p) => p.id === "brigadeiro")!.input;

const close = (actual: number, expected: number, tolerance = 0.005) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `esperado ${expected}, recebido ${actual}`);

describe("calculatePrice", () => {
  test("calcula o custo por unidade somando ingredientes, embalagem, tempo e contas do mês", () => {
    const result = calculatePrice(brigadeiro);
    assert.equal(result.ok, true);
    if (!result.ok) return;

    close(result.parts.ingredients, 1.24); // 62 / 50
    close(result.parts.packaging, 0.18);
    close(result.parts.labor, 0.75); // 2,5 h x R$ 15 / 50
    close(result.parts.fixed, 0.5); // 300 / 600
    close(result.unitCost, 2.67);
  });

  test("sugere preço que cobre custo, taxa e lucro desejado", () => {
    const result = calculatePrice(brigadeiro);
    assert.ok(result.ok);
    // 2,67 / (1 - 0,035 - 0,25) = 3,734... arredondado para cima
    assert.equal(result.suggested.price, 3.74);
    assert.ok(result.suggested.profitShare >= 0.25, "lucro nunca fica abaixo do desejado");
  });

  test("mostra quanto sobra de verdade no preço atual", () => {
    const result = calculatePrice(brigadeiro);
    assert.ok(result.ok && result.current);
    close(result.current.naiveProfit, 1.76); // 3,00 - 1,24 de ingredientes
    close(result.current.fee, 0.105);
    close(result.current.profit, 0.225);
    close(result.current.gapToSuggested, 0.74);
  });

  test("indica prejuízo quando o preço atual não cobre os custos", () => {
    const result = calculatePrice({ ...brigadeiro, currentPrice: 2.5 });
    assert.ok(result.ok && result.current);
    assert.ok(result.current.profit < 0);
  });

  test("custo + taxa + lucro somam exatamente o preço", () => {
    for (const preset of presets) {
      const result = calculatePrice(preset.input);
      assert.ok(result.ok, preset.name);
      const { price, fee, profit } = result.suggested;
      close(result.unitCost + fee + profit, price, 1e-9);
    }
  });

  test("sem preço atual, não gera comparação", () => {
    const result = calculatePrice({ ...brigadeiro, currentPrice: undefined });
    assert.ok(result.ok);
    assert.equal(result.current, undefined);
  });

  test("recusa taxa e lucro que somam 100% ou mais", () => {
    const result = calculatePrice({ ...brigadeiro, feePercent: 40, marginPercent: 60 });
    assert.equal(result.ok, false);
  });

  test("recusa rendimento ou vendas do mês iguais a zero", () => {
    assert.equal(calculatePrice({ ...brigadeiro, unitsPerBatch: 0 }).ok, false);
    assert.equal(calculatePrice({ ...brigadeiro, unitsPerMonth: 0 }).ok, false);
  });

  test("recusa valores negativos ou vazios", () => {
    assert.equal(calculatePrice({ ...brigadeiro, packagingPerUnit: -1 }).ok, false);
    assert.equal(calculatePrice({ ...brigadeiro, hourlyRate: Number.NaN }).ok, false);
  });
});

describe("parseAmount", () => {
  test("entende vírgula, ponto de milhar e R$", () => {
    assert.equal(parseAmount("3,50"), 3.5);
    assert.equal(parseAmount("1.200,00"), 1200);
    assert.equal(parseAmount("R$ 12"), 12);
    assert.equal(parseAmount("0.18"), 0.18);
  });

  test("campo vazio vira NaN", () => {
    assert.ok(Number.isNaN(parseAmount("   ")));
  });
});
