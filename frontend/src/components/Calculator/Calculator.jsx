export default function Calculator({ formula, coeffs }) {
    return (
      <div>
        <h1>Calculator</h1>
        <p>Formula: {formula}</p>
        <p>Coefficients: {JSON.stringify(coeffs)}</p>
      </div>
    );
  }