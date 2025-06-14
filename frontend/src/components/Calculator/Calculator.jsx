"use client";
import styles from "./Calculator.module.scss";
import { useState } from "react";
import Report from "./Report";
import { calculateCarPrice } from "@/api/calculator";
import { useNotification } from "@/context/NotificationContext";

export default function Calculator({ component, bodyTypes, fuelTypes }) {
  const title = component?.find(item => item.slug === "calculator_h1")?.text || "";
  const description = component?.find(item => item.slug === "calculator_p1")?.text || "";

  const AUCTIONS = [
    { id: 1, name: "Copart" },
    { id: 2, name: "IAAI" }
  ];

  const BODY_TYPES = bodyTypes || [
    { id: 1, name: "Кросовер", slug: "crossover" },
    { id: 2, name: "Купе", slug: "coupe" },
    { id: 3, name: "Мінівен", slug: "minivan" },
    { id: 4, name: "Пікап", slug: "pickup" },
    { id: 5, name: "Позашляховик", slug: "suv" },
    { id: 6, name: "Седан", slug: "sedan" },
    { id: 7, name: "Універсал", slug: "wagon" },
    { id: 8, name: "Хетчбек", slug: "hatchback" }
  ];

  const FUEL_TYPES = fuelTypes || [
    { id: 1, name: "Бензин", slug: "petrol" },
    { id: 2, name: "Дизель", slug: "diesel" },
    { id: 3, name: "Електро", slug: "electro" },
    { id: 4, name: "Гібрид", slug: "hybrid" }
  ];

  const [inputs, setInputs] = useState({
    lotPrice: "",
    year: "",
    capacity: "",
    batteryCapacity: "",
    auctionLocationId: 1,
    bodyType: BODY_TYPES[0]?.slug || "sedan",
    fuelType: FUEL_TYPES[0]?.slug || "petrol"
  });
  const [reportOpen, setReportOpen] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addNotification } = useNotification();

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(i => ({
      ...i,
      [name]: value
    }));
  };

  const handleSelect = (name, value) => {
    setInputs(i => {
      if (i[name] === value) {
        return { ...i, [name]: "" };
      }
      return { ...i, [name]: value };
    });
  };

  const handleCalculate = async () => {
    if (
      !inputs.lotPrice ||
      !inputs.year ||
      (!isElectro && !inputs.capacity) ||
      (isElectro && !inputs.batteryCapacity) ||
      !inputs.auctionLocationId ||
      !inputs.bodyType ||
      !inputs.fuelType
    ) {
      addNotification("error", "Будь ласка, оберіть та заповніть всі поля!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const payload = {
        lotPrice: Number(inputs.lotPrice),
        year: Number(inputs.year),
        auctionLocationId: Number(inputs.auctionLocationId),
        bodyType: inputs.bodyType,
        fuelType: inputs.fuelType,
        capacity:
          (inputs.fuelType === "electro" || inputs.fuelType === "hybrid")
            ? Number(inputs.batteryCapacity)
            : Number(inputs.capacity)
      };
      const data = await calculateCarPrice(payload);
      setReportData(data);
      setReportOpen(true);
    } catch (e) {
      addNotification("error", e.message || "Помилка розрахунку");
    } finally {
      setLoading(false);
    }
  };

  const isElectro = inputs.fuelType === "electro" || inputs.fuelType === "hybrid";

  return (
    <div className={styles.calculatorWrapper}>
      <div className="container">
        <div className={styles.innerWrapper}>
          <div className={styles.leftBlock}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Вартість лоту</label>
              <input
                type="number"
                name="lotPrice"
                value={inputs.lotPrice}
                onChange={handleChange}
                placeholder="Введіть вартість"
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Рік випуску</label>
              <input
                type="number"
                name="year"
                value={inputs.year}
                onChange={handleChange}
                placeholder="Введіть рік"
                className={styles.input}
              />
            </div>
            {!isElectro && (
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Обʼєм двигуна (см³)</label>
                <input
                  type="number"
                  name="capacity"
                  value={inputs.capacity}
                  onChange={handleChange}
                  placeholder="Введіть обʼєм"
                  className={styles.input}
                />
              </div>
            )}
            {isElectro && (
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Обʼєм акумулятора (кВт·год)</label>
                <input
                  type="number"
                  name="batteryCapacity"
                  value={inputs.batteryCapacity}
                  onChange={handleChange}
                  placeholder="Введіть ємність"
                  className={styles.input}
                />
              </div>
            )}
<div className={styles.resultBlock}>
  <button
    className={styles.calcMainBtn}
    onClick={handleCalculate}
    disabled={loading}
    type="button"
  >
    {loading ? "Загрузка..." : "Обрахувати ціну"}
  </button>
</div>
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.title}>
              {title}
            </div>
            {description && (
              <div className={styles.description}>
                {description}
              </div>
            )}
            <div className={styles.blockLabel}>Оберіть аукціон</div>
            <div className={styles.buttonsRow}>
              {AUCTIONS.map(a => (
                <button
                  key={a.id}
                  className={
                    `${styles.calcBtn} ` +
                    (inputs.auctionLocationId === a.id
                      ? styles.active
                      : styles.inactive)
                  }
                  onClick={() => handleSelect("auctionLocationId", a.id)}
                  type="button"
                >
                  {a.name}
                </button>
              ))}
            </div>
            <div className={styles.blockLabel}>Оберіть тип кузова</div>
            <div className={styles.buttonsRow}>
              {BODY_TYPES.slice(0, 4).map(b => (
                <button
                  key={b.slug}
                  className={
                    `${styles.calcBtn} ` +
                    (inputs.bodyType === b.slug
                      ? styles.active
                      : styles.inactive)
                  }
                  onClick={() => handleSelect("bodyType", b.slug)}
                  type="button"
                >
                  {b.name}
                </button>
              ))}
            </div>
            <div className={styles.buttonsRow}>
              {BODY_TYPES.slice(4, 8).map(b => (
                <button
                  key={b.slug}
                  className={
                    `${styles.calcBtn} ` +
                    (inputs.bodyType === b.slug
                      ? styles.active
                      : styles.inactive)
                  }
                  onClick={() => handleSelect("bodyType", b.slug)}
                  type="button"
                >
                  {b.name}
                </button>
              ))}
            </div>
            <div className={styles.blockLabel}>Оберіть тип пального</div>
            <div className={styles.buttonsRow}>
              {FUEL_TYPES.map(f => (
                <button
                  key={f.slug}
                  className={
                    `${styles.calcBtn} ` +
                    (inputs.fuelType === f.slug
                      ? styles.active
                      : styles.inactive)
                  }
                  onClick={() => handleSelect("fuelType", f.slug)}
                  type="button"
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Report open={reportOpen} onClose={() => setReportOpen(false)} reportData={reportData || {}} />
      </div>
    </div>
  );
}