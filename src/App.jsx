import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("");
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const calculateRepayments = () => {
    const newErrors = {};

    if (!amount) newErrors.amount = "This field is required";
    if (!term) newErrors.term = "This field is required";
    if (!rate) newErrors.rate = "This field is required";
    if (!type) newErrors.type = "This field is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const principal = parseFloat(amount);
    const years = parseFloat(term);
    const annualRate = parseFloat(rate);

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;

    let monthly = 0;
    let total = 0;

    if (type === "repayment") {
      monthly =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      total = monthly * numberOfPayments;
    } else {
      monthly = principal * monthlyRate;
      total = monthly * numberOfPayments;
    }

    setResult({
      monthly: monthly.toFixed(2),
      total: total.toFixed(2),
    });
  };

  const clearAll = () => {
    setAmount("");
    setTerm("");
    setRate("");
    setType("");
    setResult(null);
    setErrors({});
  };

  return (
    <main className="page">
      <div className="calculator">

        <div className="form-side">
          <div className="form-header">
            <h1>Mortgage Calculator</h1>
            <button type="button" className="clear-btn" onClick={clearAll}>Clear All</button>
          </div>

          <div className="input-group">
            <label htmlFor="amount">Mortgage Amount</label>
            <div className={`input-wrapper ${errors.amount ? "input-error" : ""}`}>
              <span className="input-prefix">&pound;</span>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            {errors.amount && <span className="error-msg">{errors.amount}</span>}
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="term">Mortgage Term</label>
              <div className={`input-wrapper ${errors.term ? "input-error" : ""}`}>
                <input
                  id="term"
                  type="number"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
                <span className="input-suffix">years</span>
              </div>
              {errors.term && <span className="error-msg">{errors.term}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="rate">Interest Rate</label>
              <div className={`input-wrapper ${errors.rate ? "input-error" : ""}`}>
                <input
                  id="rate"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <span className="input-suffix">%</span>
              </div>
              {errors.rate && <span className="error-msg">{errors.rate}</span>}
            </div>
          </div>

          <div className="input-group">
            <label>Mortgage Type</label>
            <label className="radio-option">
              <input
                type="radio"
                name="type"
                value="repayment"
                checked={type === "repayment"}
                onChange={(e) => setType(e.target.value)}
              />
              <span>Repayment</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="type"
                value="interest"
                checked={type === "interest"}
                onChange={(e) => setType(e.target.value)}
              />
              <span>Interest Only</span>
            </label>
            {errors.type && <span className="error-msg">{errors.type}</span>}
          </div>

          <button type="button" className="calculate-btn" onClick={calculateRepayments}>
            Calculate Repayments
          </button>
        </div>

        <div className="results-side">
          {result === null ? (
            <div>
              <h2>Your results</h2>
              <p>
                Complete the form and click &ldquo;calculate repayments&rdquo; to see
                what your monthly repayments would be.
              </p>
            </div>
          ) : (
            <div>
              <h2>Your results</h2>
              <p>
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                &ldquo;calculate repayments&rdquo; again.
              </p>
              <div className="results-card">
                <div className="result-monthly">
                  <span className="result-label">Your monthly repayments</span>
                  <span className="result-amount">&pound;{result.monthly}</span>
                </div>
                <hr className="result-divider" />
                <div className="result-total">
                  <span className="result-label">Total you&#39;ll repay over the term</span>
                  <span className="result-total-amount">&pound;{result.total}</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

export default App;