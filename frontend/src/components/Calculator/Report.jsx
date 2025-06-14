import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Report.module.scss";

function CollapsibleSection({ title, sum, children, showToggle = true, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  if (!showToggle) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader} style={{cursor: "default"}}>
          <span>{title}</span>
          <span className={styles.sectionSum}>{sum}</span>
        </div>
        <div className={styles.sectionBody}>{children}</div>
      </div>
    );
  }
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader} onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <span className={styles.sectionSum}>{sum}</span>
        <span className={styles.sectionToggle}>{open ? "▼" : "▲"}</span>
      </div>
      {open && <div className={styles.sectionBody}>{children}</div>}
    </div>
  );
}

export default function Report({ open, onClose, reportData }) {
  if (!open) return null;

  const breakdown = reportData.breakdown || {};

  const renderSection = (title, items, sum, currency = "$", defaultOpen = false) => {
    const keys = Object.keys(items || {}).filter(k => k !== "total");
    const showToggle = keys.length > 1;
    return (
      <CollapsibleSection
        title={title}
        sum={sum !== undefined ? `${sum?.toLocaleString()} ${currency}` : "-"}
        showToggle={showToggle}
        defaultOpen={defaultOpen}
      >
        {keys.map(k => (
          <div className={styles.reportRow} key={k}>
            <span className={styles.reportKey}>{k}</span>
            <span className={styles.reportValue}>{items[k]?.toLocaleString()} {currency}</span>
          </div>
        ))}
      </CollapsibleSection>
    );
  };

  return createPortal(
    <div className={styles.reportOverlay} onClick={onClose}>
      <div className={styles.reportModal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Закрити">
          <span className={styles.closeLine}></span>
          <span className={styles.closeLineRev}></span>
        </button>
        <h2 className={styles.reportTitle}>Звіт по розрахунку</h2>
        <div className={styles.reportContent}>
          <div className={styles.reportRow}>
            <span className={styles.reportKey}>Порт відправки</span>
            <span className={styles.reportValue}>{reportData.portName || "-"}</span>
          </div>
          <div className={styles.reportRow}>
            <span className={styles.reportKey}>Аукціонна площадка</span>
            <span className={styles.reportValue}>{reportData.auctionLocationName || "-"}</span>
          </div>
          <div className={styles.reportRow}>
            <span className={styles.reportKey}>Вартість лоту</span>
            <span className={styles.reportValue}>{breakdown.lotPrice?.toLocaleString() || "-"}</span>
          </div>

          {breakdown.AuctionDeliveryFeeDetail && breakdown.AuctionDeliveryFeeDetail.breakdown
            ? renderSection(
                "Аукціонний збір",
                breakdown.AuctionDeliveryFeeDetail.breakdown,
                breakdown.AuctionDeliveryFee,
                "$",
                true
              )
            : (
              <div className={styles.reportRow}>
                <span className={styles.reportKey}>Аукціонний збір</span>
                <span className={styles.reportValue}>{breakdown.AuctionDeliveryFee?.toLocaleString()} $</span>
              </div>
            )
          }

          <div className={styles.reportRow}>
            <span className={styles.reportKey}>Доставка по США</span>
            <span className={styles.reportValue}>{breakdown.inlandDelivery?.toLocaleString()} $</span>
          </div>

          <div className={styles.reportRow}>
            <span className={styles.reportKey}>Морська доставка</span>
            <span className={styles.reportValue}>{breakdown.seaDelivery?.toLocaleString()} $</span>
          </div>

          {breakdown.customs && Object.keys(breakdown.customs).length > 1
            ? renderSection(
                "Розмитнення",
                breakdown.customs,
                breakdown.customs.total,
                "$",
                false
              )
            : breakdown.customs && (
              <div className={styles.reportRow}>
                <span className={styles.reportKey}>Розмитнення</span>
                <span className={styles.reportValue}>{breakdown.customs.total?.toLocaleString()} $</span>
              </div>
            )
          }

          <div className={styles.reportRow}>
            <span className={styles.reportKey}>Страхування</span>
            <span className={styles.reportValue}>{breakdown.insurance?.toLocaleString()} $</span>
          </div>

          {breakdown.companyService || breakdown.expedition || breakdown.broker || breakdown.parking
            ? renderSection(
                "Додаткові послуги",
                {
                  ...(breakdown.companyService && { "Послуги компанії": breakdown.companyService }),
                  ...(breakdown.expedition && { "Експедиція": breakdown.expedition }),
                  ...(breakdown.broker && { "Брокер": breakdown.broker }),
                  ...(breakdown.parking && { "Стоянка": breakdown.parking }),
                },
                [
                  breakdown.companyService,
                  breakdown.expedition,
                  breakdown.broker,
                  breakdown.parking
                ].filter(Boolean).reduce((a, b) => a + b, 0),
                "$",
                false
              )
            : null
          }

          <div className={styles.reportRow}>
            <span className={styles.reportKey}>SWIFT/Переказ</span>
            <span className={styles.reportValue}>{breakdown.transferFee?.toLocaleString()} $</span>
          </div>
        </div>
        <div style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#038405",
          textAlign: "center",
          margin: "32px 0 0 0"
        }}>
          Загальна сума: {reportData.total?.toLocaleString()} $
        </div>
      </div>
    </div>,
    document.body
  );
}