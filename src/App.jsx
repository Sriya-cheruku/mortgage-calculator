

import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("");

  return (
    <main className="container">
      <section className="left-section">
        <div className="heading">
          <h1>Mortgage Calculator</h1>
          <button className="clear-btn">Clear All</button>
        </div>

        <form>
          <label>Mortgage Amount</label>

          <div className="input-wrapper">
            <span>€</span>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="field">
              <label>Mortgage Term</label>

              <div className="input-wrapper">
                <input
                  type="number"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />

                <span>years</span>
              </div>
            </div>

            <div className="field">
              <label>Interest Rate</label>

              <div className="input-wrapper">
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />

                <span>%</span>
              </div>
            </div>
          </div>

          <label>Mortgage Type</label>

          <div className="radio-box">
            <input
              type="radio"
              name="mortgage"
              value="repayment"
              checked={type === "repayment"}
              onChange={(e) => setType(e.target.value)}
            />

            <p>Repayment</p>
          </div>

          <div className="radio-box">
            <input
              type="radio"
              name="mortgage"
              value="interest"
              checked={type === "interest"}
              onChange={(e) => setType(e.target.value)}
            />

            <p>Interest Only</p>
          </div>

          <button className="calculate-btn">
            <img src="/images/icon-calculator.svg" alt="" />

            Calculate Repayments
          </button>
        </form>
      </section>

      <section className="right-section">
        <img
          src="/images/illustration-empty.svg"
          alt=""
          className="empty-img"
        />

        <h2>Results shown here</h2>

        <p>
          Complete the form and click “calculate repayments” to see what your
          monthly repayments would be.
        </p>
      </section>
    </main>
  );
}

export default App;